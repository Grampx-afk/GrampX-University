-- =============================================
-- GRAMPX UNIVERSITY OF SCIENCE
-- Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  program VARCHAR(50) NOT NULL,         -- BSc, MSc, PhD
  department VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NEWS TABLE
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,       -- Sports, Academics, Arts, Events
  caption VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SEED DATA — Events
-- =============================================
INSERT INTO events (title, description, event_date, image) VALUES
(
  'New Student Recruitment & Open Day',
  'Grampx University of Science invites prospective students and their families to our annual Open Day. Meet faculty members, tour the campus, attend live demos in our science labs, and learn about our BSc, MSc, and PhD programs. Admissions officers will be available to answer all your questions.',
  '2025-03-15',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
),
(
  'Annual Science & Technology Symposium',
  'A two-day symposium showcasing groundbreaking research from students and faculty across all departments. Guest speakers include leading academics and industry professionals. Open to the public.',
  '2025-04-10',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
),
(
  'Postgraduate Research Conference',
  'MSc and PhD candidates present their ongoing research projects to a panel of distinguished professors and industry experts. A networking dinner follows the presentations.',
  '2025-05-22',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800'
),
(
  'Inter-Faculty Sports Competition',
  'Annual sports day featuring football, athletics, basketball, and swimming competitions between all university faculties. Come support your department!',
  '2025-06-05',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800'
);

-- =============================================
-- SEED DATA — News
-- =============================================
INSERT INTO news (title, content, image) VALUES
(
  'Grampx University Ranked Among Top 50 Science Universities in Africa',
  'We are proud to announce that Grampx University of Science has been ranked among the top 50 science and technology universities in Africa by the Continental Academic Excellence Board (CAEB). This recognition reflects our commitment to research, innovation, and academic excellence. The ranking considered factors including research output, faculty qualifications, student outcomes, and industry partnerships. Vice-Chancellor Prof. Emmanuel Okafor praised the entire university community for their dedication and hard work that made this achievement possible.',
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800'
),
(
  '2025/2026 Academic Session Resumption Date Announced',
  'The university management hereby announces that the 2025/2026 academic session will commence on Monday, 8th September 2025. Fresh students are expected to report for orientation from 1st–5th September 2025. All returning students must complete their online course registration via the student portal before resumption. Hostel allocation will begin on 6th September. Late registration attracts a fine. Students are advised to clear all outstanding fees before resumption.',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800'
),
(
  'Full Scholarship Available: Grampx Excellence Award 2025',
  'Applications are now open for the Grampx Excellence Award — a full scholarship covering tuition, accommodation, and a monthly stipend for outstanding students. The award is open to fresh and returning undergraduate students with a minimum CGPA of 4.5. Applicants must submit two academic references, a personal statement, and proof of financial need. The deadline for applications is 28th February 2025. Winners will be announced in March. Visit the scholarships office or apply via the student portal.',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800'
),
(
  'New State-of-the-Art Biotechnology Laboratory Commissioned',
  'Grampx University of Science has officially commissioned a new, fully equipped Biotechnology and Molecular Sciences Laboratory. The facility, funded through a partnership with BioNexus International, features advanced gene sequencing equipment, biosafety level 2 workstations, and a dedicated research suite for postgraduate students. The lab is now open to faculty and registered postgraduate researchers. Undergraduate students in relevant departments will have supervised access as part of their practical curriculum.',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800'
);

-- =============================================
-- SEED DATA — Gallery
-- =============================================
INSERT INTO gallery (image_url, category, caption) VALUES
('https://images.unsplash.com/photo-1562774053-701939374585?w=800', 'Academics', 'Students in the main lecture theatre'),
('https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800', 'Academics', 'Graduation ceremony 2024'),
('https://images.unsplash.com/photo-1532094349884-543559059a5e?w=800', 'Academics', 'Chemistry laboratory practical session'),
('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', 'Sports', 'Inter-faculty athletics championship'),
('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', 'Sports', 'University basketball team in action'),
('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800', 'Sports', 'Swimming competition finals'),
('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', 'Arts', 'Annual cultural arts festival'),
('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', 'Arts', 'University choir performance'),
('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 'Events', 'Science and Technology Symposium 2024'),
('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', 'Events', 'Postgraduate research conference'),
('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', 'Events', 'Open Day 2024 — prospective students'),
('https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800', 'Academics', 'Library and research centre');
