-- ================================
-- YAYASAN FATHUS SALAFI DATABASE SCHEMA
-- ================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================
-- 1. PPDB SETTINGS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS ppdb_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT false,
  start_date DATE,
  end_date DATE,
  registration_link TEXT,
  max_students INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default PPDB settings
INSERT INTO ppdb_settings (academic_year, is_active, start_date, end_date, max_students)
VALUES ('2024/2025', true, '2024-11-01', '2025-07-31', 500)
ON CONFLICT DO NOTHING;

-- ================================
-- 2. NEWS/ARTICLES TABLE
-- ================================
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  category VARCHAR(50) DEFAULT 'berita', -- 'berita', 'prestasi', 'kegiatan'
  author_id UUID REFERENCES auth.users(id),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);

-- ================================
-- 3. GALLERY TABLE
-- ================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(50) DEFAULT 'kegiatan', -- 'kegiatan', 'prestasi', 'fasilitas'
  is_featured BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(is_featured);

-- ================================
-- 4. SCHOOLS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  level VARCHAR(20) NOT NULL, -- 'RA', 'MI', 'MTs', 'MA'
  gender_type VARCHAR(20), -- 'Putra', 'Putri', 'Campur'
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(100),
  facilities TEXT[], -- Array of facilities
  programs TEXT[], -- Array of programs
  total_students INTEGER DEFAULT 0,
  total_teachers INTEGER DEFAULT 0,
  accreditation VARCHAR(5), -- 'A', 'B', 'C'
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert 5 schools
INSERT INTO schools (name, slug, level, gender_type, description, facilities, programs, total_students, total_teachers, accreditation, order_index)
VALUES 
  (
    'RA Fathus Salafi',
    'ra',
    'RA',
    'Campur',
    'Pendidikan anak usia dini dengan pendekatan Islam yang menyenangkan dan edukatif',
    ARRAY['Ruang Kelas Ber-AC', 'Area Bermain', 'Perpustakaan Mini', 'Ruang Kreativitas'],
    ARRAY['Tahfidz', 'Bahasa Arab & Inggris', 'Seni & Kreativitas', 'Motorik'],
    120,
    15,
    'A',
    1
  ),
  (
    'MI Fathus Salafi',
    'mi',
    'MI',
    'Campur',
    'Madrasah Ibtidaiyah dengan kurikulum terpadu yang mengembangkan potensi akademik dan spiritual',
    ARRAY['Lab Komputer', 'Perpustakaan', 'Masjid', 'Lapangan Olahraga', 'Kantin Sehat'],
    ARRAY['Tahfidz Al-Quran', 'Bahasa Arab & Inggris', 'Sains & Matematika', 'Pramuka'],
    350,
    28,
    'A',
    2
  ),
  (
    'MTs Putra Fathus Salafi',
    'mts-putra',
    'MTs',
    'Putra',
    'Madrasah Tsanawiyah khusus putra dengan pembinaan karakter dan akademik yang unggul',
    ARRAY['Lab IPA', 'Lab Komputer', 'Perpustakaan Digital', 'Asrama', 'Masjid', 'Lapangan Futsal'],
    ARRAY['Tahfidz 30 Juz', 'Bahasa Arab & Inggris Intensif', 'Robotika', 'Kepemimpinan', 'Olahraga'],
    280,
    32,
    'A',
    3
  ),
  (
    'MTs Putri Fathus Salafi',
    'mts-putri',
    'MTs',
    'Putri',
    'Madrasah Tsanawiyah khusus putri dengan program tahfidz dan pengembangan bakat yang komprehensif',
    ARRAY['Lab IPA', 'Lab Komputer', 'Perpustakaan Digital', 'Asrama', 'Masjid', 'Ruang Keterampilan'],
    ARRAY['Tahfidz 30 Juz', 'Bahasa Arab & Inggris Intensif', 'Keterampilan', 'Seni Islam', 'Leadership'],
    250,
    30,
    'A',
    4
  ),
  (
    'MA Fathus Salafi',
    'ma',
    'MA',
    'Campur',
    'Madrasah Aliyah dengan program unggulan yang mempersiapkan siswa menuju perguruan tinggi terbaik',
    ARRAY['Lab IPA Lengkap', 'Lab Komputer & Multimedia', 'Perpustakaan Digital', 'Masjid', 'Asrama', 'Wifi Area'],
    ARRAY['Tahfidz Al-Quran', 'Jurusan IPA & IPS', 'Persiapan UTBK', 'Bahasa Asing', 'Olimpiade'],
    200,
    25,
    'A',
    5
  )
ON CONFLICT (slug) DO NOTHING;

-- ================================
-- 5. ADMIN USERS TABLE (Extends auth.users)
-- ================================
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'admin', -- 'super_admin', 'admin', 'editor'
  school_id UUID REFERENCES schools(id), -- Null for super admin
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- 6. ACTIVITY LOGS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'publish', 'unpublish'
  entity_type VARCHAR(50) NOT NULL, -- 'news', 'gallery', 'ppdb', 'school'
  entity_id UUID,
  description TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for activity logs
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at DESC);

-- ================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================

-- Enable RLS
ALTER TABLE ppdb_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published news"
  ON news FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can view active PPDB settings"
  ON ppdb_settings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view gallery"
  ON gallery FOR SELECT
  USING (true);

CREATE POLICY "Public can view active schools"
  ON schools FOR SELECT
  USING (is_active = true);

-- Admin full access (authenticated users with admin role)
CREATE POLICY "Admins can manage news"
  ON news FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM admin_profiles WHERE is_active = true
    )
  );

CREATE POLICY "Admins can manage gallery"
  ON gallery FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM admin_profiles WHERE is_active = true
    )
  );

CREATE POLICY "Admins can manage PPDB settings"
  ON ppdb_settings FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM admin_profiles WHERE is_active = true
    )
  );

CREATE POLICY "Admins can view their profile"
  ON admin_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view their activity logs"
  ON activity_logs FOR SELECT
  USING (auth.uid() = user_id);

-- ================================
-- FUNCTIONS & TRIGGERS
-- ================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_ppdb_settings_updated_at BEFORE UPDATE ON ppdb_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_profiles_updated_at BEFORE UPDATE ON admin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-generate slug from title
CREATE OR REPLACE FUNCTION generate_slug_from_title()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for auto-slug generation
CREATE TRIGGER auto_generate_news_slug BEFORE INSERT ON news
  FOR EACH ROW EXECUTE FUNCTION generate_slug_from_title();

-- ================================
-- STORAGE BUCKETS
-- ================================
-- Run these in Supabase Storage UI or via API:
-- 1. Create bucket: 'news-images' (public)
-- 2. Create bucket: 'gallery-images' (public)
-- 3. Create bucket: 'school-logos' (public)
-- 4. Create bucket: 'avatars' (public)

