// Simple rate limiter for external API calls
// MusicBrainz: 1 req/sec, Last.fm: ~5 req/sec
const queues = {};

export function rateLimitedFetch(name, fn, delayMs = 1000) {
    if (!queues[name]) {
        queues[name] = { lastCall: 0 };
    }

    return new Promise((resolve, reject) => {
        const now = Date.now();
        const timeSinceLast = now - queues[name].lastCall;
        const wait = Math.max(0, delayMs - timeSinceLast);

        setTimeout(async () => {
            queues[name].lastCall = Date.now();
            try {
                const result = await fn();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        }, wait);
    });
}
