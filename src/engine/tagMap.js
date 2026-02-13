// Curated tag mappings: theme/concept → Last.fm compatible tags
// This is the heart of AudioFeel's matching heuristic

export const SENTIMENT_TAGS = {
    // Portuguese sentiments
    'melancólico': ['melancholy', 'melancholic', 'sad', 'ambient', 'dreampop', 'shoegaze', 'slowcore'],
    'melancolico': ['melancholy', 'melancholic', 'sad', 'ambient', 'dreampop', 'shoegaze', 'slowcore'],
    'triste': ['sad', 'melancholy', 'emotional', 'ballad', 'acoustic', 'slowcore'],
    'alegre': ['happy', 'upbeat', 'feel good', 'pop', 'sunshine pop', 'indie pop'],
    'alegria': ['happy', 'joy', 'feel good', 'upbeat', 'soul', 'funk'],
    'feliz': ['happy', 'upbeat', 'feel good', 'pop', 'sunshine pop', 'indie pop'],
    'felicidade': ['happy', 'joy', 'feel good', 'upbeat', 'soul', 'funk', 'pop'],
    'animado': ['energetic', 'upbeat', 'dance', 'party', 'fun', 'power pop'],
    'calmo': ['calm', 'chill', 'ambient', 'relaxing', 'acoustic', 'meditation', 'new age'],
    'tranquilo': ['chill', 'calm', 'lounge', 'bossa nova', 'easy listening', 'smooth jazz'],
    'raiva': ['angry', 'aggressive', 'heavy', 'punk', 'hardcore', 'metal', 'thrash'],
    'ansioso': ['anxious', 'tense', 'dark', 'industrial', 'noise', 'post-punk', 'darkwave'],
    'apaixonado': ['romantic', 'love', 'passion', 'soul', 'rnb', 'ballad', 'sensual'],
    'romântico': ['romantic', 'love', 'ballad', 'soul', 'bossa nova', 'jazz'],
    'romantico': ['romantic', 'love', 'ballad', 'soul', 'bossa nova', 'jazz'],
    'nostálgico': ['nostalgic', 'retro', '80s', 'synthwave', 'dream pop', 'vaporwave'],
    'nostalgico': ['nostalgic', 'retro', '80s', 'synthwave', 'dream pop', 'vaporwave'],
    'saudade': ['melancholy', 'nostalgic', 'bossa nova', 'brazilian', 'mpb', 'fado'],
    'esperançoso': ['hopeful', 'uplifting', 'inspiring', 'indie', 'post-rock', 'anthemic'],
    'esperancoso': ['hopeful', 'uplifting', 'inspiring', 'indie', 'post-rock', 'anthemic'],
    'misterioso': ['mysterious', 'dark', 'atmospheric', 'trip hop', 'darkwave', 'gothic'],
    'empolgante': ['exciting', 'energetic', 'anthemic', 'rock', 'epic', 'stadium rock'],
    'reflexivo': ['introspective', 'thoughtful', 'acoustic', 'singer-songwriter', 'folk', 'ambient'],
    'sombrio': ['dark', 'gloomy', 'gothic', 'doom', 'darkwave', 'post-punk', 'black metal'],
    'eufórico': ['euphoric', 'ecstatic', 'trance', 'edm', 'dance', 'rave', 'house'],
    'euforico': ['euphoric', 'ecstatic', 'trance', 'edm', 'dance', 'rave', 'house'],
    'sereno': ['serene', 'peaceful', 'ambient', 'new age', 'classical', 'minimalism'],
    'intenso': ['intense', 'powerful', 'heavy', 'progressive', 'post-rock', 'metal'],
    'confortável': ['cozy', 'warm', 'acoustic', 'folk', 'indie folk', 'lo-fi'],
    'confortavel': ['cozy', 'warm', 'acoustic', 'folk', 'indie folk', 'lo-fi'],
    'rebelde': ['rebellious', 'punk', 'grunge', 'protest', 'garage rock', 'riot grrrl'],
    'sonhador': ['dreamy', 'dream pop', 'shoegaze', 'ethereal', 'ambient', 'psychedelic'],
    'dramático': ['dramatic', 'epic', 'orchestral', 'cinematic', 'opera', 'symphonic'],
    'dramatico': ['dramatic', 'epic', 'orchestral', 'cinematic', 'opera', 'symphonic'],
    'poético': ['poetic', 'lyrical', 'singer-songwriter', 'folk', 'art rock', 'chamber pop'],
    'poetico': ['poetic', 'lyrical', 'singer-songwriter', 'folk', 'art rock', 'chamber pop'],
    'selvagem': ['wild', 'raw', 'punk', 'garage rock', 'noise rock', 'psychedelic'],
    'solitário': ['lonely', 'solitude', 'ambient', 'minimal', 'acoustic', 'singer-songwriter'],
    'solitario': ['lonely', 'solitude', 'ambient', 'minimal', 'acoustic', 'singer-songwriter'],
    'poderoso': ['powerful', 'epic', 'metal', 'symphonic metal', 'hard rock', 'anthemic'],
    'épico': ['epic', 'cinematic', 'orchestral', 'symphonic', 'power metal', 'anthemic'],
    'epico': ['epic', 'cinematic', 'orchestral', 'symphonic', 'power metal', 'anthemic'],
    'assustador': ['dark', 'horror', 'gothic', 'doom', 'industrial', 'creepy'],
    'tenso': ['tense', 'dark', 'industrial', 'suspense', 'trip hop', 'post-punk'],
    'suave': ['soft', 'smooth', 'chill', 'bossa nova', 'lounge', 'easy listening'],
    'agressivo': ['aggressive', 'heavy', 'metal', 'hardcore', 'thrash', 'noise'],
    'delicado': ['delicate', 'soft', 'acoustic', 'ethereal', 'chamber pop', 'ambient'],
    'divertido': ['fun', 'upbeat', 'party', 'pop', 'ska', 'power pop'],
    'sensual': ['sensual', 'rnb', 'soul', 'slow jam', 'neo soul', 'trip hop'],
    'furioso': ['furious', 'aggressive', 'thrash', 'hardcore', 'death metal', 'punk'],
    'contemplativo': ['contemplative', 'ambient', 'post-rock', 'minimal', 'meditation', 'classical'],
    'esperança': ['hopeful', 'uplifting', 'inspiring', 'post-rock', 'indie', 'anthemic'],
    'esperanca': ['hopeful', 'uplifting', 'inspiring', 'post-rock', 'indie', 'anthemic'],
    'angústia': ['anguish', 'dark', 'doom', 'post-punk', 'shoegaze', 'noise'],
    'angustia': ['anguish', 'dark', 'doom', 'post-punk', 'shoegaze', 'noise'],
    'paz': ['peaceful', 'calm', 'ambient', 'new age', 'meditation', 'acoustic'],
    'medo': ['fear', 'dark', 'horror', 'industrial', 'doom', 'darkwave'],
    'energia': ['energetic', 'dance', 'electronic', 'rock', 'punk', 'edm'],
    'paixão': ['passion', 'romantic', 'soul', 'flamenco', 'ballad', 'rnb'],
    'paixao': ['passion', 'romantic', 'soul', 'flamenco', 'ballad', 'rnb'],
    'loucura': ['madness', 'experimental', 'noise', 'avant-garde', 'psychedelic', 'industrial'],
    'preguiça': ['lazy', 'chill', 'lo-fi', 'lounge', 'downtempo', 'trip hop'],
    'preguica': ['lazy', 'chill', 'lo-fi', 'lounge', 'downtempo', 'trip hop'],
    'adrenalina': ['adrenaline', 'energetic', 'metal', 'edm', 'drum and bass', 'hardcore'],
    'melancolia': ['melancholy', 'melancholic', 'sad', 'ambient', 'dreampop', 'shoegaze'],
    'euforia': ['euphoric', 'trance', 'edm', 'dance', 'rave', 'house'],
    'dúvida': ['mysterious', 'contemplative', 'moody', 'thinking', 'jazz', 'experimental'],
    'duvida': ['mysterious', 'contemplative', 'moody', 'thinking', 'jazz', 'experimental'],
    'incerteza': ['anxious', 'uncertain', 'ambient', 'post-rock', 'minimal', 'indie'],
    'indecisão': ['confused', 'math rock', 'progressive', 'complex', 'jazz'],
    'indecisao': ['confused', 'math rock', 'progressive', 'complex', 'jazz'],

    // English sentiments
    'melancholic': ['melancholy', 'melancholic', 'sad', 'ambient', 'dreampop', 'shoegaze'],
    'sad': ['sad', 'melancholy', 'emotional', 'ballad', 'acoustic', 'slowcore'],
    'happy': ['happy', 'upbeat', 'feel good', 'pop', 'sunshine pop', 'indie pop'],
    'angry': ['angry', 'aggressive', 'heavy', 'punk', 'hardcore', 'metal'],
    'peaceful': ['peaceful', 'calm', 'ambient', 'relaxing', 'new age', 'meditation'],
    'romantic': ['romantic', 'love', 'ballad', 'soul', 'rnb', 'jazz'],
    'nostalgic': ['nostalgic', 'retro', '80s', 'synthwave', 'dream pop', 'vaporwave'],
    'anxious': ['anxious', 'tense', 'dark', 'industrial', 'noise', 'post-punk'],
    'euphoric': ['euphoric', 'ecstatic', 'trance', 'edm', 'dance', 'rave'],
    'dreamy': ['dreamy', 'dream pop', 'shoegaze', 'ethereal', 'ambient', 'psychedelic'],
    'dark': ['dark', 'gloomy', 'gothic', 'doom', 'darkwave', 'post-punk'],
    'energetic': ['energetic', 'upbeat', 'dance', 'party', 'fun', 'power pop'],
    'mysterious': ['mysterious', 'dark', 'atmospheric', 'trip hop', 'darkwave'],
    'hopeful': ['hopeful', 'uplifting', 'inspiring', 'post-rock', 'anthemic'],
    'intense': ['intense', 'powerful', 'heavy', 'progressive', 'post-rock'],
    'lonely': ['lonely', 'solitude', 'ambient', 'minimal', 'acoustic'],
    'rebellious': ['punk', 'grunge', 'protest', 'garage rock', 'riot grrrl'],
};

export const COLOR_TAGS = {
    'vermelho': ['passionate', 'fiery', 'flamenco', 'rock', 'punk', 'hard rock'],
    'azul': ['blue', 'blues', 'cool', 'chill', 'jazz', 'ambient', 'ocean'],
    'verde': ['nature', 'organic', 'folk', 'acoustic', 'world music', 'celtic'],
    'amarelo': ['sunny', 'happy', 'upbeat', 'sunshine pop', 'bossa nova', 'reggae'],
    'roxo': ['psychedelic', 'mystical', 'progressive', 'space rock', 'synthwave'],
    'preto': ['dark', 'gothic', 'black metal', 'industrial', 'doom', 'darkwave'],
    'branco': ['minimal', 'pure', 'ambient', 'classical', 'minimalism', 'ethereal'],
    'cinza': ['melancholic', 'atmospheric', 'post-punk', 'lo-fi', 'grey', 'ambient'],
    'laranja': ['warm', 'groovy', 'funk', 'soul', 'disco', 'afrobeat'],
    'rosa': ['sweet', 'pop', 'dream pop', 'k-pop', 'bubblegum pop', 'twee'],
    'dourado': ['classic', 'golden', 'soul', 'motown', 'classic rock', 'oldies'],
    'prata': ['futuristic', 'electronic', 'techno', 'synthwave', 'cyberpunk'],
    // English colors
    'red': ['passionate', 'fiery', 'rock', 'punk', 'hard rock', 'flamenco'],
    'blue': ['blue', 'blues', 'cool', 'chill', 'jazz', 'ambient'],
    'green': ['nature', 'organic', 'folk', 'acoustic', 'world music'],
    'yellow': ['sunny', 'happy', 'upbeat', 'sunshine pop', 'reggae'],
    'purple': ['psychedelic', 'mystical', 'progressive', 'space rock'],
    'black': ['dark', 'gothic', 'black metal', 'industrial', 'doom'],
    'white': ['minimal', 'pure', 'ambient', 'classical', 'ethereal'],
    'grey': ['melancholic', 'atmospheric', 'post-punk', 'lo-fi'],
    'gray': ['melancholic', 'atmospheric', 'post-punk', 'lo-fi'],
    'orange': ['warm', 'groovy', 'funk', 'soul', 'disco'],
    'pink': ['sweet', 'pop', 'dream pop', 'k-pop', 'bubblegum pop'],
    'gold': ['classic', 'soul', 'motown', 'classic rock', 'oldies'],
    'silver': ['futuristic', 'electronic', 'techno', 'synthwave'],
};

export const CONCEPT_TAGS = {
    // Portuguese concepts
    'liberdade': ['freedom', 'free', 'protest', 'reggae', 'folk', 'world', 'anthemic'],
    'morte': ['death', 'dark', 'doom', 'gothic', 'requiem', 'funeral doom'],
    'amor': ['love', 'romantic', 'ballad', 'soul', 'rnb', 'bossa nova'],
    'guerra': ['war', 'protest', 'metal', 'industrial', 'martial', 'epic'],
    'natureza': ['nature', 'organic', 'folk', 'acoustic', 'new age', 'ambient'],
    'espaço': ['space', 'space rock', 'ambient', 'electronic', 'shoegaze', 'cosmic'],
    'espaco': ['space', 'space rock', 'ambient', 'electronic', 'shoegaze', 'cosmic'],
    'viagem': ['travel', 'world music', 'psychedelic', 'road trip', 'indie', 'adventure'],
    'noite': ['nocturnal', 'night', 'dark', 'trip hop', 'jazz', 'chillwave', 'synthwave'],
    'chuva': ['rain', 'melancholy', 'ambient', 'lo-fi', 'post-rock', 'atmospheric'],
    'solidão': ['solitude', 'lonely', 'ambient', 'minimal', 'acoustic', 'introspective'],
    'solidao': ['solitude', 'lonely', 'ambient', 'minimal', 'acoustic', 'introspective'],
    'festa': ['party', 'dance', 'fun', 'disco', 'edm', 'pop', 'house'],
    'infância': ['childhood', 'nostalgic', 'innocent', 'lullaby', 'indie pop', 'twee'],
    'infancia': ['childhood', 'nostalgic', 'innocent', 'lullaby', 'indie pop', 'twee'],
    'sonho': ['dream', 'dreamy', 'dream pop', 'psychedelic', 'ambient', 'ethereal'],
    'caos': ['chaos', 'noise', 'experimental', 'avant-garde', 'industrial', 'math rock'],
    'silêncio': ['silence', 'minimal', 'ambient', 'drone', 'quiet', 'meditation'],
    'silencio': ['silence', 'minimal', 'ambient', 'drone', 'quiet', 'meditation'],
    'tempo': ['time', 'progressive', 'art rock', 'ambient', 'classical', 'post-rock'],
    'oceano': ['ocean', 'ambient', 'surf rock', 'chill', 'new age', 'post-rock'],
    'floresta': ['forest', 'folk', 'black metal', 'ambient', 'nature', 'celtic'],
    'fogo': ['fire', 'aggressive', 'metal', 'punk', 'flamenco', 'hard rock'],
    'futuro': ['futuristic', 'electronic', 'synthwave', 'cyberpunk', 'techno', 'idm'],
    'passado': ['retro', 'vintage', 'oldies', 'classic rock', 'nostalgic', '60s'],
    'magia': ['magical', 'fantasy', 'progressive', 'symphonic', 'celtic', 'new age'],
    'cidade': ['urban', 'hip hop', 'electronic', 'trip hop', 'jazz', 'lo-fi'],
    'cyberpunk': ['cyberpunk', 'synthwave', 'industrial', 'darkwave', 'electronic', 'ebm', 'futuristic'],
    'distópico': ['dystopian', 'industrial', 'darkwave', 'post-punk', 'synthwave', 'cyberpunk'],
    'distopico': ['dystopian', 'industrial', 'darkwave', 'post-punk', 'synthwave', 'cyberpunk'],
    'steampunk': ['steampunk', 'folk', 'industrial', 'progressive', 'celtic', 'chamber pop'],
    'revolução': ['revolution', 'protest', 'punk', 'folk', 'political', 'reggae'],
    'revolucao': ['revolution', 'protest', 'punk', 'folk', 'political', 'reggae'],
    // English concepts
    'freedom': ['freedom', 'free', 'protest', 'reggae', 'folk', 'anthemic'],
    'death': ['death', 'dark', 'doom', 'gothic', 'requiem', 'funeral doom'],
    'love': ['love', 'romantic', 'ballad', 'soul', 'rnb', 'bossa nova'],
    'war': ['war', 'protest', 'metal', 'industrial', 'martial'],
    'nature': ['nature', 'organic', 'folk', 'acoustic', 'new age'],
    'space': ['space', 'space rock', 'ambient', 'electronic', 'cosmic'],
    'night': ['nocturnal', 'night', 'dark', 'trip hop', 'jazz', 'synthwave'],
    'rain': ['rain', 'melancholy', 'ambient', 'lo-fi', 'post-rock'],
    'solitude': ['solitude', 'lonely', 'ambient', 'minimal', 'acoustic'],
    'party': ['party', 'dance', 'fun', 'disco', 'edm', 'pop'],
    'dream': ['dream', 'dreamy', 'dream pop', 'psychedelic', 'ambient'],
    'chaos': ['chaos', 'noise', 'experimental', 'avant-garde', 'industrial'],
    'fire': ['fire', 'aggressive', 'metal', 'punk', 'flamenco'],
    'future': ['futuristic', 'electronic', 'synthwave', 'cyberpunk', 'techno'],
    'magic': ['magical', 'fantasy', 'progressive', 'symphonic', 'celtic'],
    'city': ['urban', 'hip hop', 'electronic', 'trip hop', 'jazz'],
    'ocean': ['ocean', 'ambient', 'surf rock', 'chill', 'new age'],
    'forest': ['forest', 'folk', 'black metal', 'ambient', 'nature'],
};

// Movie genre → music tags mapping
export const MOVIE_GENRE_TAGS = {
    'horror': ['dark', 'gothic', 'industrial', 'doom', 'horror', 'ambient'],
    'terror': ['dark', 'gothic', 'industrial', 'doom', 'horror', 'ambient'],
    'romance': ['romantic', 'love', 'ballad', 'soul', 'dream pop'],
    'action': ['energetic', 'rock', 'metal', 'electronic', 'epic'],
    'ação': ['energetic', 'rock', 'metal', 'electronic', 'epic'],
    'comedy': ['fun', 'upbeat', 'pop', 'indie pop', 'feel good'],
    'comédia': ['fun', 'upbeat', 'pop', 'indie pop', 'feel good'],
    'comedia': ['fun', 'upbeat', 'pop', 'indie pop', 'feel good'],
    'drama': ['emotional', 'dramatic', 'cinematic', 'orchestral', 'post-rock'],
    'sci-fi': ['electronic', 'synthwave', 'space rock', 'ambient', 'futuristic'],
    'ficção científica': ['electronic', 'synthwave', 'space rock', 'ambient'],
    'thriller': ['tense', 'dark', 'industrial', 'trip hop', 'suspense'],
    'suspense': ['tense', 'dark', 'trip hop', 'atmospheric', 'cinematic'],
    'fantasy': ['epic', 'symphonic', 'celtic', 'progressive', 'power metal'],
    'fantasia': ['epic', 'symphonic', 'celtic', 'progressive', 'power metal'],
    'documentary': ['ambient', 'world music', 'post-rock', 'experimental'],
    'documentário': ['ambient', 'world music', 'post-rock', 'experimental'],
    'animation': ['whimsical', 'orchestral', 'indie pop', 'electronic'],
    'animação': ['whimsical', 'orchestral', 'indie pop', 'electronic'],
    'war': ['epic', 'orchestral', 'martial', 'protest', 'folk'],
    'western': ['country', 'americana', 'folk', 'blues', 'spaghetti western'],
    'noir': ['jazz', 'dark', 'blues', 'film noir', 'trip hop'],
    'musical': ['musical', 'broadway', 'jazz', 'soul', 'pop'],
};

// Book genre → music tags mapping
export const BOOK_GENRE_TAGS = {
    'fiction': ['indie', 'alternative', 'art rock', 'singer-songwriter'],
    'ficção': ['indie', 'alternative', 'art rock', 'singer-songwriter'],
    'ficcao': ['indie', 'alternative', 'art rock', 'singer-songwriter'],
    'poetry': ['poetic', 'folk', 'singer-songwriter', 'chamber pop', 'art'],
    'poesia': ['poetic', 'folk', 'singer-songwriter', 'chamber pop', 'art'],
    'philosophy': ['progressive', 'art rock', 'experimental', 'post-rock', 'ambient'],
    'filosofia': ['progressive', 'art rock', 'experimental', 'post-rock', 'ambient'],
    'history': ['classical', 'folk', 'world music', 'protest', 'epic'],
    'história': ['classical', 'folk', 'world music', 'protest', 'epic'],
    'science fiction': ['electronic', 'synthwave', 'space rock', 'ambient', 'idm'],
    'ficção científica': ['electronic', 'synthwave', 'space rock', 'ambient'],
    'fantasy': ['symphonic', 'celtic', 'progressive', 'power metal', 'folk metal'],
    'fantasia': ['symphonic', 'celtic', 'progressive', 'power metal', 'folk metal'],
    'romance': ['romantic', 'love', 'pop', 'ballad', 'bossa nova'],
    'thriller': ['dark', 'tense', 'industrial', 'trip hop', 'electronic'],
    'horror': ['dark', 'gothic', 'doom', 'black metal', 'darkwave'],
    'terror': ['dark', 'gothic', 'doom', 'black metal', 'darkwave'],
    'self-help': ['uplifting', 'inspiring', 'ambient', 'new age', 'motivational'],
    'autoajuda': ['uplifting', 'inspiring', 'ambient', 'new age', 'motivational'],
    'biography': ['singer-songwriter', 'folk', 'acoustic', 'blues', 'soul'],
    'biografia': ['singer-songwriter', 'folk', 'acoustic', 'blues', 'soul'],
    'magical realism': ['psychedelic', 'world music', 'latin', 'dream pop', 'tropicalia'],
    'realismo mágico': ['psychedelic', 'world music', 'latin', 'dream pop', 'tropicalia'],
    'dystopia': ['industrial', 'synthwave', 'darkwave', 'post-punk', 'cyberpunk'],
    'distopia': ['industrial', 'synthwave', 'darkwave', 'post-punk', 'cyberpunk'],
};

// Get all tags for an input
export function getTagsForInput(input, type) {
    const normalized = input.toLowerCase().trim();
    let tags = [];

    switch (type) {
        case 'sentimento':
        case 'feeling':
            tags = SENTIMENT_TAGS[normalized] || [];
            break;
        case 'cor':
        case 'color':
            tags = COLOR_TAGS[normalized] || [];
            break;
        case 'conceito':
        case 'concept':
            tags = CONCEPT_TAGS[normalized] || [];
            break;
        case 'filme':
        case 'movie':
            // For movies, we try genre tags first; specific movies get enriched via TMDB
            tags = MOVIE_GENRE_TAGS[normalized] || [];
            break;
        case 'livro':
        case 'book':
            tags = BOOK_GENRE_TAGS[normalized] || [];
            break;
        default:
            // Try all maps
            tags = SENTIMENT_TAGS[normalized]
                || COLOR_TAGS[normalized]
                || CONCEPT_TAGS[normalized]
                || MOVIE_GENRE_TAGS[normalized]
                || BOOK_GENRE_TAGS[normalized]
                || [];
    }

    return [...new Set(tags)];
}

// Keyword extraction from text (sinopses, descriptions)
export function extractKeywordsFromText(text) {
    const emotionWords = new Set([
        // English
        'love', 'death', 'war', 'peace', 'fear', 'hope', 'anger', 'joy', 'sadness',
        'loneliness', 'freedom', 'betrayal', 'revenge', 'sacrifice', 'adventure',
        'mystery', 'magic', 'power', 'darkness', 'light', 'dream', 'nightmare',
        'chaos', 'order', 'nature', 'technology', 'solitude', 'passion', 'madness',
        'obsession', 'fate', 'destiny', 'survival', 'rebellion', 'innocence',
        'corruption', 'redemption', 'loss', 'grief', 'desire', 'horror', 'terror',
        'suspense', 'intrigue', 'melancholy', 'nostalgia', 'euphoria',
        // Portuguese
        'amor', 'morte', 'guerra', 'paz', 'medo', 'esperança', 'raiva', 'alegria',
        'tristeza', 'solidão', 'liberdade', 'traição', 'vingança', 'sacrifício',
        'aventura', 'mistério', 'magia', 'poder', 'escuridão', 'luz', 'sonho',
        'pesadelo', 'caos', 'ordem', 'natureza', 'tecnologia', 'paixão', 'loucura',
        'obsessão', 'destino', 'sobrevivência', 'rebelião', 'inocência',
        'corrupção', 'redenção', 'perda', 'luto', 'desejo', 'horror', 'terror',
        'suspense', 'intriga', 'melancolia', 'nostalgia', 'euforia', 'felicidade', 'feliz',
        'dúvida', 'incerteza', 'indecisão',
    ]);

    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    const found = words.filter(w => emotionWords.has(w));

    // Map found keywords to music tags
    let resultTags = [];
    for (const keyword of found) {
        const sentTags = SENTIMENT_TAGS[keyword] || [];
        const conTags = CONCEPT_TAGS[keyword] || [];
        resultTags.push(...sentTags, ...conTags);
    }

    return [...new Set(resultTags)];
}

/**
 * Detect the input type and return matching curated tags.
 * Checks all curated maps in priority order.
 * Returns { type: string, tags: string[] } or null if no curated match found.
 */
export function detectInputType(query) {
    const normalized = query.toLowerCase().trim();

    // Check sentiments first (most common input type)
    if (SENTIMENT_TAGS[normalized]) {
        return { type: 'sentimento', tags: SENTIMENT_TAGS[normalized] };
    }

    // Check colors
    if (COLOR_TAGS[normalized]) {
        return { type: 'cor', tags: COLOR_TAGS[normalized] };
    }

    // Check concepts
    if (CONCEPT_TAGS[normalized]) {
        return { type: 'conceito', tags: CONCEPT_TAGS[normalized] };
    }

    // Check movie genre tags (for genre-level searches like "horror", "drama")
    if (MOVIE_GENRE_TAGS[normalized]) {
        return { type: 'genero', tags: MOVIE_GENRE_TAGS[normalized] };
    }

    // Check book genre tags
    if (BOOK_GENRE_TAGS[normalized]) {
        return { type: 'genero', tags: BOOK_GENRE_TAGS[normalized] };
    }

    // Not a curated vibe — probably an entity (movie title, book title, etc.)
    return null;
}

/**
 * Expand movie genres from TMDB into music-compatible tags.
 * E.g., ["drama", "ficção científica"] → ["emotional", "dramatic", "cinematic", "electronic", "synthwave", ...]
 */
export function expandGenresToMusicTags(genres) {
    const tags = [];
    for (const genre of genres) {
        const normalized = genre.toLowerCase().trim();
        const musicTags = MOVIE_GENRE_TAGS[normalized] || BOOK_GENRE_TAGS[normalized] || [];
        tags.push(...musicTags);
    }
    return [...new Set(tags)];
}

