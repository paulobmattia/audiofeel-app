// Curated database of popular books (especially Portuguese translations) 
// to ensure accurate tagging and metadata retrieval from Open Library.

export const KNOWN_BOOKS = {
    // Horror / Suspense
    'a assombração na casa da colina': {
        title: 'A Assombração da Casa da Colina',
        query: 'The Haunting of Hill House',
        tags: ['horror', 'gothic', 'psychological thriller', 'ghosts', 'dark', 'suspense'],
        author: 'Shirley Jackson'
    },
    'assombração na casa da colina': {
        title: 'A Assombração da Casa da Colina',
        query: 'The Haunting of Hill House',
        tags: ['horror', 'gothic', 'psychological thriller', 'ghosts', 'dark', 'suspense'],
        author: 'Shirley Jackson'
    },
    'a assombracao na casa da colina': {
        title: 'A Assombração da Casa da Colina',
        query: 'The Haunting of Hill House',
        tags: ['horror', 'gothic', 'psychological thriller', 'ghosts', 'dark', 'suspense'],
        author: 'Shirley Jackson'
    },
    'assombracao na casa da colina': {
        title: 'A Assombração da Casa da Colina',
        query: 'The Haunting of Hill House',
        tags: ['horror', 'gothic', 'psychological thriller', 'ghosts', 'dark', 'suspense'],
        author: 'Shirley Jackson'
    },
    // Variation with "da"
    'a assombração da casa da colina': {
        title: 'A Assombração da Casa da Colina',
        query: 'The Haunting of Hill House',
        tags: ['horror', 'gothic', 'psychological thriller', 'ghosts', 'dark', 'suspense'],
        author: 'Shirley Jackson'
    },
    'a assombracao da casa da colina': {
        title: 'A Assombração da Casa da Colina',
        query: 'The Haunting of Hill House',
        tags: ['horror', 'gothic', 'psychological thriller', 'ghosts', 'dark', 'suspense'],
        author: 'Shirley Jackson'
    },
    'assombração da casa da colina': {
        title: 'A Assombração da Casa da Colina',
        query: 'The Haunting of Hill House',
        tags: ['horror', 'gothic', 'psychological thriller', 'ghosts', 'dark', 'suspense'],
        author: 'Shirley Jackson'
    },
    'assombracao da casa da colina': {
        title: 'A Assombração da Casa da Colina',
        query: 'The Haunting of Hill House',
        tags: ['horror', 'gothic', 'psychological thriller', 'ghosts', 'dark', 'suspense'],
        author: 'Shirley Jackson'
    },
    'o iluminado': {
        title: 'O Iluminado',
        query: 'The Shining Stephen King',
        tags: ['horror', 'psychological thriller', 'supernatural', 'tense', 'dark'],
        author: 'Stephen King'
    },
    'guerra dos mundos': {
        title: 'A Guerra dos Mundos',
        query: 'The War of the Worlds',
        tags: ['sci-fi', 'aliens', 'invasion', 'classic', 'suspense', 'panic'],
        author: 'H.G. Wells'
    },
    'a guerra dos mundos': {
        title: 'A Guerra dos Mundos',
        query: 'The War of the Worlds',
        tags: ['sci-fi', 'aliens', 'invasion', 'classic', 'suspense', 'panic'],
        author: 'H.G. Wells'
    },
    'it a coisa': {
        title: 'It: A Coisa',
        query: 'It Stephen King',
        tags: ['horror', 'coming of age', 'friendship', 'fear', 'dark'],
        author: 'Stephen King'
    },
    'cemiterio maldito': {
        title: 'Cemitério Maldito',
        query: 'Pet Sematary',
        tags: ['horror', 'grief', 'death', 'dark', 'supernatural'],
        author: 'Stephen King'
    },

    // Sci-Fi / Dystopia
    '1984': {
        title: '1984',
        query: '1984 George Orwell',
        tags: ['dystopian', 'political', 'totalitarianism', 'dark', 'psychological'],
        author: 'George Orwell'
    },
    'admiravel mundo novo': {
        title: 'Admirável Mundo Novo',
        query: 'Brave New World',
        tags: ['dystopian', 'science fiction', 'philosophy', 'future', 'society'],
        author: 'Aldous Huxley'
    },
    'admirável mundo novo': {
        title: 'Admirável Mundo Novo',
        query: 'Brave New World',
        tags: ['dystopian', 'science fiction', 'philosophy', 'future', 'society'],
        author: 'Aldous Huxley'
    },
    'fahrenheit 451': {
        title: 'Fahrenheit 451',
        query: 'Fahrenheit 451',
        tags: ['dystopian', 'censorship', 'books', 'fire', 'future'],
        author: 'Ray Bradbury'
    },
    'neuromancer': {
        title: 'Neuromancer',
        query: 'Neuromancer',
        tags: ['cyberpunk', 'sci-fi', 'hacker', 'future', 'technology'],
        author: 'William Gibson'
    },
    'duna': {
        title: 'Duna',
        query: 'Dune Frank Herbert',
        tags: ['sci-fi', 'epic', 'political', 'space opera', 'desert'],
        author: 'Frank Herbert'
    },
    'a revolução dos bichos': {
        title: 'A Revolução dos Bichos',
        query: 'Animal Farm',
        tags: ['classic', 'political', 'satire', 'dystopian', 'allegory'],
        author: 'George Orwell'
    },
    'revolução dos bichos': {
        title: 'A Revolução dos Bichos',
        query: 'Animal Farm',
        tags: ['classic', 'political', 'satire', 'dystopian', 'allegory'],
        author: 'George Orwell'
    },

    // Classics / Literature
    'crime e castigo': {
        title: 'Crime e Castigo',
        query: 'Crime and Punishment Dostoevsky',
        tags: ['classic', 'psychological', 'philosophy', 'crime', 'redemption', 'russian literature'],
        author: 'Fyodor Dostoevsky'
    },
    'cem anos de solidão': {
        title: 'Cem Anos de Solidão',
        query: 'One Hundred Years of Solitude',
        tags: ['magical realism', 'family', 'epic', 'history', 'colombia'],
        author: 'Gabriel García Márquez'
    },
    'cem anos de solidao': {
        title: 'Cem Anos de Solidão',
        query: 'One Hundred Years of Solitude',
        tags: ['magical realism', 'family', 'epic', 'history', 'colombia'],
        author: 'Gabriel García Márquez'
    },
    'dom casmurro': {
        title: 'Dom Casmurro',
        query: 'Dom Casmurro',
        tags: ['classic', 'brazilian literature', 'jealousy', 'psychological', 'romance'],
        author: 'Machado de Assis'
    },
    'memórias póstumas de brás cubas': {
        title: 'Memórias Póstumas de Brás Cubas',
        query: 'The Posthumous Memoirs of Bras Cubas',
        tags: ['classic', 'satire', 'cynicism', 'philosophy', 'brazilian', 'literatura brasileira'],
        author: 'Machado de Assis'
    },
    'memorias postumas de bras cubas': {
        title: 'Memórias Póstumas de Brás Cubas',
        query: 'The Posthumous Memoirs of Bras Cubas',
        tags: ['classic', 'satire', 'cynicism', 'philosophy', 'brazilian', 'literatura brasileira'],
        author: 'Machado de Assis'
    },
    'orgulho e preconceito': {
        title: 'Orgulho e Preconceito',
        query: 'Pride and Prejudice',
        tags: ['romance', 'classic', 'society', 'love', 'witty'],
        author: 'Jane Austen'
    },
    'o apanhador no campo de centeio': {
        title: 'O Apanhador no Campo de Centeio',
        query: 'The Catcher in the Rye',
        tags: ['coming of age', 'alienation', 'angst', 'teen', 'classic'],
        author: 'J.D. Salinger'
    },
    'o grande gatsby': {
        title: 'O Grande Gatsby',
        query: 'The Great Gatsby',
        tags: ['jazz age', 'wealth', 'tragedy', 'romance', 'classic'],
        author: 'F. Scott Fitzgerald'
    },
    'o pequeno príncipe': {
        title: 'O Pequeno Príncipe',
        query: 'The Little Prince',
        tags: ['classic', 'philosophy', 'friendship', 'childhood', 'fantasy'],
        author: 'Antoine de Saint-Exupéry'
    },
    'o pequeno principe': {
        title: 'O Pequeno Príncipe',
        query: 'The Little Prince',
        tags: ['classic', 'philosophy', 'friendship', 'childhood', 'fantasy'],
        author: 'Antoine de Saint-Exupéry'
    },

    // Fantasy
    'o senhor dos anéis': {
        title: 'O Senhor dos Anéis',
        query: 'The Lord of the Rings',
        tags: ['fantasy', 'epic', 'adventure', 'magic', 'war'],
        author: 'J.R.R. Tolkien'
    },
    'o senhor dos aneis': {
        title: 'O Senhor dos Anéis',
        query: 'The Lord of the Rings',
        tags: ['fantasy', 'epic', 'adventure', 'magic', 'war'],
        author: 'J.R.R. Tolkien'
    },
    'o hobbit': {
        title: 'O Hobbit',
        query: 'The Hobbit',
        tags: ['fantasy', 'adventure', 'dragons', 'magic', 'classic'],
        author: 'J.R.R. Tolkien'
    },
    'harry potter': {
        title: 'Harry Potter',
        query: 'Harry Potter and the Sorcerer\'s Stone',
        tags: ['fantasy', 'magic', 'school', 'friendship', 'adventure'],
        author: 'J.K. Rowling'
    },
    'game of thrones': {
        title: 'A Game of Thrones',
        query: 'A Game of Thrones',
        tags: ['fantasy', 'political', 'war', 'dragons', 'epic'],
        author: 'George R.R. Martin'
    },
    'guerra dos tronos': {
        title: 'A Guerra dos Tronos',
        query: 'A Game of Thrones',
        tags: ['fantasy', 'political', 'war', 'dragons', 'epic'],
        author: 'George R.R. Martin'
    }
};
