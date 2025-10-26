# 📊 Database Import Guide - Website Utama Fatsal

## Overview
Semua data di website ini sekarang **diimpor langsung dari database Supabase**, bukan lagi data dummy.

---

## ✅ Yang Sudah Diubah

### 1. **SchoolsGrid Component** (`components/home/SchoolsGrid.tsx`)
- ❌ **Sebelum:** Data dummy array of 5 schools
- ✅ **Sekarang:** Fetch dari tabel `schools` di Supabase
- **Query:** 
  ```typescript
  supabase.from('schools').select('*').order('level', { ascending: true })
  ```
- **Features:**
  - Dynamic icon berdasarkan school level (RA, MI, MTs, MA)
  - Dynamic color gradient per level
  - Dynamic description & features
  - Tampilkan address jika tersedia
  - Loading state & empty state

### 2. **NewsSection Component** (`components/home/NewsSection.tsx`)
- ❌ **Sebelum:** Data dummy array of 3 news articles
- ✅ **Sekarang:** Fetch dari tabel `news` di Supabase
- **Query:**
  ```typescript
  supabase.from('news')
    .select('id, title, slug, excerpt, image_url, category, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)
  ```
- **Features:**
  - Hanya tampilkan berita yang sudah dipublikasi
  - Sort by published date (terbaru dulu)
  - Default image jika tidak ada image_url
  - Category badge (berita/prestasi/kegiatan)
  - Loading state & empty state

### 3. **GallerySection Component** (`components/home/GallerySection.tsx`)
- ❌ **Sebelum:** Data dummy array of 6 gallery images
- ✅ **Sekarang:** Fetch dari tabel `galleries` di Supabase
- **Query:**
  ```typescript
  supabase.from('galleries')
    .select('id, title, description, image_url, category')
    .order('created_at', { ascending: false })
    .limit(6)
  ```
- **Features:**
  - Tampilkan 6 foto terbaru
  - Category overlay
  - Loading state & empty state

### 4. **Dashboard Page** (`app/(dashboard)/dashboard/page.tsx`)
- ❌ **Sebelum:** Data dummy stats & recent news
- ✅ **Sekarang:** Fetch real stats dari database
- **Queries:**
  ```typescript
  // Count queries (parallel)
  - Total news: supabase.from('news').select('id', { count: 'exact' })
  - Total galleries: supabase.from('galleries').select('id', { count: 'exact' })
  - Total schools: supabase.from('schools').select('id', { count: 'exact' })
  - PPDB settings: supabase.from('ppdb_settings').eq('is_active', true)
  - Recent news: supabase.from('news').limit(3)
  ```
- **Features:**
  - Real-time stats
  - PPDB status dari database
  - Recent news dengan status (draft/published)
  - Loading state

### 5. **Home Page** (`app/page.tsx`)
- ❌ **Sebelum:** Hardcoded ppdbActive & academicYear
- ✅ **Sekarang:** Fetch dari tabel `ppdb_settings`
- **Query:**
  ```typescript
  supabase.from('ppdb_settings')
    .select('is_active, academic_year')
    .eq('is_active', true)
    .single()
  ```
- **Features:**
  - Dynamic PPDB badge di Hero Section
  - Dynamic academic year
  - Fallback jika tidak ada setting aktif

---

## 🗄️ Database Schema

File SQL schema sudah dibuat di: **`website-schema.sql`**

### Tables Yang Perlu Dibuat:

#### 1. **news** - Berita & Artikel
```sql
- id (UUID, PK)
- title (TEXT)
- slug (TEXT, UNIQUE)
- excerpt (TEXT)
- content (TEXT)
- image_url (TEXT)
- category (berita|prestasi|kegiatan)
- status (draft|published|archived)
- published_at (TIMESTAMP)
- author_id (UUID, FK to profiles)
- school_id (UUID, FK to schools)
```

#### 2. **galleries** - Galeri Foto
```sql
- id (UUID, PK)
- title (TEXT)
- description (TEXT)
- image_url (TEXT)
- category (kegiatan|akademik|ekstrakurikuler|prestasi|acara|fasilitas)
- school_id (UUID, FK to schools)
- uploaded_by (UUID, FK to profiles)
```

#### 3. **ppdb_registrations** - Pendaftaran PPDB
```sql
- id (UUID, PK)
- registration_number (TEXT, UNIQUE)
- academic_year (TEXT)
- school_id (UUID, FK)
- student_name, nisn, birth info, etc.
- parent info (name, email, phone)
- documents (birth_certificate_url, photo_url, etc.)
- status (pending|verified|accepted|rejected|cancelled)
```

#### 4. **ppdb_settings** - Pengaturan PPDB
```sql
- id (UUID, PK)
- academic_year (TEXT, UNIQUE)
- is_active (BOOLEAN)
- registration_start/end (DATE)
- announcement_date (DATE)
- requirements (TEXT[])
```

#### 5. **contact_messages** - Pesan Kontak
```sql
- id (UUID, PK)
- name, email, phone, subject, message
- status (new|read|replied|archived)
- reply_message (TEXT)
```

---

## 🚀 Setup Instructions

### Step 1: Run SQL Schema
1. Login ke Supabase Dashboard
2. Buka SQL Editor
3. Copy isi file `website-schema.sql`
4. Execute query
5. Verify tables created:
   ```sql
   SELECT * FROM news;
   SELECT * FROM galleries;
   SELECT * FROM ppdb_registrations;
   SELECT * FROM ppdb_settings;
   SELECT * FROM contact_messages;
   ```

### Step 2: Insert Sample Data (Optional)

#### PPDB Settings
```sql
INSERT INTO ppdb_settings (academic_year, is_active, registration_start, registration_end)
VALUES ('2024/2025', true, '2024-01-01', '2024-06-30');
```

#### Sample Schools (jika belum ada dari SIAKAD)
```sql
INSERT INTO schools (name, level, address) VALUES
('RA Fathus Salafi', 'RA', 'Jl. Contoh No. 1'),
('MI Fathus Salafi', 'MI', 'Jl. Contoh No. 2'),
('MTs Putra Fathus Salafi', 'MTs', 'Jl. Contoh No. 3'),
('MTs Putri Fathus Salafi', 'MTs', 'Jl. Contoh No. 4'),
('MA Fathus Salafi', 'MA', 'Jl. Contoh No. 5');
```

#### Sample News
```sql
INSERT INTO news (title, slug, excerpt, content, category, status, published_at, image_url)
VALUES (
  'Siswa MA Raih Juara 1 OSN',
  'juara-1-osn-2024',
  'Prestasi membanggakan...',
  '<p>Konten lengkap...</p>',
  'prestasi',
  'published',
  NOW(),
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
);
```

#### Sample Galleries
```sql
INSERT INTO galleries (title, image_url, category)
VALUES (
  'Upacara Bendera',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600',
  'kegiatan'
);
```

### Step 3: Verify Data di Website
1. Run development server: `npm run dev`
2. Buka http://localhost:3000
3. Check:
   - Schools Grid → Harus tampil data dari database
   - News Section → Tampil berita published
   - Gallery Section → Tampil foto terbaru
   - PPDB Banner → Status sesuai `ppdb_settings`
4. Login ke dashboard: http://localhost:3000/dashboard
5. Check stats:
   - Total berita
   - Total foto galeri
   - Total sekolah
   - PPDB status

---

## 📝 Pengelolaan Data

### Tambah Berita (Admin Dashboard)
1. Login ke `/dashboard`
2. Klik "Tambah Berita" atau buka `/dashboard/news`
3. Isi form:
   - Title, excerpt, content
   - Upload image (ke Supabase Storage)
   - Pilih category (berita/prestasi/kegiatan)
   - Pilih school (optional)
   - Set status (draft/published)
4. Save → Otomatis muncul di home page (jika published)

### Upload Foto Galeri
1. Login ke `/dashboard`
2. Klik "Upload Foto" atau buka `/dashboard/gallery`
3. Upload foto ke Supabase Storage
4. Isi title, description, category
5. Save → Otomatis muncul di home page

### Kelola PPDB Settings
1. Login ke `/dashboard`
2. Buka `/dashboard/ppdb`
3. Toggle is_active untuk on/off PPDB
4. Set registration dates
5. Save → Otomatis update di home page

---

## 🔐 Row Level Security (RLS)

Semua tabel sudah dilengkapi RLS policies:

### Public Access
- ✅ Anyone dapat view published news
- ✅ Anyone dapat view galleries
- ✅ Anyone dapat view schools
- ✅ Anyone dapat view active PPDB settings
- ✅ Anyone dapat insert PPDB registration
- ✅ Anyone dapat insert contact message

### Admin/Staff Access
- ✅ Admin/Staff dapat CRUD news
- ✅ Admin/Staff dapat CRUD galleries
- ✅ Admin/Staff dapat view & manage PPDB registrations
- ✅ Admin dapat manage PPDB settings

---

## 🐛 Troubleshooting

### Data tidak muncul?
1. Check console browser untuk error
2. Verify RLS policies enabled
3. Check Supabase logs
4. Pastikan tabel sudah dibuat
5. Pastikan ada data dengan status 'published' (untuk news)

### "Cannot find module @/lib/supabase-client"
- Pastikan file `lib/supabase-client.ts` ada
- Restart dev server

### PPDB tidak aktif di home page?
```sql
-- Check PPDB settings
SELECT * FROM ppdb_settings WHERE is_active = true;

-- Jika kosong, insert:
INSERT INTO ppdb_settings (academic_year, is_active, registration_start, registration_end)
VALUES ('2024/2025', true, NOW(), NOW() + INTERVAL '6 months');
```

### Stats di dashboard salah?
- Clear browser cache
- Re-fetch dengan refresh page
- Check tabel counts manual:
  ```sql
  SELECT COUNT(*) FROM news;
  SELECT COUNT(*) FROM galleries;
  SELECT COUNT(*) FROM schools;
  ```

---

## 📚 Next Steps

### Yang Perlu Dibuat Selanjutnya:
1. **Dashboard CRUD Pages:**
   - `/dashboard/news` - Manage berita (create, edit, delete)
   - `/dashboard/gallery` - Upload & manage foto
   - `/dashboard/ppdb` - Manage PPDB settings & registrations

2. **API Routes:**
   - `/api/ppdb/accept` - Auto-create user account from registration
   - `/api/upload` - Handle image uploads to Supabase Storage

3. **PPDB Form:**
   - `/ppdb/daftar` - Form pendaftaran online
   - Integration dengan auto-account creation

4. **Detail Pages:**
   - `/berita/[slug]` - News detail page
   - `/sekolah/[level]` - School detail page
   - `/galeri` - Full gallery page

---

## 🎯 Summary

✅ **Semua data sekarang dari database!**
- SchoolsGrid → `schools` table
- NewsSection → `news` table  
- GallerySection → `galleries` table
- Dashboard stats → Real-time counts
- PPDB settings → `ppdb_settings` table

✅ **Schema SQL siap digunakan** (`website-schema.sql`)

✅ **RLS policies configured** untuk security

✅ **Loading & empty states** untuk UX yang baik

---

**Last Updated:** October 26, 2025  
**Version:** 1.0  
**Author:** GitHub Copilot
