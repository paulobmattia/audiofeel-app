// Input parsing and type detection

// Remove accents for matching
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Parse a combined input like "melancólico + Cem Anos de Solidão"
// Also handles space-separated concepts like "melancólico cyberpunk"
export function parseInput(rawInput) {
    // First, split by explicit "+" separator
    const plusParts = rawInput.split(/\s*\+\s*/).map(p => p.trim()).filter(Boolean);

    const results = [];
    for (const part of plusParts) {
        results.push({
            text: part,
            normalized: removeAccents(part.toLowerCase()),
            // Also split by spaces for individual word matching
            words: part.split(/\s+/).map(w => ({
                text: w,
                normalized: removeAccents(w.toLowerCase()),
            })),
        });
    }
    return results;
}

// Try to auto-detect input type based on keywords
export function detectType(text) {
    const lower = text.toLowerCase();
    const noAccent = removeAccents(lower);

    // Sentiment clues
    const sentimentWords = [
        'triste', 'alegre', 'melancolico', 'feliz', 'raiva', 'calmo', 'tranquilo',
        'ansioso', 'apaixonado', 'romantico', 'nostalgico', 'saudade', 'esperancoso',
        'misterioso', 'empolgante', 'reflexivo', 'sombrio', 'euforico', 'sereno',
        'intenso', 'confortavel', 'rebelde', 'sonhador', 'dramatico', 'poetico',
        'selvagem', 'solitario', 'poderoso',
        'sad', 'happy', 'melancholic', 'angry', 'peaceful', 'romantic', 'nostalgic',
        'anxious', 'euphoric', 'dreamy', 'dark', 'energetic', 'mysterious', 'hopeful',
        'intense', 'lonely', 'rebellious',
    ];

    // Color clues
    const colorWords = [
        'vermelho', 'azul', 'verde', 'amarelo', 'roxo', 'preto', 'branco', 'cinza',
        'laranja', 'rosa', 'dourado', 'prata',
        'red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'grey', 'gray',
        'orange', 'pink', 'gold', 'silver',
    ];

    // Check the whole text first
    if (sentimentWords.includes(noAccent)) return 'sentimento';
    if (colorWords.includes(noAccent)) return 'cor';

    // Check individual words for multi-word inputs
    const words = noAccent.split(/\s+/);
    const hasSentiment = words.some(w => sentimentWords.includes(w));
    const hasColor = words.some(w => colorWords.includes(w));
    if (hasSentiment) return 'sentimento';
    if (hasColor) return 'cor';

    // If it's longer than 3 words, likely a title (book/movie)
    if (text.split(/\s+/).length > 3) return 'auto';

    return 'conceito';
}

// Normalize text for comparison
export function normalizeText(text) {
    return removeAccents(text.toLowerCase().trim());
}
