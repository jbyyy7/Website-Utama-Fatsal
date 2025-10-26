-- ===========================================
-- WEBSITE UTAMA - ADDITIONAL TABLES
-- Yayasan Fathus Salafi
-- ===========================================
-- Tables: news, galleries, ppdb_registrations, ppdb_settings, contact_messages
-- Compatible with existing SIAKAD tables (profiles, schools, classes, subjects)

-- ===========================================
-- 1. NEWS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('berita', 'prestasi', 'kegiatan')),
  author_id UUID REFERENCES profiles(id),
  school_id UUID REFERENCES schools(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_published_at ON news(published_at);
CREATE INDEX idx_news_school_id ON news(school_id);
CREATE INDEX idx_news_slug ON news(slug);

-- RLS Policies
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published news" 
  ON news FOR SELECT 
  USING (status = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Admin/Staff can insert news" 
  ON news FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff', 'Principal')
    )
  );

CREATE POLICY "Admin/Staff can update news" 
  ON news FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff', 'Principal')
    )
  );

CREATE POLICY "Admin can delete news" 
  ON news FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'Admin'
    )
  );

-- ===========================================
-- 2. GALLERIES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS galleries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT CHECK (category IN ('kegiatan', 'akademik', 'ekstrakurikuler', 'prestasi', 'acara', 'fasilitas')),
  school_id UUID REFERENCES schools(id),
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_galleries_category ON galleries(category);
CREATE INDEX idx_galleries_school_id ON galleries(school_id);
CREATE INDEX idx_galleries_created_at ON galleries(created_at DESC);

-- RLS Policies
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view galleries" 
  ON galleries FOR SELECT 
  USING (true);

CREATE POLICY "Admin/Staff can insert galleries" 
  ON galleries FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff', 'Principal')
    )
  );

CREATE POLICY "Admin/Staff can update galleries" 
  ON galleries FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff', 'Principal')
    )
  );

CREATE POLICY "Admin can delete galleries" 
  ON galleries FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'Admin'
    )
  );

-- ===========================================
-- 3. PPDB REGISTRATIONS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS ppdb_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_number TEXT UNIQUE NOT NULL, -- e.g., "PPDB-2024-001"
  academic_year TEXT NOT NULL, -- e.g., "2024/2025"
  
  -- School Selection
  school_id UUID NOT NULL REFERENCES schools(id),
  
  -- Student Data
  student_name TEXT NOT NULL,
  student_nisn TEXT,
  place_of_birth TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('L', 'P')),
  religion TEXT NOT NULL,
  address TEXT NOT NULL,
  phone_number TEXT,
  
  -- Parent Data
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_occupation TEXT,
  
  -- Previous School
  previous_school_name TEXT,
  previous_school_address TEXT,
  
  -- Documents (Supabase Storage URLs)
  birth_certificate_url TEXT,
  family_card_url TEXT,
  photo_url TEXT,
  report_card_url TEXT,
  
  -- Status & Verification
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'accepted', 'rejected', 'cancelled')),
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  notes TEXT,
  
  -- Auto-created account reference
  created_user_id UUID REFERENCES profiles(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ppdb_registration_number ON ppdb_registrations(registration_number);
CREATE INDEX idx_ppdb_academic_year ON ppdb_registrations(academic_year);
CREATE INDEX idx_ppdb_school_id ON ppdb_registrations(school_id);
CREATE INDEX idx_ppdb_status ON ppdb_registrations(status);
CREATE INDEX idx_ppdb_created_at ON ppdb_registrations(created_at DESC);
CREATE INDEX idx_ppdb_parent_email ON ppdb_registrations(parent_email);

-- RLS Policies
ALTER TABLE ppdb_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own registration" 
  ON ppdb_registrations FOR SELECT 
  USING (parent_email = (SELECT email FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Admin/Staff can view all registrations" 
  ON ppdb_registrations FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff', 'Principal')
    )
  );

CREATE POLICY "Anyone can insert registration" 
  ON ppdb_registrations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin/Staff can update registrations" 
  ON ppdb_registrations FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff', 'Principal')
    )
  );

-- ===========================================
-- 4. PPDB SETTINGS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS ppdb_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year TEXT NOT NULL UNIQUE, -- e.g., "2024/2025"
  is_active BOOLEAN DEFAULT false,
  
  -- Registration Period
  registration_start DATE NOT NULL,
  registration_end DATE NOT NULL,
  
  -- Announcement Date
  announcement_date DATE,
  
  -- Requirements & Information
  requirements TEXT[], -- Array of text requirements
  registration_fee INTEGER DEFAULT 0,
  
  -- Contact Info
  contact_person TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ppdb_settings_academic_year ON ppdb_settings(academic_year);
CREATE INDEX idx_ppdb_settings_is_active ON ppdb_settings(is_active);

-- RLS Policies
ALTER TABLE ppdb_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active PPDB settings" 
  ON ppdb_settings FOR SELECT 
  USING (is_active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Admin can manage PPDB settings" 
  ON ppdb_settings FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'Admin'
    )
  );

-- ===========================================
-- 5. CONTACT MESSAGES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_by UUID REFERENCES profiles(id),
  reply_message TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_created_at ON contact_messages(created_at DESC);

-- RLS Policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/Staff can view all messages" 
  ON contact_messages FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

CREATE POLICY "Anyone can insert contact message" 
  ON contact_messages FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin/Staff can update messages" 
  ON contact_messages FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

-- ===========================================
-- FUNCTIONS & TRIGGERS
-- ===========================================

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables
DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ppdb_registrations_updated_at ON ppdb_registrations;
CREATE TRIGGER update_ppdb_registrations_updated_at BEFORE UPDATE ON ppdb_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ppdb_settings_updated_at ON ppdb_settings;
CREATE TRIGGER update_ppdb_settings_updated_at BEFORE UPDATE ON ppdb_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate registration number
CREATE OR REPLACE FUNCTION generate_registration_number(academic_year TEXT)
RETURNS TEXT AS $$
DECLARE
    year_code TEXT;
    next_number INTEGER;
    reg_number TEXT;
BEGIN
    -- Extract year code (e.g., "2024/2025" -> "2024")
    year_code := SPLIT_PART(academic_year, '/', 1);
    
    -- Get next number
    SELECT COALESCE(MAX(
        CAST(SUBSTRING(registration_number FROM 'PPDB-[0-9]+-([0-9]+)') AS INTEGER)
    ), 0) + 1
    INTO next_number
    FROM ppdb_registrations
    WHERE registration_number LIKE 'PPDB-' || year_code || '-%';
    
    -- Format: PPDB-2024-001
    reg_number := 'PPDB-' || year_code || '-' || LPAD(next_number::TEXT, 3, '0');
    
    RETURN reg_number;
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ===========================================

-- Insert sample PPDB settings
INSERT INTO ppdb_settings (academic_year, is_active, registration_start, registration_end, announcement_date)
VALUES ('2024/2025', true, '2024-01-01', '2024-06-30', '2024-07-15')
ON CONFLICT (academic_year) DO NOTHING;

-- Insert sample news (requires existing school_id)
-- Note: Uncomment and adjust school_id after you have schools in the database
/*
INSERT INTO news (title, slug, excerpt, content, image_url, category, status, published_at)
VALUES 
(
  'Siswa MA Fathus Salafi Raih Juara 1 Olimpiade Sains Nasional',
  'juara-1-osn-2024',
  'Prestasi membanggakan dari siswa MA Fathus Salafi yang berhasil meraih juara 1 dalam Olimpiade Sains Nasional tingkat SMA/MA...',
  '<p>Prestasi membanggakan kembali diraih oleh siswa MA Fathus Salafi...</p>',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
  'prestasi',
  'published',
  NOW()
);
*/

-- ===========================================
-- VERIFICATION QUERIES
-- ===========================================
-- Run these to verify tables are created:
-- SELECT * FROM news;
-- SELECT * FROM galleries;
-- SELECT * FROM ppdb_registrations;
-- SELECT * FROM ppdb_settings;
-- SELECT * FROM contact_messages;
