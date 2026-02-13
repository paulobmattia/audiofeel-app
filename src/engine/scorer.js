// Scoring and re-ranking logic

/**
 * Score a candidate based on tag overlap with search tags
 * @param {string[]} candidateTags - Tags associated with the candidate
 * @param {string[]} searchTags - Tags derived from user input
 * @returns {number} Score between 0 and 1
 */
export function calculateTagScore(candidateTags, searchTags) {
    if (!candidateTags.length || !searchTags.length) return 0;

    const candidateSet = new Set(candidateTags.map(t => t.toLowerCase()));
    const searchSet = new Set(searchTags.map(t => t.toLowerCase()));

    let matches = 0;
    for (const tag of searchSet) {
        if (candidateSet.has(tag)) matches++;
    }

    // Variable scoring:
    // User wants high scores generally, but differentiation between single-tag and multi-tag matches.
    // Base score for 1 match = 0.75 (75%).
    // Each additional match adds 12.5%, capping at 100%.
    const baseCoverage = 0.75;
    const bonusPerMatch = 0.125;

    let searchCoverage = 0;
    if (matches > 0) {
        searchCoverage = Math.min(baseCoverage + (matches - 1) * bonusPerMatch, 1.0);
    }

    // Precision: how focused the candidate is on the theme
    const precision = matches / Math.max(candidateSet.size, 1);

    // Bias heavily towards coverage (finding the theme matters more than exclusivity)
    return 0.85 * searchCoverage + 0.15 * precision;
}

// ... (previous functions: calculateTagScore)

/**
 * Calculate Intersection Score based on Formula:
 * R = (Tags em Comum / Total de Tags da Busca) * 100
 * With double weight for Entity matches.
 */
export function calculateIntersectionScore(item, intentTags, entities) {
    if (!intentTags || intentTags.length === 0) return { score: 0, matchReason: 'No tags', matchedTags: [] };

    const itemTags = new Set((item.tags || []).map(t => t.toLowerCase()));
    const intentSet = new Set(intentTags.map(t => t.toLowerCase()));

    // Normalize artist for entity check
    const itemArtist = (item.artist || '').toLowerCase();

    let matchCount = 0;
    let matchedTags = [];
    let entityBonus = false;

    // Check tags
    for (const tag of intentSet) {
        // Tag overlap OR Author match (if the tag IS the author's name)
        if (itemTags.has(tag) || itemArtist.includes(tag)) {
            matchCount++;
            matchedTags.push(tag.toUpperCase());
        }
    }

    // Entity Weight: double weight for artist entities
    if (entities && entities.some(e => (e.type === 'artist' || e.type === 'author') && itemArtist.includes(e.name.toLowerCase()))) {
        matchCount += 1;
        entityBonus = true;
    }

    // ---- Graduated Scoring Formula ----
    // 1 match = 65 (above threshold), each additional match adds up to 100
    // This is fairer than raw ratio for searches with many curated tags
    let score = 0;
    if (matchCount > 0) {
        const baseScore = 65;
        const maxBonus = 35; // 65 + 35 = 100
        const additionalMatches = matchCount - 1;
        // Cap the denominator: if there are 15 tags, matching 5 is excellent (100%).
        // We shouldn't require matching all 15 for a perfect score.
        const maxAdditional = Math.min(Math.max(intentTags.length - 1, 1), 4);

        score = baseScore + Math.min((additionalMatches / maxAdditional), 1) * maxBonus;
    }

    // Bonus for tracks that appeared in multiple tag searches (sourceTags)
    if (item.sourceTags && item.sourceTags.length > 1 && matchCount > 0) {
        score += Math.min(item.sourceTags.length * 3, 10);
    }

    // Cap at 100
    score = Math.min(score, 100);

    // Generate Reason
    let reason = "Match Parcial";
    if (score >= 95) reason = "Match Perfeito";
    else if (score >= 80) reason = "Match Alto";
    if (entityBonus) reason += ": Artista Original identificado";
    if (matchedTags.length > 0) reason += ` + ${matchedTags.length} tags (${matchedTags.slice(0, 3).join(', ')}${matchedTags.length > 3 ? '...' : ''})`;

    return {
        score: Math.round(score),
        matchReason: reason,
        matchedTags: matchedTags
    };
}

/**
 * Re-rank results for diversity (penalize same artist appearing multiple times)
 */
export function diversifyResults(results, maxPerArtist = 2) {
    const artistCount = {};
    const diversified = [];

    // Sort by score desc first to keep best
    const sorted = [...results].sort((a, b) => b.score - a.score);

    for (const item of sorted) {
        const artistKey = (item.artist || '').toLowerCase();
        if (!artistKey) {
            diversified.push(item);
            continue;
        }

        artistCount[artistKey] = (artistCount[artistKey] || 0) + 1;

        if (artistCount[artistKey] <= maxPerArtist) {
            diversified.push(item);
        } else {
            // Apply penalty instead of removing
            item.score = (item.score || 0) * 0.5;
            diversified.push(item);
        }
    }

    return diversified.sort((a, b) => (b.score || 0) - (a.score || 0));
}

// ... (computeFinalScore kept for legacy fallback if needed, or removed)


/**
 * Final scoring combining multiple signals
 */
export function computeFinalScore(item, searchTags) {
    const tagScore = calculateTagScore(item.tags || [], searchTags);
    const popularityBoost = item.listeners ? Math.min(Math.log10(item.listeners) / 7, 0.3) : 0;

    return {
        ...item,
        score: tagScore * 0.8 + popularityBoost * 0.2,
        matchedTags: (item.tags || []).filter(t =>
            searchTags.map(s => s.toLowerCase()).includes(t.toLowerCase())
        ),
    };
}
