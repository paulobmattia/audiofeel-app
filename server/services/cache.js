// Shared in-memory cache with TTL per namespace
// Used by all API services to avoid redundant external calls

const namespaces = new Map();

const DEFAULT_TTL = {
    lastfm: 30 * 60 * 1000,      // 30 minutes
    tmdb: 60 * 60 * 1000,         // 60 minutes
    googleBooks: 60 * 60 * 1000,  // 60 minutes
    deezer: 60 * 60 * 1000,       // 60 minutes
};

const stats = {
    hits: {},
    misses: {},
};

function getNamespace(ns) {
    if (!namespaces.has(ns)) {
        namespaces.set(ns, new Map());
        stats.hits[ns] = 0;
        stats.misses[ns] = 0;
    }
    return namespaces.get(ns);
}

/**
 * Get a cached value by namespace and key.
 * Returns undefined if not cached or expired.
 */
export function cacheGet(ns, key) {
    const cache = getNamespace(ns);
    const entry = cache.get(key);

    if (!entry) {
        stats.misses[ns]++;
        return undefined;
    }

    const ttl = DEFAULT_TTL[ns] || 30 * 60 * 1000;
    if (Date.now() - entry.timestamp > ttl) {
        cache.delete(key);
        stats.misses[ns]++;
        return undefined;
    }

    stats.hits[ns]++;
    return entry.value;
}

/**
 * Set a cached value by namespace and key.
 */
export function cacheSet(ns, key, value) {
    const cache = getNamespace(ns);
    cache.set(key, { value, timestamp: Date.now() });

    // Evict old entries if cache grows too large (per namespace)
    if (cache.size > 500) {
        const oldest = cache.keys().next().value;
        cache.delete(oldest);
    }
}

/**
 * Get cache statistics for health check endpoint.
 */
export function cacheStats() {
    const result = {};
    for (const [ns, cache] of namespaces) {
        result[ns] = {
            entries: cache.size,
            hits: stats.hits[ns] || 0,
            misses: stats.misses[ns] || 0,
        };
    }
    return result;
}
