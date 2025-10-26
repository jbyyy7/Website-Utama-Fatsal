# Database Setup Guide

## 🗄️ Supabase Setup

### 1. Create Tables

Jalankan SQL schema di Supabase SQL Editor:

```bash
# Copy isi file supabase-schema.sql ke Supabase SQL Editor
# Atau jalankan langsung:
```

File `supabase-schema.sql` berisi:
- ✅ 6 Tables (ppdb_settings, news, gallery, schools, admin_profiles, activity_logs)
- ✅ Indexes untuk performance
- ✅ RLS (Row Level Security) policies
- ✅ Auto-triggers (updated_at, slug generation)
- ✅ Sample data untuk 5 sekolah

### 2. Create Storage Buckets

Di Supabase Dashboard → Storage, buat 4 buckets:

1. **news-images** (public)
   - Untuk foto berita/prestasi/kegiatan
   
2. **gallery-images** (public)
   - Untuk galeri foto

3. **school-logos** (public)
   - Untuk logo sekolah

4. **avatars** (public)
   - Untuk foto profil admin

Set semua bucket ke **Public** untuk bisa diakses tanpa auth.

### 3. Setup Admin User

```sql
-- Setelah user pertama kali login, insert ke admin_profiles:
INSERT INTO admin_profiles (id, full_name, role, is_active)
VALUES (
  'USER_ID_DARI_AUTH_USERS', -- Ambil dari auth.users table
  'Admin Name',
  'super_admin',
  true
);
```

## 🔌 Connect ke Next.js

### Update Homepage untuk Fetch Data

Edit `app/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase'

export default async function HomePage() {
  const supabase = createClient()
  
  // Fetch PPDB settings
  const { data: ppdbSettings } = await supabase
    .from('ppdb_settings')
    .select('*')
    .eq('is_active', true)
    .single()
  
  const ppdbActive = ppdbSettings?.is_active || false
  const academicYear = ppdbSettings?.academic_year || '2024/2025'
  
  // Fetch news
  const { data: newsData } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(6)
  
  // Fetch gallery
  const { data: galleryData } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    // ... rest of code
  )
}
```

## 🎛️ Admin Dashboard Features

### PPDB Toggle
`/dashboard/ppdb` - Toggle PPDB on/off secara real-time

```typescript
// Update PPDB status
const { data, error } = await supabase
  .from('ppdb_settings')
  .update({ is_active: true })
  .eq('id', settingsId)
```

### News Management
`/dashboard/news` - CRUD berita/prestasi/kegiatan

```typescript
// Create news
const { data, error } = await supabase
  .from('news')
  .insert({
    title: 'Judul Berita',
    content: 'Konten...',
    category: 'prestasi', // 'berita' | 'prestasi' | 'kegiatan'
    is_published: true,
    author_id: userId
  })
```

### Gallery Management
`/dashboard/gallery` - Upload & manage photos

```typescript
// Upload image to storage
const { data, error } = await supabase.storage
  .from('gallery-images')
  .upload(`public/${fileName}`, file)

// Insert to gallery table
const { data: galleryData } = await supabase
  .from('gallery')
  .insert({
    title: 'Judul Foto',
    image_url: publicUrl,
    category: 'kegiatan',
    is_featured: false
  })
```

## 🔐 Row Level Security (RLS)

Schema sudah include RLS policies:

- **Public**: Bisa lihat published content (news, gallery, schools)
- **Admins**: Full CRUD access setelah authenticated
- **Audit**: Activity logs per user

## 📊 Tables Structure

### ppdb_settings
- `id`, `academic_year`, `is_active`, `start_date`, `end_date`, `max_students`

### news
- `id`, `title`, `slug`, `content`, `image_url`, `category`, `is_published`, `views`

### gallery
- `id`, `title`, `image_url`, `category`, `is_featured`

### schools
- `id`, `name`, `slug`, `level`, `gender_type`, `facilities[]`, `programs[]`

### admin_profiles
- `id`, `full_name`, `role`, `school_id`, `is_active`

### activity_logs
- `id`, `user_id`, `action`, `entity_type`, `entity_id`

## 🚀 Next Steps

1. ✅ Run `supabase-schema.sql` di Supabase SQL Editor
2. ✅ Create 4 storage buckets
3. ✅ Setup admin user
4. 🔄 Connect Supabase queries di dashboard pages
5. 🔄 Update homepage components untuk fetch dari database
6. 🔄 Implement file upload functionality
7. 🔄 Add authentication middleware

## 📝 Environment Variables

Pastikan `.env.local` sudah ada:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xlkphzmjbfyzpiqnnyvc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```
