// Deezer API service — free, no auth required
// Used to enrich results with real artist images, album covers, and audio previews
import fetch from 'node-fetch';
import { cacheGet, cacheSet } from './cache.js';

const BASE = 'https://api.deezer.com';

/** Search Deezer for an artist image */
export async function getArtistImage(artistName) {
    const cacheKey = `artist:${artistName.toLowerCase()}`;
    const cached = cacheGet('deezer', cacheKey);
    if (cached !== undefined) return cached;

    try {
        const res = await fetch(`${BASE}/search/artist?q=${encodeURIComponent(artistName)}&limit=1`);
        if (!res.ok) return '';
        const data = await res.json();
        const artist = data?.data?.[0];
        if (artist) {
            const url = artist.picture_medium || artist.picture_small || '';
            cacheSet('deezer', cacheKey, url);
            return url;
        }
    } catch (e) {
        // Silently fail — image is non-critical
    }
    cacheSet('deezer', cacheKey, '');
    return '';
}

/** Search Deezer for a track's album cover AND preview URL */
export async function getTrackData(trackName, artistName) {
    const cacheKey = `track:${trackName.toLowerCase()}:${artistName.toLowerCase()}`;
    const cached = cacheGet('deezer', cacheKey);
    if (cached !== undefined) return cached;

    try {
        const query = `${trackName} ${artistName}`;
        const res = await fetch(`${BASE}/search/track?q=${encodeURIComponent(query)}&limit=1`);
        if (!res.ok) return { image: '', preview: '' };
        const data = await res.json();
        const track = data?.data?.[0];
        if (track) {
            const result = {
                image: track.album?.cover_medium || track.album?.cover_small || '',
                preview: track.preview || '',
            };
            cacheSet('deezer', cacheKey, result);
            return result;
        }
    } catch (e) {
        // Silently fail
    }
    const empty = { image: '', preview: '' };
    cacheSet('deezer', cacheKey, empty);
    return empty;
}

/** Backwards-compatible: get just the image */
export async function getTrackImage(trackName, artistName) {
    const data = await getTrackData(trackName, artistName);
    return data.image;
}

/** Search Deezer for an album cover */
export async function getAlbumImage(albumName, artistName) {
    const cacheKey = `album:${albumName.toLowerCase()}:${artistName.toLowerCase()}`;
    const cached = cacheGet('deezer', cacheKey);
    if (cached !== undefined) return cached;

    try {
        const query = `${albumName} ${artistName}`;
        const res = await fetch(`${BASE}/search/album?q=${encodeURIComponent(query)}&limit=1`);
        if (!res.ok) return '';
        const data = await res.json();
        const album = data?.data?.[0];
        if (album) {
            const url = album.cover_medium || album.cover_small || '';
            cacheSet('deezer', cacheKey, url);
            return url;
        }
    } catch (e) {
        // Silently fail
    }
    cacheSet('deezer', cacheKey, '');
    return '';
}

/** Enrich a batch of results with Deezer images AND preview URLs (parallel, rate-limited) */
export async function enrichWithImages(results) {
    // Process in small batches to avoid hitting rate limits
    const BATCH_SIZE = 5;

    for (let i = 0; i < results.length; i += BATCH_SIZE) {
        const batch = results.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (item) => {
            try {
                if (item.type === 'artist') {
                    if (!item.image) {
                        item.image = await getArtistImage(item.name);
                    }
                } else if (item.type === 'track') {
                    const trackData = await getTrackData(item.name, item.artist);
                    if (!item.image && trackData.image) {
                        item.image = trackData.image;
                    }
                    // Always set preview if available
                    if (trackData.preview) {
                        item.preview = trackData.preview;
                    }
                    // Fallback to artist image if no track image
                    if (!item.image) {
                        item.image = await getArtistImage(item.artist);
                    }
                } else if (item.type === 'album') {
                    if (!item.image) {
                        item.image = await getAlbumImage(item.name, item.artist);
                    }
                }
            } catch (e) {
                // Non-critical, skip
            }
        }));
    }

    return results;
}
