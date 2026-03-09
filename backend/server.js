// =============================================
// backend/server.js — Grampx University API
// =============================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const supabase = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all frontend static files from project root
app.use(express.static(path.join(__dirname, '..')));

// ── Health Check ────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Grampx University API is running' });
});

// =============================================
// EVENTS
// =============================================
app.get('/api/events', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
// NEWS
// =============================================
app.get('/api/news', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
// GALLERY
// =============================================
app.get('/api/gallery', async (req, res) => {
  try {
    const category = req.query.category;
    let query = supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
// APPLICATIONS (Admissions)
// =============================================
app.post('/api/applications', async (req, res) => {
  try {
    const { name, email, phone, program, department, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !program || !department) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([{ name, email, phone, program, department, message }])
      .select();
    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will contact you shortly.',
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
// CONTACT MESSAGES
// =============================================
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, subject, message }])
      .select();
    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Message received! We will get back to you within 48 hours.',
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
// NEWSLETTER
// =============================================
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select();

    if (error) {
      // Unique constraint = already subscribed
      if (error.code === '23505') {
        return res.status(409).json({ success: false, message: 'This email is already subscribed.' });
      }
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Fallback: serve index.html for any unmatched route ──
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎓 Grampx University Server running at http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/health\n`);
});
