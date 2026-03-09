// js/admissions.js
// Utilities from window.GrampxUtil

const form = document.getElementById('applicationForm');
const submitBtn = document.getElementById('appSubmitBtn');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name       = document.getElementById('appName').value.trim();
  const email      = document.getElementById('appEmail').value.trim();
  const phone      = document.getElementById('appPhone').value.trim();
  const program    = document.getElementById('appProgram').value;
  const department = document.getElementById('appDept').value;
  const message    = document.getElementById('appMessage').value.trim();

  if (!name || !email || !phone || !program || !department) {
    window.GrampxUtil.showAlert('appAlert', 'error', 'Please fill in all required fields.');
    return;
  }

  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  try {
    const res = await fetch(`${window.GrampxUtil.API_BASE}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, program, department, message })
    });
    const data = await res.json();

    if (data.success) {
      window.GrampxUtil.showAlert('appAlert', 'success', '🎉 ' + data.message);
      form.reset();
    } else {
      window.GrampxUtil.showAlert('appAlert', 'error', data.message || 'Submission failed. Please try again.');
    }
  } catch {
    window.GrampxUtil.showAlert('appAlert', 'error', 'Network error. Please ensure the server is running and try again.');
  } finally {
    submitBtn.textContent = 'Submit Application';
    submitBtn.disabled = false;
  }
});
