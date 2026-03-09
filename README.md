# 🎓 Grampx University of Science — Website

**Where Strength Meet Might**

A full-stack university website built with HTML, CSS, JavaScript (frontend) and Node.js + Express + Supabase (backend).

---

## 📁 Project Structure

```
grampx/
├── index.html          # Homepage
├── about.html          # About page
├── admissions.html     # Admissions + online form
├── academics.html      # Faculties & programs
├── events.html         # Events & news
├── gallery.html        # Photo gallery with lightbox
├── contact.html        # Contact form + map
├── css/
│   ├── style.css       # Global styles (nav, footer, variables)
│   ├── home.css        # Homepage styles
│   ├── about.css
│   ├── admissions.css
│   ├── academics.css
│   ├── events.css
│   ├── gallery.css
│   └── contact.css
├── js/
│   ├── main.js         # Global JS (dark mode, nav, animations, newsletter)
│   ├── home.js         # News slider + events fetch
│   ├── admissions.js   # Application form submission
│   ├── events.js       # Events & news fetch
│   ├── gallery.js      # Gallery fetch, filter, lightbox
│   └── contact.js      # Contact form submission
├── images/
│   └── logo.png        # Grampx University logo
├── backend/
│   ├── server.js       # Express API server
│   └── db.js           # Supabase client
├── database/
│   └── schema.sql      # Supabase tables + seed data
├── .env                # Your Supabase credentials (DO NOT commit)
└── package.json
```

---

## 🚀 Setup Instructions

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Create a Supabase project
1. Go to [https://supabase.com](https://supabase.com)
2. Click **New Project**
3. Choose a name: `grampx-university`
4. Set a database password and select a region close to Bermuda (e.g. US East)
5. Wait for the project to be ready (~1 minute)

### Step 3 — Run the database schema
1. In your Supabase dashboard, click **SQL Editor**
2. Click **New Query**
3. Paste the entire contents of `database/schema.sql`
4. Click **Run** — this creates all tables and inserts seed data

### Step 4 — Add your Supabase credentials to `.env`
1. In Supabase dashboard, go to **Project Settings → API**
2. Copy your **Project URL** and **anon/public key**
3. Open the `.env` file and replace the placeholders:

```env
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key-here
PORT=3000
```

### Step 5 — Start the server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### Step 6 — Open the website
Visit: [http://localhost:3000](http://localhost:3000)

---

## ✅ Features

| Feature | Status |
|---|---|
| Responsive navbar with hamburger menu | ✅ |
| Dark / Light mode toggle (persists in localStorage) | ✅ |
| Hero section with animated stats | ✅ |
| News auto-carousel (fetched from Supabase) | ✅ |
| Upcoming events (fetched from Supabase) | ✅ |
| Online application form → saves to Supabase | ✅ |
| Contact form → saves to Supabase | ✅ |
| Newsletter signup → saves to Supabase | ✅ |
| Gallery with category filter + lightbox | ✅ |
| Keyboard navigation in lightbox (← → Esc) | ✅ |
| Faculty accordion on academics page | ✅ |
| Google Maps embed (Clock Tower, Bermuda) | ✅ |
| Scroll animations (fade-in, fade-left, fade-right) | ✅ |
| Smooth scrolling | ✅ |
| Fully responsive (desktop, tablet, mobile) | ✅ |

---

## 📞 Contact
- Email: olamhidhe001@gmail.com
- Instagram: @hoeshateola
- Location: Clock Tower, Bermuda
- Phone: +234 704 490 3733
