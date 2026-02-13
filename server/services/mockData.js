// Mock data for when API keys are not configured
// Provides realistic-looking results for demo/testing

export function getMockTracksByTag(tag) {
    const mockDB = {
        'melancholy': [
            { name: 'Videotape', artist: 'Radiohead', listeners: 500000, image: '' },
            { name: 'Skinny Love', artist: 'Bon Iver', listeners: 800000, image: '' },
            { name: 'The Night We Met', artist: 'Lord Huron', listeners: 700000, image: '' },
            { name: 'Holocene', artist: 'Bon Iver', listeners: 600000, image: '' },
            { name: 'Motion Picture Soundtrack', artist: 'Radiohead', listeners: 400000, image: '' },
        ],
        'melancholic': [
            { name: 'Exit Music (For a Film)', artist: 'Radiohead', listeners: 900000, image: '' },
            { name: 'Black Star', artist: 'Radiohead', listeners: 350000, image: '' },
            { name: 'Tears in Heaven', artist: 'Eric Clapton', listeners: 1200000, image: '' },
            { name: 'Fade Into You', artist: 'Mazzy Star', listeners: 700000, image: '' },
            { name: 'Between the Bars', artist: 'Elliott Smith', listeners: 500000, image: '' },
        ],
        'sad': [
            { name: 'Everybody Hurts', artist: 'R.E.M.', listeners: 1000000, image: '' },
            { name: 'Mad World', artist: 'Gary Jules', listeners: 900000, image: '' },
            { name: 'Hurt', artist: 'Johnny Cash', listeners: 1500000, image: '' },
            { name: 'The Sound of Silence', artist: 'Simon & Garfunkel', listeners: 2000000, image: '' },
            { name: 'Yesterday', artist: 'The Beatles', listeners: 2500000, image: '' },
        ],
        'ambient': [
            { name: 'An Ending (Ascent)', artist: 'Brian Eno', listeners: 300000, image: '' },
            { name: 'Weightless', artist: 'Marconi Union', listeners: 200000, image: '' },
            { name: 'Music for Airports 1/1', artist: 'Brian Eno', listeners: 250000, image: '' },
            { name: 'Avril 14th', artist: 'Aphex Twin', listeners: 400000, image: '' },
            { name: '#3', artist: 'Aphex Twin', listeners: 150000, image: '' },
        ],
        'dreampop': [
            { name: 'Cherry-coloured Funk', artist: 'Cocteau Twins', listeners: 300000, image: '' },
            { name: 'Just Like Honey', artist: 'The Jesus and Mary Chain', listeners: 500000, image: '' },
            { name: 'Alison', artist: 'Slowdive', listeners: 400000, image: '' },
            { name: 'Space Song', artist: 'Beach House', listeners: 800000, image: '' },
            { name: 'When You Sleep', artist: 'My Bloody Valentine', listeners: 350000, image: '' },
        ],
        'shoegaze': [
            { name: 'Only Shallow', artist: 'My Bloody Valentine', listeners: 400000, image: '' },
            { name: 'When the Sun Hits', artist: 'Slowdive', listeners: 300000, image: '' },
            { name: 'Vapour Trail', artist: 'Ride', listeners: 250000, image: '' },
            { name: 'Allison', artist: 'Slowdive', listeners: 350000, image: '' },
            { name: 'Souvlaki Space Station', artist: 'Slowdive', listeners: 200000, image: '' },
        ],
        'happy': [
            { name: 'Here Comes the Sun', artist: 'The Beatles', listeners: 3000000, image: '' },
            { name: 'Walking on Sunshine', artist: 'Katrina and the Waves', listeners: 1500000, image: '' },
            { name: 'Happy', artist: 'Pharrell Williams', listeners: 2500000, image: '' },
            { name: "Don't Stop Me Now", artist: 'Queen', listeners: 2000000, image: '' },
            { name: 'Mr. Blue Sky', artist: 'Electric Light Orchestra', listeners: 1800000, image: '' },
        ],
        'upbeat': [
            { name: 'Shut Up and Dance', artist: 'Walk the Moon', listeners: 1200000, image: '' },
            { name: 'September', artist: 'Earth, Wind & Fire', listeners: 1500000, image: '' },
            { name: 'Uptown Funk', artist: 'Bruno Mars', listeners: 2500000, image: '' },
            { name: "Can't Stop the Feeling!", artist: 'Justin Timberlake', listeners: 1800000, image: '' },
            { name: 'Shake It Off', artist: 'Taylor Swift', listeners: 2000000, image: '' },
        ],
        'dark': [
            { name: 'Closer', artist: 'Nine Inch Nails', listeners: 900000, image: '' },
            { name: 'Head Like a Hole', artist: 'Nine Inch Nails', listeners: 700000, image: '' },
            { name: 'A Forest', artist: 'The Cure', listeners: 600000, image: '' },
            { name: 'Bela Lugosi\'s Dead', artist: 'Bauhaus', listeners: 400000, image: '' },
            { name: 'Personal Jesus', artist: 'Depeche Mode', listeners: 1000000, image: '' },
        ],
        'gothic': [
            { name: 'Bela Lugosi\'s Dead', artist: 'Bauhaus', listeners: 400000, image: '' },
            { name: 'Love Will Tear Us Apart', artist: 'Joy Division', listeners: 900000, image: '' },
            { name: 'Lucretia My Reflection', artist: 'The Sisters of Mercy', listeners: 200000, image: '' },
            { name: 'A Forest', artist: 'The Cure', listeners: 600000, image: '' },
            { name: 'She Sells Sanctuary', artist: 'The Cult', listeners: 350000, image: '' },
        ],
        'psychedelic': [
            { name: 'Tomorrow Never Knows', artist: 'The Beatles', listeners: 600000, image: '' },
            { name: 'Tame Impala', artist: 'Let It Happen', listeners: 800000, image: '' },
            { name: 'Purple Haze', artist: 'Jimi Hendrix', listeners: 1500000, image: '' },
            { name: 'White Rabbit', artist: 'Jefferson Airplane', listeners: 900000, image: '' },
            { name: 'Comfortably Numb', artist: 'Pink Floyd', listeners: 2000000, image: '' },
        ],
        'electronic': [
            { name: 'Around the World', artist: 'Daft Punk', listeners: 1500000, image: '' },
            { name: 'Windowlicker', artist: 'Aphex Twin', listeners: 400000, image: '' },
            { name: 'Born Slippy', artist: 'Underworld', listeners: 500000, image: '' },
            { name: 'Blue Monday', artist: 'New Order', listeners: 1200000, image: '' },
            { name: 'Teardrop', artist: 'Massive Attack', listeners: 1000000, image: '' },
        ],
        'synthwave': [
            { name: 'Nightcall', artist: 'Kavinsky', listeners: 800000, image: '' },
            { name: 'Tech Noir', artist: 'Gunship', listeners: 300000, image: '' },
            { name: 'Turbo Killer', artist: 'Carpenter Brut', listeners: 400000, image: '' },
            { name: 'Running in the Night', artist: 'FM-84', listeners: 250000, image: '' },
            { name: 'A Real Hero', artist: 'College & Electric Youth', listeners: 600000, image: '' },
        ],
        'romantic': [
            { name: 'At Last', artist: 'Etta James', listeners: 1200000, image: '' },
            { name: 'Unchained Melody', artist: 'The Righteous Brothers', listeners: 1500000, image: '' },
            { name: "Can't Help Falling in Love", artist: 'Elvis Presley', listeners: 2000000, image: '' },
            { name: 'Something', artist: 'The Beatles', listeners: 1800000, image: '' },
            { name: 'La Vie En Rose', artist: 'Edith Piaf', listeners: 1000000, image: '' },
        ],
        'nostalgic': [
            { name: 'Everybody Wants to Rule the World', artist: 'Tears for Fears', listeners: 1500000, image: '' },
            { name: 'Take On Me', artist: 'a-ha', listeners: 2000000, image: '' },
            { name: 'Sweet Child O\' Mine', artist: "Guns N' Roses", listeners: 2500000, image: '' },
            { name: 'Under Pressure', artist: 'Queen & David Bowie', listeners: 1200000, image: '' },
            { name: 'Africa', artist: 'Toto', listeners: 1800000, image: '' },
        ],
        'folk': [
            { name: 'Blowin\' in the Wind', artist: 'Bob Dylan', listeners: 1000000, image: '' },
            { name: 'The Times They Are a-Changin\'', artist: 'Bob Dylan', listeners: 800000, image: '' },
            { name: 'Hallelujah', artist: 'Jeff Buckley', listeners: 1500000, image: '' },
            { name: 'Fire and Rain', artist: 'James Taylor', listeners: 700000, image: '' },
            { name: 'Fast Car', artist: 'Tracy Chapman', listeners: 900000, image: '' },
        ],
        'jazz': [
            { name: 'So What', artist: 'Miles Davis', listeners: 800000, image: '' },
            { name: 'Take Five', artist: 'Dave Brubeck', listeners: 600000, image: '' },
            { name: 'My Favorite Things', artist: 'John Coltrane', listeners: 500000, image: '' },
            { name: 'Summertime', artist: 'Ella Fitzgerald', listeners: 700000, image: '' },
            { name: "'Round Midnight", artist: 'Thelonious Monk', listeners: 400000, image: '' },
        ],
        'bossa nova': [
            { name: 'Garota de Ipanema', artist: 'Tom Jobim', listeners: 1000000, image: '' },
            { name: 'Águas de Março', artist: 'Tom Jobim', listeners: 500000, image: '' },
            { name: 'Chega de Saudade', artist: 'João Gilberto', listeners: 400000, image: '' },
            { name: 'Desafinado', artist: 'Tom Jobim', listeners: 350000, image: '' },
            { name: 'Corcovado', artist: 'Tom Jobim', listeners: 300000, image: '' },
        ],
        'trip hop': [
            { name: 'Teardrop', artist: 'Massive Attack', listeners: 1000000, image: '' },
            { name: 'Glory Box', artist: 'Portishead', listeners: 800000, image: '' },
            { name: 'Angel', artist: 'Massive Attack', listeners: 600000, image: '' },
            { name: 'Wandering Star', artist: 'Portishead', listeners: 400000, image: '' },
            { name: 'Black Milk', artist: 'Massive Attack', listeners: 300000, image: '' },
        ],
        'post-rock': [
            { name: 'Your Hand in Mine', artist: 'Explosions in the Sky', listeners: 400000, image: '' },
            { name: 'Storm', artist: 'Godspeed You! Black Emperor', listeners: 200000, image: '' },
            { name: 'Intro', artist: 'The xx', listeners: 900000, image: '' },
            { name: 'Svefn-g-englar', artist: 'Sigur Rós', listeners: 350000, image: '' },
            { name: 'First Breath After Coma', artist: 'Explosions in the Sky', listeners: 300000, image: '' },
        ],
        'industrial': [
            { name: 'Head Like a Hole', artist: 'Nine Inch Nails', listeners: 700000, image: '' },
            { name: 'Closer', artist: 'Nine Inch Nails', listeners: 900000, image: '' },
            { name: 'Personal Jesus', artist: 'Depeche Mode', listeners: 1000000, image: '' },
            { name: 'Du Hast', artist: 'Rammstein', listeners: 1200000, image: '' },
            { name: 'Stigmata', artist: 'Ministry', listeners: 200000, image: '' },
        ],
        'punk': [
            { name: 'Blitzkrieg Bop', artist: 'Ramones', listeners: 900000, image: '' },
            { name: 'Anarchy in the U.K.', artist: 'Sex Pistols', listeners: 800000, image: '' },
            { name: 'London Calling', artist: 'The Clash', listeners: 1200000, image: '' },
            { name: 'Holiday in Cambodia', artist: 'Dead Kennedys', listeners: 500000, image: '' },
            { name: 'I Wanna Be Sedated', artist: 'Ramones', listeners: 700000, image: '' },
        ],
        'chill': [
            { name: 'Intro', artist: 'The xx', listeners: 900000, image: '' },
            { name: 'Re: Stacks', artist: 'Bon Iver', listeners: 500000, image: '' },
            { name: 'Midnight City', artist: 'M83', listeners: 1200000, image: '' },
            { name: 'Breathe Me', artist: 'Sia', listeners: 800000, image: '' },
            { name: 'Sunset Lover', artist: 'Petit Biscuit', listeners: 600000, image: '' },
        ],
        'cinematic': [
            { name: 'Time', artist: 'Hans Zimmer', listeners: 800000, image: '' },
            { name: 'Concerning Hobbits', artist: 'Howard Shore', listeners: 400000, image: '' },
            { name: 'Comptine d\'un autre été', artist: 'Yann Tiersen', listeners: 900000, image: '' },
            { name: 'Now We Are Free', artist: 'Lisa Gerrard & Hans Zimmer', listeners: 500000, image: '' },
            { name: 'Arrival of the Birds', artist: 'The Cinematic Orchestra', listeners: 350000, image: '' },
        ],
        'mpb': [
            { name: 'Construção', artist: 'Chico Buarque', listeners: 300000, image: '' },
            { name: 'Força Estranha', artist: 'Caetano Veloso', listeners: 250000, image: '' },
            { name: 'Como Nossos Pais', artist: 'Elis Regina', listeners: 350000, image: '' },
            { name: 'Eu Sei Que Vou Te Amar', artist: 'Tom Jobim & Vinícius', listeners: 200000, image: '' },
            { name: 'Tropicália', artist: 'Caetano Veloso', listeners: 200000, image: '' },
        ],
    };

    return (mockDB[tag.toLowerCase()] || []).map(t => ({
        type: 'track',
        name: t.name,
        artist: t.artist,
        url: `https://www.last.fm/music/${encodeURIComponent(t.artist)}/_/${encodeURIComponent(t.name)}`,
        image: t.image,
        listeners: t.listeners,
        mbid: '',
        sourceTag: tag,
    }));
}

export function getMockArtistsByTag(tag) {
    const mockDB = {
        'melancholy': [
            { name: 'Radiohead', listeners: 5000000 },
            { name: 'Bon Iver', listeners: 3000000 },
            { name: 'Elliott Smith', listeners: 1500000 },
            { name: 'Nick Drake', listeners: 1200000 },
            { name: 'Jeff Buckley', listeners: 2000000 },
        ],
        'sad': [
            { name: 'Radiohead', listeners: 5000000 },
            { name: 'The Smiths', listeners: 3500000 },
            { name: 'Joy Division', listeners: 2500000 },
            { name: 'Mazzy Star', listeners: 1800000 },
            { name: 'Portishead', listeners: 2000000 },
        ],
        'happy': [
            { name: 'The Beatles', listeners: 8000000 },
            { name: 'Pharrell Williams', listeners: 4000000 },
            { name: 'Queen', listeners: 6000000 },
            { name: 'Earth, Wind & Fire', listeners: 3000000 },
            { name: 'ABBA', listeners: 4500000 },
        ],
        'dark': [
            { name: 'Nine Inch Nails', listeners: 3000000 },
            { name: 'Bauhaus', listeners: 800000 },
            { name: 'The Cure', listeners: 4000000 },
            { name: 'Depeche Mode', listeners: 3500000 },
            { name: 'Type O Negative', listeners: 800000 },
        ],
        'dreampop': [
            { name: 'Cocteau Twins', listeners: 1500000 },
            { name: 'Beach House', listeners: 2000000 },
            { name: 'Slowdive', listeners: 1200000 },
            { name: 'My Bloody Valentine', listeners: 1800000 },
            { name: 'Alvvays', listeners: 800000 },
        ],
        'ambient': [
            { name: 'Brian Eno', listeners: 1500000 },
            { name: 'Aphex Twin', listeners: 2000000 },
            { name: 'Stars of the Lid', listeners: 400000 },
            { name: 'Tim Hecker', listeners: 500000 },
            { name: 'Sigur Rós', listeners: 2500000 },
        ],
        'electronic': [
            { name: 'Daft Punk', listeners: 5000000 },
            { name: 'Aphex Twin', listeners: 2000000 },
            { name: 'Boards of Canada', listeners: 1200000 },
            { name: 'Kraftwerk', listeners: 1800000 },
            { name: 'New Order', listeners: 2500000 },
        ],
        'folk': [
            { name: 'Bob Dylan', listeners: 4000000 },
            { name: 'Joni Mitchell', listeners: 2500000 },
            { name: 'Nick Drake', listeners: 1200000 },
            { name: 'Fleet Foxes', listeners: 1800000 },
            { name: 'Iron & Wine', listeners: 1000000 },
        ],
        'romantic': [
            { name: 'Frank Sinatra', listeners: 3500000 },
            { name: 'Etta James', listeners: 2000000 },
            { name: 'Norah Jones', listeners: 2500000 },
            { name: 'Elvis Presley', listeners: 4000000 },
            { name: 'Sade', listeners: 2000000 },
        ],
        'bossa nova': [
            { name: 'Tom Jobim', listeners: 1000000 },
            { name: 'João Gilberto', listeners: 600000 },
            { name: 'Astrud Gilberto', listeners: 500000 },
            { name: 'Vinícius de Moraes', listeners: 400000 },
            { name: 'Stan Getz', listeners: 800000 },
        ],
    };

    return (mockDB[tag.toLowerCase()] || []).map(a => ({
        type: 'artist',
        name: a.name,
        artist: a.name,
        url: `https://www.last.fm/music/${encodeURIComponent(a.name)}`,
        image: '',
        listeners: a.listeners,
        mbid: '',
        sourceTag: tag,
    }));
}

export function getMockAlbumsByTag(tag) {
    const mockDB = {
        'melancholy': [
            { name: 'OK Computer', artist: 'Radiohead' },
            { name: 'For Emma, Forever Ago', artist: 'Bon Iver' },
            { name: 'Pink Moon', artist: 'Nick Drake' },
            { name: 'Either/Or', artist: 'Elliott Smith' },
            { name: 'Carrie & Lowell', artist: 'Sufjan Stevens' },
        ],
        'sad': [
            { name: 'The Queen Is Dead', artist: 'The Smiths' },
            { name: 'Closer', artist: 'Joy Division' },
            { name: 'A Crow Looked at Me', artist: 'Mount Eerie' },
            { name: 'Grace', artist: 'Jeff Buckley' },
            { name: 'For Emma, Forever Ago', artist: 'Bon Iver' },
        ],
        'dark': [
            { name: 'The Downward Spiral', artist: 'Nine Inch Nails' },
            { name: 'Disintegration', artist: 'The Cure' },
            { name: 'In the Flat Field', artist: 'Bauhaus' },
            { name: 'Unknown Pleasures', artist: 'Joy Division' },
            { name: 'Violator', artist: 'Depeche Mode' },
        ],
        'dreampop': [
            { name: 'Heaven or Las Vegas', artist: 'Cocteau Twins' },
            { name: 'Souvlaki', artist: 'Slowdive' },
            { name: 'Loveless', artist: 'My Bloody Valentine' },
            { name: 'Teen Dream', artist: 'Beach House' },
            { name: 'Bloom', artist: 'Beach House' },
        ],
        'ambient': [
            { name: 'Music for Airports', artist: 'Brian Eno' },
            { name: 'Selected Ambient Works 85-92', artist: 'Aphex Twin' },
            { name: 'The Tired Sounds of Stars of the Lid', artist: 'Stars of the Lid' },
            { name: '()', artist: 'Sigur Rós' },
            { name: 'Ravedeath, 1972', artist: 'Tim Hecker' },
        ],
    };

    return (mockDB[tag.toLowerCase()] || []).map(a => ({
        type: 'album',
        name: a.name,
        artist: a.artist,
        url: `https://www.last.fm/music/${encodeURIComponent(a.artist)}/${encodeURIComponent(a.name)}`,
        image: '',
        mbid: '',
        sourceTag: tag,
    }));
}
