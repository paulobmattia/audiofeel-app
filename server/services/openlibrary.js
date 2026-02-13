// Open Library API service (books)
import fetch from 'node-fetch';

const BASE_URL = 'https://openlibrary.org';

/** Search for a book by title */
export async function searchBook(title) {
    const url = new URL(`${BASE_URL}/search.json`);
    url.searchParams.set('title', title);
    url.searchParams.set('limit', '10');
    url.searchParams.set('fields', 'key,title,author_name,first_publish_year,subject,cover_i,edition_count');

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Open Library API error: ${res.status}`);
    const data = await res.json();

    const docs = data?.docs || [];
    if (docs.length === 0) return null;

    // Filter for books with valid authors, sort by popularity (edition_count)
    const candidates = docs.filter(d => d.author_name && d.author_name.length > 0);
    candidates.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));

    // Fallback to first result if no author found
    const book = candidates.length > 0 ? candidates[0] : docs[0];

    return {
        key: book.key,
        title: book.title,
        author: book.author_name?.[0] || 'Unknown',
        year: book.first_publish_year,
        subjects: (book.subject || []).slice(0, 20),
        coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : '',
        editionsCount: book.edition_count || 0
    };
}

/** Get book description/synopsis */
export async function getBookDetails(workKey) {
    const res = await fetch(`${BASE_URL}${workKey}.json`);
    if (!res.ok) return null;
    const data = await res.json();

    let description = '';
    if (typeof data.description === 'string') {
        description = data.description;
    } else if (data.description?.value) {
        description = data.description.value;
    }

    return {
        title: data.title,
        description,
        subjects: data.subjects || [],
    };
}

/** Full enrichment for a book title */
export async function enrichBook(title) {
    const book = await searchBook(title);
    if (!book) return null;

    const details = await getBookDetails(book.key);

    return {
        title: book.title,
        author: book.author,
        year: book.year,
        subjects: [...new Set([...(book.subjects || []), ...(details?.subjects || [])])].slice(0, 30),
        description: details?.description || '',
        description: details?.description || '',
        coverUrl: book.coverUrl,
        editionsCount: book.editionsCount
    };
}
