// Google Books API Service
import fetch from 'node-fetch';
import { cacheGet, cacheSet } from './cache.js';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function searchBook(query) {
    if (!query) return null;

    try {
        const url = new URL(BASE_URL);
        url.searchParams.set('q', query);
        url.searchParams.set('maxResults', '3');
        url.searchParams.set('printType', 'books');
        url.searchParams.set('langRestrict', 'pt'); // Prefer Portuguese results
        if (API_KEY) {
            url.searchParams.set('key', API_KEY);
        }

        const res = await fetch(url.toString());
        if (!res.ok) {
            console.warn(`Google Books API Error: ${res.status} ${res.statusText}`);
            return null;
        }

        const data = await res.json();
        if (!data.items || data.items.length === 0) return null;

        // Find the best match (prioritize exact title match or high relevance)
        const book = data.items[0];
        const info = book.volumeInfo;

        return {
            id: book.id,
            title: info.title,
            author: info.authors ? info.authors[0] : 'Autor Desconhecido',
            description: info.description || '',
            year: info.publishedDate ? info.publishedDate.substring(0, 4) : '',
            coverUrl: info.imageLinks ? (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail) : '', // High res if possible? usually thumbnail is 128px
            categories: info.categories || [],
            pageCount: info.pageCount,
            previewLink: info.previewLink
        };

    } catch (error) {
        console.error('Google Books Service Error:', error);
        return null;
    }
}

// Wrapper for easy replacement of enrichBook
export async function enrichBookGoogle(query) {
    const cacheKey = `enrich:${query.toLowerCase()}`;
    const cached = cacheGet('googleBooks', cacheKey);
    if (cached) {
        console.log(`[CACHE HIT] googleBooks.enrichBookGoogle: "${query}"`);
        return cached;
    }

    const book = await searchBook(query);
    if (!book) return null;

    // Transform to expected schema
    const result = {
        type: 'book',
        title: book.title,
        author: book.author,
        description: book.description,
        coverUrl: book.coverUrl ? book.coverUrl.replace('http://', 'https://') : null, // Ensure HTTPS
        year: book.year,
        subjects: book.categories,
        url: book.previewLink
    };
    cacheSet('googleBooks', cacheKey, result);
    return result;
}
