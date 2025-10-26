-- ============================================================================
-- WEBSITE UTAMA - ADDITIONAL TABLES ONLY
-- Yayasan Fathus Salafi
-- ============================================================================
-- SAFE MODE: Hanya CREATE TABLE baru, TIDAK mengubah/drop table existing
-- Compatible dengan SIAKAD & LMS yang sudah ada
-- 
-- ⚠️ IMPORTANT:
-- - JANGAN hapus/alter tabel: profiles, schools, classes, subjects (dari SIAKAD)
-- - JANGAN hapus/alter tabel: courses, lessons, enrollments (dari LMS - nanti)
-- - Script ini HANYA menambah 5 tabel baru untuk Website Utama
-- 
-- Tables yang akan dibuat:
-- 1. news              - Berita & artikel website
-- 2. galleries         - Galeri foto website  
-- 3. ppdb_registrations - Pendaftaran siswa baru
-- 4. ppdb_settings     - Pengaturan PPDB
-- 5. contact_messages  - Pesan dari form kontak
-- ============================================================================

-- Enable UUID extension jika belum aktif (safe - tidak error jika sudah ada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. NEWS TABLE - Berita & Artikel Website
-- ============================================================================
-- Tabel untuk menyimpan berita, prestasi, dan kegiatan yang tampil di website
-- Referensi ke tabel existing: profiles (author), schools
-- ============================================================================

CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Content
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  
  -- Categorization
  category TEXT NOT NULL CHECK (category IN ('berita', 'prestasi', 'kegiatan')),
  
  -- Relations to existing tables
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  
  -- Publishing
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes untuk performance
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_school_id ON news(school_id);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_author_id ON news(author_id);

-- Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Public bisa lihat berita published, authenticated bisa lihat semua
CREATE POLICY "Public can view published news" 
  ON news FOR SELECT 
  USING (status = 'published' OR auth.uid() IS NOT NULL);

-- Admin/Staff bisa create (Principal tidak ada di enum SIAKAD)
CREATE POLICY "Admin/Staff can insert news" 
  ON news FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

-- Admin/Staff bisa update
CREATE POLICY "Admin/Staff can update news" 
  ON news FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

-- Hanya Admin yang bisa delete
CREATE POLICY "Admin can delete news" 
  ON news FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'Admin'
    )
  );

-- ============================================================================
-- 2. GALLERIES TABLE - Galeri Foto Website
-- ============================================================================
-- Tabel untuk menyimpan foto-foto kegiatan yang tampil di galeri website
-- Referensi ke tabel existing: profiles (uploader), schools
-- ============================================================================

CREATE TABLE IF NOT EXISTS galleries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Content
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  
  -- Categorization
  category TEXT CHECK (category IN ('kegiatan', 'akademik', 'ekstrakurikuler', 'prestasi', 'acara', 'fasilitas')),
  
  -- Relations to existing tables
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_galleries_category ON galleries(category);
CREATE INDEX IF NOT EXISTS idx_galleries_school_id ON galleries(school_id);
CREATE INDEX IF NOT EXISTS idx_galleries_created_at ON galleries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_galleries_uploaded_by ON galleries(uploaded_by);

-- Row Level Security
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;

-- Semua orang bisa lihat galeri
CREATE POLICY "Anyone can view galleries" 
  ON galleries FOR SELECT 
  USING (true);

-- Admin/Staff bisa upload
CREATE POLICY "Admin/Staff can insert galleries" 
  ON galleries FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

-- Admin/Staff bisa update
CREATE POLICY "Admin/Staff can update galleries" 
  ON galleries FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

-- Hanya Admin yang bisa delete
CREATE POLICY "Admin can delete galleries" 
  ON galleries FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'Admin'
    )
  );

-- ============================================================================
-- 3. PPDB REGISTRATIONS TABLE - Pendaftaran Siswa Baru
-- ============================================================================
-- Tabel untuk menyimpan data pendaftaran PPDB online
-- Referensi ke tabel existing: schools, profiles (verified_by, created_user)
-- ============================================================================

CREATE TABLE IF NOT EXISTS ppdb_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Registration Info
  registration_number TEXT UNIQUE NOT NULL, -- e.g., "PPDB-2025-001"
  academic_year TEXT NOT NULL,              -- e.g., "2025/2026"
  
  -- School Selection (FK ke existing schools table)
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE RESTRICT,
  
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
  
  -- Documents URLs (Supabase Storage)
  birth_certificate_url TEXT,
  family_card_url TEXT,
  photo_url TEXT,
  report_card_url TEXT,
  
  -- Status & Verification
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'accepted', 'rejected', 'cancelled')),
  verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  notes TEXT,
  
  -- Auto-created account reference (FK ke profiles jika sudah dibuat akun)
  created_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ppdb_registration_number ON ppdb_registrations(registration_number);
CREATE INDEX IF NOT EXISTS idx_ppdb_academic_year ON ppdb_registrations(academic_year);
CREATE INDEX IF NOT EXISTS idx_ppdb_school_id ON ppdb_registrations(school_id);
CREATE INDEX IF NOT EXISTS idx_ppdb_status ON ppdb_registrations(status);
CREATE INDEX IF NOT EXISTS idx_ppdb_created_at ON ppdb_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ppdb_parent_email ON ppdb_registrations(parent_email);

-- Row Level Security
ALTER TABLE ppdb_registrations ENABLE ROW LEVEL SECURITY;

-- User bisa lihat pendaftaran mereka sendiri (by email)
CREATE POLICY "Users can view own registration" 
  ON ppdb_registrations FOR SELECT 
  USING (
    parent_email = (SELECT email FROM profiles WHERE id = auth.uid())
  );

-- Admin/Staff bisa lihat semua pendaftaran
CREATE POLICY "Admin/Staff can view all registrations" 
  ON ppdb_registrations FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

-- Siapa saja bisa daftar (public form)
CREATE POLICY "Anyone can insert registration" 
  ON ppdb_registrations FOR INSERT 
  WITH CHECK (true);

-- Admin/Staff bisa update (untuk verifikasi)
CREATE POLICY "Admin/Staff can update registrations" 
  ON ppdb_registrations FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

-- ============================================================================
-- 4. PPDB SETTINGS TABLE - Pengaturan PPDB
-- ============================================================================
-- Tabel untuk menyimpan konfigurasi PPDB per tahun ajaran
-- Hanya 1 academic_year yang bisa active di satu waktu
-- ============================================================================

CREATE TABLE IF NOT EXISTS ppdb_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Academic Year (unique per tahun)
  academic_year TEXT NOT NULL UNIQUE, -- e.g., "2025/2026"
  is_active BOOLEAN DEFAULT false,
  
  -- Registration Period
  registration_start DATE NOT NULL,
  registration_end DATE NOT NULL,
  announcement_date DATE,
  
  -- Requirements & Info
  requirements TEXT[],                 -- Array of requirements
  registration_fee INTEGER DEFAULT 0,  -- Biaya pendaftaran
  
  -- Contact Info
  contact_person TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ppdb_settings_academic_year ON ppdb_settings(academic_year);
CREATE INDEX IF NOT EXISTS idx_ppdb_settings_is_active ON ppdb_settings(is_active);

-- Row Level Security
ALTER TABLE ppdb_settings ENABLE ROW LEVEL SECURITY;

-- Public bisa lihat PPDB yang active, authenticated bisa lihat semua
CREATE POLICY "Anyone can view active PPDB settings" 
  ON ppdb_settings FOR SELECT 
  USING (is_active = true OR auth.uid() IS NOT NULL);

-- Hanya Admin yang bisa manage PPDB settings
CREATE POLICY "Admin can manage PPDB settings" 
  ON ppdb_settings FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'Admin'
    )
  );

-- ============================================================================
-- 5. CONTACT MESSAGES TABLE - Pesan dari Form Kontak
-- ============================================================================
-- Tabel untuk menyimpan pesan yang masuk dari form kontak website
-- ============================================================================

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Sender Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Message
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Status & Reply
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reply_message TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_messages(email);

-- Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Admin/Staff bisa lihat semua pesan
CREATE POLICY "Admin/Staff can view all messages" 
  ON contact_messages FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

-- Siapa saja bisa kirim pesan (public form)
CREATE POLICY "Anyone can insert contact message" 
  ON contact_messages FOR INSERT 
  WITH CHECK (true);

-- Admin/Staff bisa update (untuk reply)
CREATE POLICY "Admin/Staff can update messages" 
  ON contact_messages FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('Admin', 'Staff')
    )
  );

-- ============================================================================
-- HELPER FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function: Auto-update updated_at timestamp
-- Safe: Tidak mengubah function existing, hanya CREATE OR REPLACE
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to news table
DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at 
  BEFORE UPDATE ON news
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to ppdb_registrations table
DROP TRIGGER IF EXISTS update_ppdb_registrations_updated_at ON ppdb_registrations;
CREATE TRIGGER update_ppdb_registrations_updated_at 
  BEFORE UPDATE ON ppdb_registrations
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to ppdb_settings table
DROP TRIGGER IF EXISTS update_ppdb_settings_updated_at ON ppdb_settings;
CREATE TRIGGER update_ppdb_settings_updated_at 
  BEFORE UPDATE ON ppdb_settings
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function: Generate registration number (PPDB-YYYY-XXX)
CREATE OR REPLACE FUNCTION generate_registration_number(p_academic_year TEXT)
RETURNS TEXT AS $$
DECLARE
    year_code TEXT;
    next_number INTEGER;
    reg_number TEXT;
BEGIN
    -- Extract year code: "2025/2026" -> "2025"
    year_code := SPLIT_PART(p_academic_year, '/', 1);
    
    -- Get next sequential number for this year
    SELECT COALESCE(MAX(
        CAST(SUBSTRING(registration_number FROM 'PPDB-[0-9]+-([0-9]+)') AS INTEGER)
    ), 0) + 1
    INTO next_number
    FROM ppdb_registrations
    WHERE registration_number LIKE 'PPDB-' || year_code || '-%';
    
    -- Format: PPDB-2025-001, PPDB-2025-002, etc.
    reg_number := 'PPDB-' || year_code || '-' || LPAD(next_number::TEXT, 3, '0');
    
    RETURN reg_number;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SAMPLE DATA (OPTIONAL)
-- ============================================================================
-- Uncomment untuk insert sample data saat development/testing

-- Sample PPDB Settings
INSERT INTO ppdb_settings (
  academic_year, 
  is_active, 
  registration_start, 
  registration_end, 
  announcement_date
)
VALUES (
  '2025/2026', 
  true, 
  '2025-01-01', 
  '2025-06-30', 
  '2025-07-15'
)
ON CONFLICT (academic_year) DO NOTHING;

-- Sample News (setelah ada data di tabel schools & profiles)
/*
INSERT INTO news (
  title, 
  slug, 
  excerpt, 
  content, 
  image_url, 
  category, 
  status, 
  published_at
)
VALUES (
  'Prestasi Juara 1 Olimpiade Sains Nasional',
  'juara-1-osn-2025',
  'Siswa MA Fathus Salafi meraih juara 1 OSN tingkat nasional...',
  '<h1>Prestasi Membanggakan</h1><p>Detail prestasi...</p>',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
  'prestasi',
  'published',
  NOW()
);
*/

-- Sample Galleries
/*
INSERT INTO galleries (title, image_url, category)
VALUES 
  ('Upacara Bendera', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600', 'kegiatan'),
  ('Pembelajaran di Kelas', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600', 'akademik'),
  ('Kegiatan Ekstrakurikuler', 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600', 'ekstrakurikuler');
*/

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Uncomment untuk verify tables berhasil dibuat

-- Check tables created
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name IN ('news', 'galleries', 'ppdb_registrations', 'ppdb_settings', 'contact_messages');

-- Check data
-- SELECT * FROM news;
-- SELECT * FROM galleries;
-- SELECT * FROM ppdb_registrations;
-- SELECT * FROM ppdb_settings;
-- SELECT * FROM contact_messages;

-- Check RLS policies
-- SELECT schemaname, tablename, policyname 
-- FROM pg_policies 
-- WHERE tablename IN ('news', 'galleries', 'ppdb_registrations', 'ppdb_settings', 'contact_messages');

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
