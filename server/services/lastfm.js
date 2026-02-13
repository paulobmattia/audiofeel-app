// Last.fm API service
import fetch from 'node-fetch';
import { cacheGet, cacheSet } from './cache.js';

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

// Last.fm returns this generic star placeholder for tracks/artists with no real image
const PLACEHOLDER_HASH = '2a96cbd8b46e442fc41c2b86b821562f';

function getImage(imageArr) {
    const url = imageArr?.find(i => i.size === 'large')?.['#text'] || '';
    // Filter out the generic placeholder
    if (url.includes(PLACEHOLDER_HASH)) return '';
    return url;
}

async function lastfmRequest(method, params, apiKey) {
    const url = new URL(BASE_URL);
    url.searchParams.set('method', method);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('format', 'json');

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Last.fm API error: ${res.status}`);
    return res.json();
}

/** Get top tracks for a specific tag */
export async function getTopTracksByTag(tag, apiKey, limit = 15) {
    const cacheKey = `tagTracks:${tag.toLowerCase()}:${limit}`;
    const cached = cacheGet('lastfm', cacheKey);
    if (cached) {
        console.log(`[CACHE HIT] lastfm.getTopTracksByTag: "${tag}"`);
        return cached;
    }

    const data = await lastfmRequest('tag.getTopTracks', { tag, limit }, apiKey);
    const tracks = data?.tracks?.track || [];
    const mapped = tracks.map(t => ({
        type: 'track',
        name: t.name,
        artist: t.artist?.name || '',
        url: t.url || '',
        image: getImage(t.image),
        listeners: parseInt(t.listeners || '0', 10),
        mbid: t.mbid || '',
        sourceTag: tag,
    }));
    cacheSet('lastfm', cacheKey, mapped);
    return mapped;
}

/** Get top artists for a specific tag */
export async function getTopArtistsByTag(tag, apiKey, limit = 10) {
    const data = await lastfmRequest('tag.getTopArtists', { tag, limit }, apiKey);
    const artists = data?.topartists?.artist || [];
    return artists.map(a => ({
        type: 'artist',
        name: a.name,
        artist: a.name,
        url: a.url || '',
        image: getImage(a.image),
        listeners: parseInt(a.listeners || '0', 10),
        mbid: a.mbid || '',
        sourceTag: tag,
    }));
}

/** Get top albums for a specific tag */
export async function getTopAlbumsByTag(tag, apiKey, limit = 10) {
    const data = await lastfmRequest('tag.getTopAlbums', { tag, limit }, apiKey);
    const albums = data?.albums?.album || [];
    return albums.map(a => ({
        type: 'album',
        name: a.name,
        artist: a.artist?.name || '',
        url: a.url || '',
        image: getImage(a.image),
        mbid: a.mbid || '',
        sourceTag: tag,
    }));
}

/** Get top tags for an artist */
export async function getArtistTags(artist, apiKey) {
    const data = await lastfmRequest('artist.getTopTags', { artist }, apiKey);
    const tags = data?.toptags?.tag || [];
    return tags.map(t => t.name.toLowerCase());
}

/** Get similar artists */
export async function getSimilarArtists(artist, apiKey, limit = 10) {
    const data = await lastfmRequest('artist.getSimilar', { artist, limit }, apiKey);
    const similar = data?.similarartists?.artist || [];
    return similar.map(a => ({
        type: 'artist',
        name: a.name,
        artist: a.name,
        url: a.url || '',
        image: getImage(a.image),
        match: parseFloat(a.match || '0'),
    }));
}

/** Search for tracks by name */
export async function searchTrack(track, apiKey, limit = 10) {
    const cacheKey = `search:${track.toLowerCase()}:${limit}`;
    const cached = cacheGet('lastfm', cacheKey);
    if (cached) {
        console.log(`[CACHE HIT] lastfm.searchTrack: "${track}"`);
        return cached;
    }

    const data = await lastfmRequest('track.search', { track, limit }, apiKey);
    const results = data?.results?.trackmatches?.track || [];
    const mapped = results.map(t => ({
        type: 'track',
        name: t.name,
        artist: t.artist || '',
        url: t.url || '',
        image: getImage(t.image),
        listeners: parseInt(t.listeners || '0', 10),
    }));
    cacheSet('lastfm', cacheKey, mapped);
    return mapped;
}

/** Get top tags for a track */
export async function getTrackTags(artist, track, apiKey) {
    const cacheKey = `tags:${artist.toLowerCase()}:${track.toLowerCase()}`;
    const cached = cacheGet('lastfm', cacheKey);
    if (cached) return cached;

    try {
        const data = await lastfmRequest('track.getTopTags', { artist, track }, apiKey);
        const tags = data?.toptags?.tag || [];
        const mapped = tags.map(t => t.name.toLowerCase());
        cacheSet('lastfm', cacheKey, mapped);
        return mapped;
    } catch (err) {
        // Fail silently for individual tracks to not break search
        console.warn(`Failed to get tags for ${track}:`, err.message);
        return [];
    }
}
