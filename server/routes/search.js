// Semantic Search Endpoint
import { Router } from 'express';
import { KNOWN_BOOKS } from '../../src/engine/bookDb.js';
import { KNOWN_MOVIES } from '../../src/engine/movieDb.js';
import { extractKeywordsFromText, detectInputType, expandGenresToMusicTags } from '../../src/engine/tagMap.js';
import { calculateIntersectionScore, diversifyResults } from '../../src/engine/scorer.js';
import * as lastfm from '../services/lastfm.js';
import { enrichMovie } from '../services/tmdb.js';
import { enrichBookGoogle as enrichBook } from '../services/googleBooks.js';
import { analyzeIntent } from '../services/aiRouter.js';
import { enrichWithImages } from '../services/deezer.js';
import { getMockTracksByTag } from '../services/mockData.js';

export const searchRouter = Router();

searchRouter.post('/', async (req, res) => {
    try {
        const { query, type: userType } = req.body;
        if (!query || !query.trim()) {
            return res.status(400).json({ error: 'Query is required' });
        }

        const apiKey = process.env.LASTFM_API_KEY;
        const tmdbKey = process.env.TMDB_API_KEY;
        const useMock = !apiKey;

        console.log(`🤖 Semantic Search Init: "${query}" [Type: ${userType || 'auto'}]`);

        // 1. Semantic Routing (Gemini)
        let aiIntent = await analyzeIntent(query);

        let searchTags = [];
        let enrichmentData = null;
        let lastfmQuery = query;
        let useTagSearch = false; // Whether to use tag-based retrieval instead of text search

        // Determine effective mode
        const isSentimentMode = ['sentimentos', 'vibes', 'concepts', 'colors'].includes(userType);
        const isMediaMode = ['filmes', 'livros'].includes(userType);

        // processing AI Result
        if (aiIntent) {
            console.log("✨ Synthesized Intent:", JSON.stringify(aiIntent.search_intent));
            searchTags = aiIntent.search_intent.detected_tags || [];
            lastfmQuery = aiIntent.translation.lastfm_query || query;
            useTagSearch = true; // AI always provides good tags for tag-based search

            // Entity Enrichment (Knowledge Graph)
            // SKIPPED if user strictly wants sentiments/vibes
            if (!isSentimentMode && aiIntent.entities && aiIntent.entities.length > 0) {
                const entity = aiIntent.entities[0]; // Primary entity

                try {
                    // Filter by user preference if specified
                    if (userType === 'livros' && entity.type !== 'book') {
                        console.log(`Checking entities: Ignoring ${entity.type} because user wants Book.`);
                    } else if (userType === 'filmes' && entity.type !== 'movie') {
                        console.log(`Checking entities: Ignoring ${entity.type} because user wants Movie.`);
                    } else {
                        if (entity.type === 'book') {
                            enrichmentData = await enrichBook(entity.name);
                            if (enrichmentData) enrichmentData.type = 'book';
                        } else if (entity.type === 'movie' && tmdbKey) {
                            enrichmentData = await enrichMovie(entity.name, tmdbKey);
                            if (enrichmentData) enrichmentData.type = 'movie';
                        }
                    }
                } catch (e) {
                    console.error(`Entity Enrichment Failed for ${entity.name}:`, e.message);
                }
            }
        } else {
            // ============================================================
            // SMART FALLBACK ROUTER (AI unavailable)
            // ============================================================
            console.warn("⚠️ AI unavailable. Using Smart Fallback Router...");

            // Step 1: Check curated tag maps (sentiments, colors, concepts)
            const detected = detectInputType(query);

            if (detected) {
                // ---- VIBE/COLOR/CONCEPT path ----
                console.log(`🎨 Detected ${detected.type}: "${query}" → [${detected.tags.join(', ')}]`);
                searchTags = detected.tags;
                useTagSearch = true; // Use tag-based retrieval!
                // No entity enrichment — this is a pure vibe search

            } else if (!isSentimentMode) {
                // ---- ENTITY path (movie/book title) ----
                // Only run if user didn't explicitly ask for Sentiment/Vibe

                console.log(`🔍 No curated match for "${query}". Trying entity detection...`);

                // Try TMDB first (if allowed)
                const allowMovie = !userType || userType === 'auto' || userType === 'filmes';
                if (allowMovie && tmdbKey) {
                    try {
                        const movie = await enrichMovie(query, tmdbKey);
                        if (movie) {
                            console.log(`🎬 Fallback detected Movie: ${movie.title}`);
                            enrichmentData = movie;
                            enrichmentData.type = 'movie';

                            // Generate music tags from movie genres + keywords
                            const genreTags = expandGenresToMusicTags(movie.genres || []);
                            searchTags = [...genreTags, 'soundtrack'];

                            // Also add keyword-derived tags
                            if (movie.keywords && movie.keywords.length > 0) {
                                const kwTags = extractKeywordsFromText(movie.keywords.join(' '));
                                searchTags.push(...kwTags);
                            }

                            useTagSearch = true; // Search by tags, NOT by title!

                            // Also keep a text-based query as secondary
                            lastfmQuery = `${movie.title} soundtrack`;
                        }
                    } catch (e) {
                        console.error("Fallback Movie Search failed:", e.message);
                    }
                }

                // If no movie, try Google Books (if allowed)
                const allowBook = !userType || userType === 'auto' || userType === 'livros';
                if (!enrichmentData && allowBook) {
                    try {
                        const book = await enrichBook(query);
                        if (book) {
                            console.log(`📚 Fallback detected Book: ${book.title}`);
                            enrichmentData = book;

                            // Generate music tags from book categories
                            const genreTags = expandGenresToMusicTags(book.subjects || book.categories || []);
                            searchTags = genreTags.length > 0 ? genreTags : extractKeywordsFromText(book.description || '');
                            searchTags.push('soundtrack');

                            useTagSearch = true;
                            lastfmQuery = `${book.title} soundtrack`;
                        }
                    } catch (e) {
                        console.error("Fallback Book Search failed:", e.message);
                    }
                }
            }

            // If explicit sentiment mode but no tags found yet (and we skipped entities)
            if (isSentimentMode && searchTags.length === 0) {
                // Force simple keyword extraction as tags
                console.log("Force-mode: extracting tags directly from query");
                searchTags = extractKeywordsFromText(query);
                useTagSearch = true;
            }

            // If nothing detected at all, try keyword extraction as last resort
            if (searchTags.length === 0) {
                searchTags = extractKeywordsFromText(query);
                if (searchTags.length > 0) {
                    useTagSearch = true;
                }
            }
        }

        // Deduplicate tags
        searchTags = [...new Set(searchTags)];
        console.log("🏷️ Final Search Tags:", searchTags);

        // ============================================================
        // 2. Track Retrieval
        // ============================================================
        let tracksCandidate = [];

        if (useMock) {
            // Mock mode
            const mockTags = searchTags.slice(0, 3).map(t => t.toLowerCase());
            for (const tag of mockTags) {
                const mockTracks = getMockTracksByTag(tag);
                tracksCandidate.push(...mockTracks);
            }
            // Deduplicate by name+artist
            const seen = new Set();
            tracksCandidate = tracksCandidate.filter(t => {
                const key = `${t.name}::${t.artist}`.toLowerCase();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
        } else if (useTagSearch && searchTags.length > 0) {
            // ---- TAG-BASED RETRIEVAL (the fix!) ----
            // Search by top 4 tags in parallel via tag.getTopTracks
            const tagsToSearch = searchTags.slice(0, 4);
            console.log(`🎯 Tag-based retrieval: [${tagsToSearch.join(', ')}]`);

            const tagResults = await Promise.all(
                tagsToSearch.map(tag =>
                    lastfm.getTopTracksByTag(tag, apiKey, 15).catch(err => {
                        console.warn(`Tag search failed for "${tag}":`, err.message);
                        return [];
                    })
                )
            );

            // Merge all tag results
            for (const tracks of tagResults) {
                tracksCandidate.push(...tracks);
            }

            // Deduplicate by name+artist, merging sourceTags from all occurrences
            const trackMap = new Map();
            for (const t of tracksCandidate) {
                const key = `${t.name}::${t.artist}`.toLowerCase();
                const existing = trackMap.get(key);
                if (!existing) {
                    t.sourceTags = [t.sourceTag].filter(Boolean);
                    trackMap.set(key, t);
                } else {
                    // Merge: keep higher listeners, collect all sourceTags
                    if (t.listeners > existing.listeners) {
                        const mergedSources = [...(existing.sourceTags || []), t.sourceTag].filter(Boolean);
                        t.sourceTags = [...new Set(mergedSources)];
                        trackMap.set(key, t);
                    } else {
                        if (t.sourceTag) existing.sourceTags = [...new Set([...(existing.sourceTags || []), t.sourceTag])];
                    }
                }
            }
            tracksCandidate = [...trackMap.values()];

            // If tag search yielded few results, supplement with text search
            if (tracksCandidate.length < 5) {
                console.log(`📡 Supplementing with text search: "${lastfmQuery}"`);
                try {
                    const textResults = await lastfm.searchTrack(lastfmQuery, apiKey, 20);
                    for (const t of textResults) {
                        const key = `${t.name}::${t.artist}`.toLowerCase();
                        if (!trackMap.has(key)) {
                            tracksCandidate.push(t);
                            trackMap.set(key, t);
                        }
                    }
                } catch (e) {
                    console.error("Supplementary text search failed:", e.message);
                }
            }

            console.log(`📊 Total candidates after tag retrieval: ${tracksCandidate.length}`);
        } else {
            // ---- FALLBACK: text-based search ----
            try {
                tracksCandidate = await lastfm.searchTrack(lastfmQuery, apiKey, 20);
            } catch (e) {
                console.error("Last.fm search failed:", e.message);
            }
        }

        // 3. Deep Tag Enrichment (fetch actual tags for top candidates)
        const topCandidates = tracksCandidate.slice(0, 15);

        // Parallel Fetch
        await Promise.all(topCandidates.map(async (track) => {
            if (!track.tags || track.tags.length === 0) {
                const tags = await lastfm.getTrackTags(track.artist, track.name, apiKey);
                track.tags = tags;
            }
            // Merge sourceTags into the tag array (tracks found BY tag search carry proof)
            if (track.sourceTags && track.sourceTags.length > 0) {
                const existingTags = new Set(track.tags.map(t => t.toLowerCase()));
                for (const st of track.sourceTags) {
                    if (!existingTags.has(st.toLowerCase())) {
                        track.tags.push(st.toLowerCase());
                    }
                }
            }
        }));

        // 4. Scoring (Intersection Algorithm)
        const scoredTracks = topCandidates.map(track => {
            const { score, matchReason, matchedTags } = calculateIntersectionScore(
                track,
                searchTags,
                aiIntent ? aiIntent.entities : null
            );
            return { ...track, score, matchReason, matchedTags };
        });

        // 5. Filtering & ranking
        const validTracks = scoredTracks
            .filter(t => t.score >= 60)
            .sort((a, b) => b.score - a.score);

        // 5.5 Diversity: penalize same artist appearing too many times
        const diversifiedTracks = diversifyResults(validTracks, 2);

        // 6. Response Formatting
        let finalTracks = diversifiedTracks;
        if (finalTracks.length === 0 && scoredTracks.length > 0) {
            // Fallback: return top 5 even if below threshold, but marked
            finalTracks = scoredTracks
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map(t => ({ ...t, matchReason: "Match Baixo (Fallback)" }));
        }

        // Image Enrichment (Deezer)
        if (!useMock) {
            await enrichWithImages(finalTracks);
        }

        // Construct final JSON
        const response = {
            query,
            tags: searchTags,
            search_intent: aiIntent ? aiIntent.search_intent : { original_query: query, detected_tags: searchTags },
            enrichment: Array.isArray(enrichmentData) ? enrichmentData[0] : enrichmentData,
            results: {
                tracks: finalTracks,
                artists: [],
                albums: [],
                playlists: []
            },
            mock: useMock
        };

        res.json(response);

    } catch (error) {
        console.error('Semantic Search Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
