import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

const SYSTEM_PROMPT = `
You are the Semantic Router for "AudioFeel", a music discovery engine.
Your goal is to analyze user input and output a structured JSON object that orchestrates a search across multiple APIs.

output MUST be a valid JSON object with this exact schema:
{
  "search_intent": {
    "original_query": "string (the user input)",
    "detected_tags": ["string", "string"] // standardized English tags for search
  },
  "entities": [
    { 
      "name": "string (official title/name)", 
      "type": "book" | "movie" | "artist", 
      "author": "string (optional, for validation)" 
    }
  ],
  "translation": {
    "lastfm_query": "string (optimized English query for Last.fm API)"
  },
  "visual_style": "string (optional, e.g., 'Cyberpunk', 'Noir', 'Pastel')"
}

RULES:
1. **Entity Extraction**: 
   - Identify books, movies, or specific artists. 
   - If a book/movie is found, the "lastfm_query" should typically be "{Entity Name} soundtrack" or "{Entity Name} score".
   - If the input is just a vibe (e.g., "triste", "leitura"), do NOT invent an entity.
   
2. **Tag Standardization**:
   - Convert all sentiments/themes to consistent ENGLISH tags (e.g., "triste" -> "SAD", "leitura" -> "READING", "cyberpunk" -> "CYBERPUNK").
   - Include specific genre tags if relevant (e.g., "JAZZ", "AMBIENT").

3. **Last.fm Optimization**:
   - The "lastfm_query" is what we send to the track search.
   - For specific media: "Blade Runner 2049" -> "Blade Runner 2049 soundtrack".
   - For vibes: "Musica para programar" -> "coding lo-fi".

EXAMPLES:

Input: "Blade Runner 2049"
Output:
{
  "search_intent": {
    "original_query": "Blade Runner 2049",
    "detected_tags": ["SOUNDTRACK", "SCORE", "HANS ZIMMER", "CYBERPUNK", "SCI-FI"]
  },
  "entities": [
    { "name": "Blade Runner 2049", "type": "movie", "author": "Denis Villeneuve" },
    { "name": "Hans Zimmer", "type": "artist" }
  ],
  "translation": {
    "lastfm_query": "Blade Runner 2049 soundtrack"
  },
  "visual_style": "Cyberpunk"
}

Input: "Mar Inquieto"
Output:
{
  "search_intent": {
    "original_query": "Mar Inquieto",
    "detected_tags": ["OCEAN", "TENSION", "MYSTERIOUS", "INSTRUMENTAL"]
  },
  "entities": [
    { "name": "Restless", "type": "book", "author": "William Boyd" }
  ],
  "translation": {
    "lastfm_query": "ocean soundtrack mysterious tension"
  },
  "visual_style": "Noir"
}
`;

export async function analyzeIntent(query) {
  const fs = await import('fs');
  const logPath = new URL('./ai_debug.log', import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, '$1');

  const log = (msg) => {
    try {
      fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`);
    } catch (e) { /* ignore */ }
  };

  log(`Analyze Intent START: "${query}"`);

  if (!process.env.GEMINI_API_KEY) {
    log("⚠️ GEMINI_API_KEY missing.");
    return null;
  }

  // Rate Limiting Logic (Simple Delay)
  // Gemini Free Tier: 15 RPM = 1 request every 4 seconds. 
  // We'll enforce a small localized delay, but for scaling, a real queue is needed.
  // For now, we assume low traffic dev usage.
  try {
    const generateWithRetry = async (retries = 3, delay = 2000) => {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: SYSTEM_PROMPT + `\n\nInput: "${query}"` }] }],
          generationConfig: { responseMimeType: "application/json" }
        });
        return result.response.text();
      } catch (error) {
        log(`Retry Error (${retries}): ${error.message}`);
        if ((error.status === 429 || error.message.includes('429')) && retries > 0) {
          log(`⚠️ AI Rate limit hit. Retrying inside router in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return generateWithRetry(retries - 1, delay * 2);
        }
        throw error;
      }
    };

    // Wrapper to enforce timeout
    const generateWithTimeout = async () => {
      const timeoutMs = 4000; // 4s max wait for AI
      return Promise.race([
        generateWithRetry(1, 1000), // 1 retry only, 1s delay
        new Promise((_, reject) => setTimeout(() => reject(new Error("AI Request Timed Out")), timeoutMs))
      ]);
    };

    const text = await generateWithTimeout();
    log(`Output (Speed: OK): ${text}`);

    const json = JSON.parse(text);
    log(`✅ Parsed JSON: ${JSON.stringify(json, null, 2)}`);
    return json;
  } catch (error) {
    log(`AI Router Error: ${error.message} \nStack: ${error.stack}`);
    return null;
  }
}
