// js/gallery.js

let allImages = [];
let filteredImages = [];
let currentLbIndex = 0;

async function loadGallery(category = 'All') {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '<div class="spinner"></div>';
  const API_BASE = window.GrampxUtil.API_BASE;
  try {
    const url = category === 'All'
      ? `${API_BASE}/gallery`
      : `${API_BASE}/gallery?category=${encodeURIComponent(category)}`;
    const res = await fetch(url);
    const json = await res.json();
    allImages = json.data || [];
    filteredImages = allImages;
    renderGallery(filteredImages);
  } catch {
    grid.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:3rem;grid-column:1/-1;">Unable to load gallery. Please ensure the server is running.</p>`;
  }
}

function renderGallery(images) {
  const grid = document.getElementById('galleryGrid');
  if (!images.length) {
    grid.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:3rem;">No images in this category.</p>`;
    return;
  }
  grid.innerHTML = images.map((img, i) => `
    <div class="gallery-item" onclick="openLightbox(${i})">
      <img src="${img.image_url}" alt="${img.caption || img.category}" loading="lazy" />
      <div class="gallery-overlay">
        <span>${img.category}</span>
        <p>${img.caption || ''}</p>
      </div>
    </div>
  `).join('');
}

function filterGallery(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  loadGallery(category);
}

function openLightbox(index) {
  currentLbIndex = index;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function moveLightbox(dir) {
  currentLbIndex = (currentLbIndex + dir + filteredImages.length) % filteredImages.length;
  updateLightbox();
}

function updateLightbox() {
  const img = filteredImages[currentLbIndex];
  document.getElementById('lbImg').src = img.image_url;
  document.getElementById('lbImg').alt = img.caption || '';
  document.getElementById('lbCaption').textContent = img.caption || img.category;
}

document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') moveLightbox(1);
  if (e.key === 'ArrowLeft') moveLightbox(-1);
});

window.filterGallery = filterGallery;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.moveLightbox = moveLightbox;

loadGallery();
