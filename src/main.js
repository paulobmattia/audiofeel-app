// AudioFeel — Main Application Logic
import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

// ---- State ----
let currentType = 'auto';
let currentTab = 'tracks';
let searchResults = null;

// ---- Audio Player Controller ----
const AudioPlayer = {
  audio: new Audio(),
  currentTrackId: null,
  animFrame: null,

  init() {
    this.audio.volume = 0.7;
    this.audio.addEventListener('ended', () => this.stop());
    this.audio.addEventListener('error', () => this.stop());

    // Mini-player toggle
    const btn = document.getElementById('mini-player-btn');
    if (btn) btn.addEventListener('click', () => this.toggle());
  },

  play(previewUrl, name, artist, cardIndex) {
    const trackId = `${name}::${artist}`;

    // If same track, toggle
    if (this.currentTrackId === trackId && !this.audio.paused) {
      this.pause();
      return;
    }

    // Stop current
    this.audio.pause();
    this._clearPlaying();

    // Start new
    this.audio.src = previewUrl;
    this.audio.play().catch(() => { });
    this.currentTrackId = trackId;

    // Update mini-player
    const mp = document.getElementById('mini-player');
    mp?.classList.remove('hidden');
    const titleEl = document.getElementById('mini-player-title');
    const artistEl = document.getElementById('mini-player-artist');
    if (titleEl) titleEl.textContent = name;
    if (artistEl) artistEl.textContent = artist;

    this._showPauseIcon(true);
    this._markPlaying(cardIndex, true);
    this._startProgress();
  },

  pause() {
    this.audio.pause();
    this._showPauseIcon(false);
    this._cancelProgress();
    // Update card button
    const activeCard = document.querySelector('.result-card.playing');
    if (activeCard) {
      const btn = activeCard.querySelector('.preview-btn');
      if (btn) btn.innerHTML = this._playIcon();
    }
  },

  toggle() {
    if (this.audio.paused) {
      this.audio.play().catch(() => { });
      this._showPauseIcon(true);
      this._startProgress();
    } else {
      this.pause();
    }
  },

  stop() {
    this.audio.pause();
    this.audio.src = '';
    this.currentTrackId = null;
    this._clearPlaying();
    this._showPauseIcon(false);
    this._cancelProgress();

    const mp = document.getElementById('mini-player');
    mp?.classList.add('hidden');
    const bar = document.getElementById('mini-player-bar');
    if (bar) bar.style.width = '0%';
    const time = document.getElementById('mini-player-time');
    if (time) time.textContent = '0:00';
  },

  _startProgress() {
    this._cancelProgress();
    const update = () => {
      const bar = document.getElementById('mini-player-bar');
      const time = document.getElementById('mini-player-time');
      if (bar && this.audio.duration) {
        const pct = (this.audio.currentTime / this.audio.duration) * 100;
        bar.style.width = `${pct}%`;
      }
      if (time) {
        const s = Math.floor(this.audio.currentTime);
        time.textContent = `0:${s.toString().padStart(2, '0')}`;
      }
      this.animFrame = requestAnimationFrame(update);
    };
    this.animFrame = requestAnimationFrame(update);
  },

  _cancelProgress() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  },

  _showPauseIcon(isPaused) {
    const play = document.getElementById('mini-player-icon-play');
    const pause = document.getElementById('mini-player-icon-pause');
    if (play) play.style.display = isPaused ? 'none' : 'block';
    if (pause) pause.style.display = isPaused ? 'block' : 'none';
  },

  _markPlaying(index, isPlaying) {
    const card = document.querySelector(`.result-card[data-index="${index}"]`);
    if (card) {
      card.classList.toggle('playing', isPlaying);
      const btn = card.querySelector('.preview-btn');
      if (btn) btn.innerHTML = isPlaying ? this._pauseIcon() : this._playIcon();
    }
  },

  _clearPlaying() {
    document.querySelectorAll('.result-card.playing').forEach(c => {
      c.classList.remove('playing');
      const btn = c.querySelector('.preview-btn');
      if (btn) btn.innerHTML = this._playIcon();
    });
  },

  _playIcon() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
  },

  _pauseIcon() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
  }
};

AudioPlayer.init();

// ---- Search History (localStorage) ----
const HISTORY_KEY = 'audiofeel_history';
const MAX_HISTORY = 10;

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch { return []; }
}

function saveToHistory(query, type) {
  let history = getHistory();
  // Remove duplicate
  history = history.filter(h => h.query.toLowerCase() !== query.toLowerCase());
  // Add to front
  history.unshift({ query, type, timestamp: Date.now() });
  // Limit
  history = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

function renderHistory() {
  let container = document.getElementById('search-history');
  const history = getHistory();

  if (!container) {
    // Create container after search hints
    const hints = document.querySelector('.search-hints');
    if (!hints) return;
    container = document.createElement('div');
    container.id = 'search-history';
    container.className = 'search-history';
    hints.parentNode.insertBefore(container, hints.nextSibling);
  }

  if (history.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <span class="history-label">HISTÓRICO</span>
    ${history.map(h => `<button class="history-chip" data-query="${h.query}" data-type="${h.type || 'auto'}">${h.query}</button>`).join('')}
    <button class="history-clear" id="clear-history-btn">✕</button>
  `;

  // Attach event listeners
  container.querySelectorAll('.history-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      searchInput.value = chip.dataset.query;
      currentType = chip.dataset.type || 'auto';
      performSearch();
    });
  });

  const clearBtn = document.getElementById('clear-history-btn');
  if (clearBtn) clearBtn.addEventListener('click', clearHistory);
}

// ---- DOM Elements ----
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const heroSection = document.getElementById('hero');
const loadingSection = document.getElementById('loading');
const resultsSection = document.getElementById('results');
const resultsGrid = document.getElementById('results-grid');
const resultsQuery = document.getElementById('results-query');
const resultsTags = document.getElementById('results-tags');
const enrichmentInfo = document.getElementById('enrichment-info');
const mockNotice = document.getElementById('mock-notice');
const newSearchBtn = document.getElementById('new-search-btn');

// ---- Rotating Words ----
const rotatingWords = ['sentimentos', 'filmes', 'livros', 'cores', 'conceitos', 'vibes'];
let wordIndex = 0;
const rotatingEl = document.getElementById('rotating-word');

function rotateWord() {
  if (!rotatingEl) return;
  rotatingEl.style.opacity = '0';
  rotatingEl.style.transform = 'translateY(-10px)';

  setTimeout(() => {
    wordIndex = (wordIndex + 1) % rotatingWords.length;
    rotatingEl.textContent = rotatingWords[wordIndex];
    rotatingEl.style.opacity = '1';
    rotatingEl.style.transform = 'translateY(0)';
  }, 300);
}

// Start rotation
setInterval(rotateWord, 2500);

// ---- Type Selector (Main) ----
// Select only buttons inside the main selector container
const mainTypeBtns = document.querySelectorAll('.search-type-selector .type-btn');
const placeholders = {
  'auto': 'Ex: melancólico, Blade Runner, saudade...',
  'sentimento': 'Ex: melancólico, alegre, nostálgico, saudade...',
  'filme': 'Ex: Blade Runner, Interstellar, Amelie...',
  'livro': 'Ex: 1984, Cem Anos de Solidão, O Hobbit...',
  'cor': 'Ex: azul, roxo, dourado, cinza...',
  'conceito': 'Ex: noite, liberdade, sonho, caos...',
};

mainTypeBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.target.closest('.type-btn');
    if (!target) return;

    mainTypeBtns.forEach(b => b.classList.remove('active'));
    target.classList.add('active');
    currentType = target.dataset.type;
    searchInput.placeholder = placeholders[currentType] || placeholders.auto;
    searchInput.focus();
  });
});

// ---- Hint Chips ----
const hintChips = document.querySelectorAll('.search-hints .type-btn');
hintChips.forEach(chip => {
  chip.addEventListener('click', (e) => {
    const target = e.target.closest('.type-btn');
    if (!target) return;

    searchInput.value = target.dataset.query;
    const chipType = target.dataset.type;

    if (chipType) {
      // Update main selector UI if needed
      mainTypeBtns.forEach(b => b.classList.remove('active'));
      const targetBtn = document.querySelector(`.search-type-selector .type-btn[data-type="${chipType}"]`);
      if (targetBtn) targetBtn.classList.add('active');
      currentType = chipType;
    }
    performSearch();
  });
});

// ---- Create Card HTML (Single Definition) ----
function createCardHTML(item, index) {
  const typeLabel = { track: 'FAIXA', artist: 'ARTISTA', album: 'ÁLBUM', playlist: 'PLAYLIST' };

  // Handle Score: Backend now returns 0-100, but legacy might be 0-1
  let rawScore = item.score || 0;
  const scorePercent = rawScore > 1 ? Math.round(rawScore) : Math.round(rawScore * 100);
  const indexStr = (index + 1).toString().padStart(2, '0');

  // Generate search URLs
  const ytQuery = encodeURIComponent(`${item.name} ${item.artist || ''}`);
  const spotifyQuery = encodeURIComponent(`${item.name} ${item.artist || ''}`);

  // Generate initials for fallback
  function getInitials(name) {
    return name.split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  // Cover image or styled initials fallback
  const initials = getInitials(item.artist || item.name);
  const coverHTML = item.image
    ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.parentElement.textContent='${initials}'" />`
    : initials;

  // Tags display (Prioritize matchedTags from backend)
  const searchTags = searchResults?.tags || [];
  // If backend provides matchedTags (uppercase), use them to highlight
  const matchedSet = new Set((item.matchedTags || []).map(t => t.toUpperCase()));

  // Merge source tags and matched tags for display
  const visibleTags = [...new Set([...(item.matchedTags || []), ...(item.tags || [item.sourceTag])].filter(Boolean))].slice(0, 4);

  const tagHTML = visibleTags.map(tag => {
    const isMatched = matchedSet.has(tag.toUpperCase()) || searchTags.includes(tag);
    return `<span class="tag-pill ${isMatched ? 'matched' : ''}">${tag}</span>`;
  }).join('');

  return `
    <div class="result-card animate" data-index="${indexStr}" style="animation-delay: ${index * 0.05}s">
      <div class="card-top">
        <div class="card-cover">${coverHTML}</div>
        <div class="card-info">
          <span class="card-artist" title="${item.artist}">${item.artist || 'Unknown'}</span>
          <div class="card-name" title="${item.name}">${item.name}</div>
          <span class="card-type-badge ${item.type}">${typeLabel[item.type] || item.type}</span>
        </div>
      </div>
      
      <div class="card-score">
        <div class="score-bar" style="width: ${scorePercent}%"></div>
      </div>
      
      ${item.matchReason ? `<div class="match-reason">${item.matchReason}</div>` : ''}

      ${tagHTML ? `<div class="card-tags">${tagHTML}</div>` : ''}

      <div class="card-links">
        ${item.preview ? `<button class="card-link preview-btn" data-preview="${item.preview}" data-name="${item.name}" data-artist="${item.artist || ''}" data-index="${indexStr}" title="Ouvir preview de 30s">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          PREVIEW
        </button>` : ''}
        <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" rel="noopener" class="card-link" title="Listen on YouTube">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          YOUTUBE
        </a>
        <a href="https://open.spotify.com/search/${spotifyQuery}" target="_blank" rel="noopener" class="card-link" title="Listen on Spotify">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path></svg>
          SPOTIFY
        </a>
        ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener" class="card-link" title="Open Link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          ${item.type === 'playlist' ? 'OPEN' : 'LAST.FM'}
        </a>` : ''}
      </div>
    </div>
  `;
}

// ---- Search Logic ----
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') performSearch();
});

async function performSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    searchInput.focus();
    return;
  }

  // Show loading
  heroSection.classList.add('hidden');
  loadingSection.classList.remove('hidden');
  resultsSection.classList.add('hidden');
  searchBtn.disabled = true;

  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        type: currentType === 'auto' ? null : currentType,
      }),
    });

    if (!response.ok) throw new Error('Search failed');

    searchResults = await response.json();
    saveToHistory(query, currentType);
    displayResults(searchResults);
  } catch (error) {
    console.error('Search error:', error);
    // Show error state
    loadingSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
    alert(`Erro ao buscar resultados: ${error.message}\nVerifique se o servidor backend está rodando na porta 3001.`);
  } finally {
    searchBtn.disabled = false;
  }
}

// ---- Display Results ----
function displayResults(data) {
  loadingSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');

  // Query display
  resultsQuery.textContent = data.query;

  // Tags
  resultsTags.innerHTML = data.tags
    .map(tag => `<span class="tag-pill">${tag}</span>`)
    .join('');

  // Enrichment info
  if (data.enrichment) {
    enrichmentInfo.classList.remove('hidden');
    const e = data.enrichment;
    const isMovie = e.type === 'movie';

    // Icon paths (Feather style)
    const iconMovie = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`;
    const iconBook = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`;

    // Description Truncation Logic
    const descText = e.overview || e.description || 'Sem descrição disponível';
    const isLongDesc = descText.length > 250;

    enrichmentInfo.innerHTML = `
      ${e.posterPath || e.coverUrl ? `<img class="enrichment-poster" src="${e.posterPath || e.coverUrl}" alt="${e.title}" />` : ''}
      <div class="enrichment-content">
        <span class="enrichment-type-badge">
            ${isMovie ? iconMovie : iconBook}
            ${isMovie ? 'FILME' : 'LIVRO'}
        </span>
        <div class="enrichment-title">${e.title}${e.author ? ` — ${e.author}` : ''}</div>
        <div class="enrichment-desc ${isLongDesc ? 'collapsed' : ''}" id="enrichment-desc-text">
            ${descText}
        </div>
        ${isLongDesc ? `<button id="read-more-btn" class="read-more-btn">[LER MAIS]</button>` : ''}
      </div>
    `;

    // Add Event Listener for Read More
    if (isLongDesc) {
      setTimeout(() => {
        const btn = document.getElementById('read-more-btn');
        const desc = document.getElementById('enrichment-desc-text');
        if (btn && desc) {
          btn.addEventListener('click', () => {
            desc.classList.remove('collapsed');
            btn.style.display = 'none';
          });
        }
      }, 0);
    }

  } else {
    enrichmentInfo.classList.add('hidden');
  }

  // Counts
  document.getElementById('count-tracks').textContent = data.results.tracks.length;
  document.getElementById('count-artists').textContent = data.results.artists.length;
  document.getElementById('count-albums').textContent = data.results.albums.length;
  document.getElementById('count-playlists').textContent = (data.results.playlists || []).length;

  // Mock notice
  if (data.mock) {
    mockNotice.classList.remove('hidden');
  } else {
    mockNotice.classList.add('hidden');
  }

  // Show current tab
  currentTab = 'tracks';
  document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-tracks').classList.add('active');
  renderCards(data.results.tracks);

  // Scroll to results
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---- Tabs ----
document.querySelectorAll('.results-tabs .tab-btn').forEach(tab => {
  tab.addEventListener('click', (e) => {
    const target = e.target.closest('.tab-btn');
    if (!searchResults || !target) return;

    document.querySelectorAll('.results-tabs .tab-btn').forEach(t => t.classList.remove('active'));
    target.classList.add('active');
    currentTab = target.dataset.tab;

    const items = searchResults.results[currentTab] || [];
    renderCards(items);
  });
});

// ---- Render Cards ----
function renderCards(items) {
  if (!items.length) {
    resultsGrid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--text-tertiary);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <p>Nenhum resultado encontrado para esta categoria</p>
      </div>
    `;
    return;
  }

  resultsGrid.innerHTML = items.map((item, i) => createCardHTML(item, i)).join('');

  // Attach preview button listeners
  resultsGrid.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const { preview, name, artist, index } = btn.dataset;
      if (preview) AudioPlayer.play(preview, name, artist, index);
    });
  });
}

// ---- New Search ----
newSearchBtn.addEventListener('click', () => {
  resultsSection.classList.add('hidden');
  heroSection.classList.remove('hidden');
  searchInput.value = '';
  searchInput.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Smooth scrolling for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- Initialize transition for rotating word ----
if (rotatingEl) {
  rotatingEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  rotatingEl.style.display = 'inline-block';
}

// ---- Initialize search history ----
renderHistory();

console.log('🎧 AudioFeel initialized v3.0 — Cache + Player + History');
