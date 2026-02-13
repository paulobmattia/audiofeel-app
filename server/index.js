import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchRouter } from './routes/search.js';
import { enrichRouter } from './routes/enrich.js';
import { cacheStats } from './services/cache.js';

dotenv.config();

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
