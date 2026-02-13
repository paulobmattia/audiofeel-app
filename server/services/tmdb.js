// TMDB API service (movies)
import fetch from 'node-fetch';
import { cacheGet, cacheSet } from './cache.js';

const BASE_URL = 'https://api.themoviedb.org/3';

async function tmdbRequest(path, params, apiKey) {
    const url = new URL(`${BASE_URL}${path}`);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('language', 'pt-BR');

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
    return res.json();
}

/** Search for a movie by title */
export async function searchMovie(title, apiKey) {
    const data = await tmdbRequest('/search/movie', { query: title }, apiKey);
    const movie = data?.results?.[0];
    if (!movie) return null;

    return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview || '',
        genres: movie.genre_ids || [],
        releaseDate: movie.release_date || '',
        posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : '',
        popularity: movie.popularity,
        voteCount: movie.vote_count
    };
}

/** Get movie keywords */
export async function getMovieKeywords(movieId, apiKey) {
    const data = await tmdbRequest(`/movie/${movieId}/keywords`, {}, apiKey);
    return (data?.keywords || []).map(k => k.name);
}

/** Get movie details with populated genres */
export async function getMovieDetails(movieId, apiKey) {
    const data = await tmdbRequest(`/movie/${movieId}`, {}, apiKey);
    return {
        title: data.title,
        overview: data.overview || '',
        genres: (data.genres || []).map(g => g.name.toLowerCase()),
        tagline: data.tagline || '',
        runtime: data.runtime,
        voteAverage: data.vote_average,
    };
}

/** Get full enrichment data for a movie title */
export async function enrichMovie(title, apiKey) {
    const cacheKey = `enrich:${title.toLowerCase()}`;
    const cached = cacheGet('tmdb', cacheKey);
    if (cached) {
        console.log(`[CACHE HIT] tmdb.enrichMovie: "${title}"`);
        return cached;
    }

    const movie = await searchMovie(title, apiKey);
    if (!movie) return null;

    const [keywords, details] = await Promise.all([
        getMovieKeywords(movie.id, apiKey),
        getMovieDetails(movie.id, apiKey),
    ]);

    const result = {
        title: movie.title,
        overview: details.overview || movie.overview,
        genres: details.genres,
        keywords,
        tagline: details.tagline,
        posterPath: movie.posterPath,
        popularity: movie.popularity,
        voteCount: movie.voteCount
    };
    cacheSet('tmdb', cacheKey, result);
    return result;
}
