// =============================================
// js/home.js — Homepage Dynamic Content
// =============================================

// Utilities loaded from main.js via window.GrampxUtil

// ── NEWS SLIDER ─────────────────────────────
let newsData = [];
let currentSlide = 0;
const VISIBLE = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

async function loadNews() {
  const { formatDate, API_BASE, truncate } = window.GrampxUtil;
  const slider = document.getElementById('newsSlider');
  const spinner = document.getElementById('newsSpinner');
  try {
    const res = await fetch(`${API_BASE}/news`);
    const json = await res.json();
    newsData = json.data || [];
    spinner && spinner.remove();
    renderNews();
  } catch (err) {
    if (slider) slider.innerHTML = `<p style="color:var(--text-light);padding:2rem;text-align:center;">Unable to load news. Please ensure the server is running.</p>`;
  }
}

function renderNews() {
  const { formatDate, truncate } = window.GrampxUtil;
  const slider = document.getElementById('newsSlider');
  const dotsContainer = document.getElementById('newsDots');
  if (!slider) return;

  slider.innerHTML = newsData.map(item => `
    <div class="news-card">
      <img class="news-card-img" src="${item.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600'}" alt="${item.title}" loading="lazy" />
      <div class="news-card-body">
        <div class="news-card-date">${formatDate(item.created_at)}</div>
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-card-text">${truncate(item.content, 22)}</p>
      </div>
    </div>
  `).join('');

  const totalSlides = Math.max(0, newsData.length - VISIBLE + 1);
  if (dotsContainer) {
    dotsContainer.innerHTML = Array.from({ length: totalSlides }, (_, i) =>
      `<div class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
    ).join('');
    dotsContainer.querySelectorAll('.slider-dot').forEach(dot => {
      dot.addEventListener('click', () => goToSlide(+dot.dataset.index));
    });
  }
}

function goToSlide(index) {
  const slider = document.getElementById('newsSlider');
  if (!slider) return;
  const cards = slider.querySelectorAll('.news-card');
  if (!cards.length) return;
  const cardW = cards[0].offsetWidth + 24;
  const maxIndex = Math.max(0, newsData.length - VISIBLE);
  currentSlide = Math.max(0, Math.min(index, maxIndex));
  slider.style.transform = `translateX(-${currentSlide * cardW}px)`;
  document.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

document.getElementById('newsNext')?.addEventListener('click', () => goToSlide(currentSlide + 1));
document.getElementById('newsPrev')?.addEventListener('click', () => goToSlide(currentSlide - 1));

setInterval(() => {
  const maxIndex = Math.max(0, newsData.length - VISIBLE);
  goToSlide(currentSlide >= maxIndex ? 0 : currentSlide + 1);
}, 5000);

// ── EVENTS ──────────────────────────────────
async function loadEvents() {
  const { formatDate, API_BASE, truncate } = window.GrampxUtil;
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;
  try {
    const res = await fetch(`${API_BASE}/events`);
    const json = await res.json();
    const events = (json.data || []).slice(0, 4);
    grid.innerHTML = events.length ? events.map((ev, i) => `
      <div class="event-card fade-in" style="animation-delay:${i * 0.1}s">
        <img class="event-img" src="${ev.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'}" alt="${ev.title}" loading="lazy" />
        <div class="event-body">
          <div class="event-date-badge">📅 ${formatDate(ev.event_date)}</div>
          <h3 class="event-title">${ev.title}</h3>
          <p class="event-desc">${truncate(ev.description, 20)}</p>
        </div>
      </div>
    `).join('') : `<p style="color:var(--text-light);text-align:center;grid-column:1/-1;padding:2rem;">No upcoming events at this time.</p>`;
  } catch {
    grid.innerHTML = `<p style="color:var(--text-light);text-align:center;grid-column:1/-1;padding:2rem;">Unable to load events. Please ensure the server is running.</p>`;
  }
}

// ── Init ─────────────────────────────────────
loadNews();
loadEvents();
