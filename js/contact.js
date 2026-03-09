// js/contact.js
const { API_BASE, showAlert } = window.GrampxUtil;

document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('ctName').value.trim();
  const email   = document.getElementById('ctEmail').value.trim();
  const subject = document.getElementById('ctSubject').value.trim();
  const message = document.getElementById('ctMessage').value.trim();
  const btn     = document.getElementById('ctSubmitBtn');

  if (!name || !email || !message) {
    showAlert('contactAlert', 'error', 'Please fill in your name, email, and message.');
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });
    const data = await res.json();

    if (data.success) {
      showAlert('contactAlert', 'success', '✅ ' + data.message);
      document.getElementById('contactForm').reset();
    } else {
      showAlert('contactAlert', 'error', data.message || 'Failed to send message. Please try again.');
    }
  } catch {
    showAlert('contactAlert', 'error', 'Network error. Please ensure the server is running.');
  } finally {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
});
