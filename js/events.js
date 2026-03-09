// js/events.js

function switchTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-events').style.display = tab === 'events' ? '' : 'none';
  document.getElementById('tab-news').style.display   = tab === 'news'   ? '' : 'none';
}
window.switchTab = switchTab;

async function loadEvents() {
  const list = document.getElementById('eventsList');
  try {
    const res = await fetch('/api/events');
    const json = await res.json();
    const events = json.data || [];
    list.innerHTML = events.length ? events.map(ev => `
      <div class="event-row fade-in">
        <img class="event-row-img" src="${ev.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'}" alt="${ev.title}" loading="lazy" />
        <div class="event-row-body">
          <div class="event-row-date">📅 ${window.GrampxUtil.formatDate(ev.event_date)}</div>
          <h3>${ev.title}</h3>
          <p>${ev.description}</p>
        </div>
      </div>
    `).join('') : `<p style="text-align:center;color:var(--text-light);padding:3rem;">No upcoming events at this time.</p>`;
    setTimeout(() => {
      list.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    }, 100);
  } catch {
    list.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:3rem;">Unable to load events.</p>`;
  }
}

async function loadNews() {
  const list = document.getElementById('newsList');
  try {
    const res = await fetch('/api/news');
    const json = await res.json();
    const news = json.data || [];
    list.innerHTML = news.length ? news.map(item => `
      <div class="news-full-card fade-in">
        <img class="news-full-img" src="${item.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600'}" alt="${item.title}" loading="lazy" />
        <div class="news-full-body">
          <div class="news-full-date">${window.GrampxUtil.formatDate(item.created_at)}</div>
          <h3>${item.title}</h3>
          <p>${item.content}</p>
        </div>
      </div>
    `).join('') : `<p style="text-align:center;color:var(--text-light);padding:3rem;grid-column:1/-1;">No news available.</p>`;
    setTimeout(() => {
      list.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    }, 100);
  } catch {
    list.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:3rem;grid-column:1/-1;">Unable to load news.</p>`;
  }
}

loadEvents();
loadNews();
