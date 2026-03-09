// =============================================
// js/main.js — Grampx University Global JS
// =============================================

const API_BASE = '/api';

// ── Dark Mode ───────────────────────────────
const themeToggleBtns = document.querySelectorAll('.theme-toggle');
const savedTheme = localStorage.getItem('grampx-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

function updateThemeIcons(theme) {
  themeToggleBtns.forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  });
}

themeToggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('grampx-theme', next);
    updateThemeIcons(next);
  });
});

// ── Navbar: scroll effect ───────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// ── Active nav link ─────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Mobile Hamburger ────────────────────────
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  // Close on link click
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });
}

// ── Scroll Animations ───────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
  observer.observe(el);
});

// ── Newsletter Form ─────────────────────────
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');
    const email = input.value.trim();

    if (!email) return;

    btn.textContent = '...';
    btn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (data.success) {
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#28a745';
        input.value = '';
      } else {
        btn.textContent = data.message.includes('already') ? '✓ Already in!' : 'Try again';
        btn.style.background = data.message.includes('already') ? '#28a745' : '#dc3545';
        btn.style.color = '#fff';
      }
    } catch {
      btn.textContent = 'Error';
      btn.style.background = '#dc3545';
      btn.style.color = '#fff';
    }

    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 3000);
  });
});

// ── Utility: Format Date ────────────────────
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

// ── Utility: Show Alert ─────────────────────
function showAlert(containerId, type, message) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.className = `alert alert-${type} show`;
  el.textContent = message;
  setTimeout(() => {
    el.className = 'alert';
    el.textContent = '';
  }, 5000);
}

// ── Utility: Truncate text ──────────────────
function truncate(text, words = 20) {
  const arr = text.split(' ');
  return arr.length > words ? arr.slice(0, words).join(' ') + '...' : text;
}

// Expose utilities globally
window.GrampxUtil = { formatDate, showAlert, truncate, API_BASE };
