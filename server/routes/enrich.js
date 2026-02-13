// Enrichment endpoint — get details about movies/books
import { Router } from 'express';
import { enrichMovie } from '../services/tmdb.js';
import { enrichBookGoogle as enrichBook } from '../services/googleBooks.js';

export const enrichRouter = Router();

// Enrich with movie data
enrichRouter.post('/movie', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const tmdbKey = process.env.TMDB_API_KEY;
        if (!tmdbKey) return res.status(503).json({ error: 'TMDB API key not configured' });

        const data = await enrichMovie(title, tmdbKey);
        if (!data) return res.status(404).json({ error: 'Movie not found' });

        res.json(data);
    } catch (error) {
        console.error('Movie enrichment error:', error);
        res.status(500).json({ error: 'Failed to enrich movie data' });
    }
});

// Enrich with book data
enrichRouter.post('/book', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const data = await enrichBook(title);
        if (!data) return res.status(404).json({ error: 'Book not found' });

        res.json(data);
    } catch (error) {
        console.error('Book enrichment error:', error);
        res.status(500).json({ error: 'Failed to enrich book data' });
    }
});
