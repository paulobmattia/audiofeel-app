import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRouter } from './routes/search.js';
import { enrichRouter } from './routes/enrich.js';
import { cacheStats } from './services/cache.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

process.on('uncaughtException', (err) => {
    console.error('🔥 Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('🔥 Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

// API routes
app.use('/api/search', searchRouter);
app.use('/api/enrich', enrichRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        hasLastfmKey: !!process.env.LASTFM_API_KEY,
        hasTmdbKey: !!process.env.TMDB_API_KEY,
        hasGeminiKey: !!process.env.GEMINI_API_KEY,
        cache: cacheStats(),
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎵 AudioFeel server running on port ${PORT}`);
    console.log(`Environment: LASTFM=${!!process.env.LASTFM_API_KEY}, TMDB=${!!process.env.TMDB_API_KEY}, GEMINI=${!!process.env.GEMINI_API_KEY}`);

    if (!process.env.LASTFM_API_KEY) {
        console.log('⚠️  No LASTFM_API_KEY set — running in mock mode');
    }
    if (!process.env.TMDB_API_KEY) {
        console.log('⚠️  No TMDB_API_KEY set — movie enrichment disabled');
    }
});
