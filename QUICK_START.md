# Quick Start - Login & Database Setup

## 🚀 Setup Steps (5 menit!)

### 1. Buat Project Supabase Baru

```bash
1. Go to: https://supabase.com
2. Click "New Project"
3. Name: "Website-Fathus-Salafi"
4. Password: [simpan password ini!]
5. Region: Southeast Asia (Singapore)
6. Click "Create New Project"
7. Tunggu ~2 menit sampai project ready
```

### 2. Run Database Schema

```bash
1. Buka Supabase Dashboard
2. Klik "SQL Editor" di sidebar kiri
3. Klik "New Query"
4. Copy SEMUA isi file: supabase-schema.sql
5. Paste ke SQL Editor
6. Klik "Run" atau tekan Ctrl+Enter
7. Tunggu sampai selesai (hijau check ✓)
```

### 3. Update .env.local

```bash
1. Di Supabase Dashboard → Settings → API
2. Copy "Project URL" dan "anon public" key
3. Update file .env.local:
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

### 4. Create Storage Buckets

```bash
1. Di Supabase Dashboard → Storage
2. Click "New Bucket"
3. Buat 4 buckets (semua PUBLIC):
   - news-images
   - gallery-images
   - school-logos
   - avatars
4. Untuk setiap bucket, click → Policies → "New Policy" → "Public Access"
```

### 5. Create Admin User

#### Option A: Manual via Supabase Dashboard

```bash
1. Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Email: admin@fathussalafi.sch.id
4. Password: [buat password kuat]
5. Email Confirm: ✓ (aktifkan!)
6. Click "Create User"
7. Copy User ID yang baru dibuat
```

Kemudian jalankan SQL ini (ganti USER_ID):

```sql
INSERT INTO admin_profiles (id, full_name, role, is_active)
VALUES (
  'USER_ID_DARI_AUTH_USERS', -- Paste User ID di sini
  'Super Admin',
  'super_admin',
  true
);
```

#### Option B: Via SQL (Recommended!)

Jalankan SQL ini di SQL Editor:

```sql
-- Create admin user with hashed password
-- Password: Admin123! (ganti sesuai keinginan)

-- 1. Insert user to auth.users (Next.js 15 compatible)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@fathussalafi.sch.id',
  crypt('Admin123!', gen_salt('bf')), -- Password di sini!
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  '',
  '',
  ''
)
RETURNING id; -- Simpan ID ini!

-- 2. Insert admin profile (ganti UUID dengan ID dari step 1)
INSERT INTO admin_profiles (id, full_name, role, is_active)
VALUES (
  'UUID_DARI_STEP_1', -- Ganti dengan ID user
  'Super Admin',
  'super_admin',
  true
);
```

### 6. Test Login

```bash
# Start dev server
npm run dev

# Buka browser:
http://localhost:3000/login

# Login dengan:
Email: admin@fathussalafi.sch.id
Password: Admin123! (atau password yang kamu set)
```

## ✅ Verification Checklist

- [ ] Project Supabase sudah dibuat
- [ ] Schema SQL sudah dijalankan (6 tables created)
- [ ] .env.local sudah diupdate dengan credentials baru
- [ ] 4 storage buckets sudah dibuat (semua public)
- [ ] Admin user sudah dibuat
- [ ] Admin profile sudah di-insert
- [ ] Bisa login ke /dashboard

## 🔐 Default Login Credentials

```
Email: admin@fathussalafi.sch.id
Password: Admin123!
```

⚠️ **IMPORTANT:** Ganti password ini setelah first login!

## 🎯 Apa Yang Sudah Ready?

### Homepage (/)
- ✅ Hero section
- ✅ About section (Visi, Misi, Nilai)
- ✅ 5 Schools grid (RA, MI, MTs Putra, MTs Putri, MA)
- ✅ News section (dummy data - akan fetch dari DB nanti)
- ✅ Gallery section (dummy data - akan fetch dari DB nanti)
- ✅ PPDB banner (controlled by database)

### Admin Dashboard (/dashboard)
- ✅ Protected by authentication middleware
- ✅ Main dashboard (stats & quick actions)
- ✅ News management (/dashboard/news)
- ✅ Gallery management (/dashboard/gallery)
- ✅ PPDB settings (/dashboard/ppdb)
- ✅ Logout functionality

### Authentication
- ✅ Login page with Supabase integration
- ✅ Auth middleware (protects /dashboard)
- ✅ Admin role checking
- ✅ Redirect if not authenticated
- ✅ Session management

### Database
- ✅ 6 tables created (ppdb_settings, news, gallery, schools, admin_profiles, activity_logs)
- ✅ 5 schools pre-populated
- ✅ RLS policies untuk security
- ✅ Auto-triggers (updated_at, slug generation)
- ✅ Indexes untuk performance

## 🚧 TODO Next (Connect Real Data)

1. **Homepage - Fetch dari Database**
   ```typescript
   // Update app/page.tsx
   // Fetch PPDB settings, news, gallery
   ```

2. **Dashboard - CRUD Operations**
   ```typescript
   // Add create, update, delete functions
   // Connect to Supabase tables
   ```

3. **File Upload**
   ```typescript
   // Implement image upload ke Storage
   // Generate thumbnails
   ```

## 🆘 Troubleshooting

### Error: "Missing Supabase environment variables"
✅ Check .env.local file ada dan format benar

### Error: "User not authorized"
✅ Check admin_profiles table, pastikan user ada dengan is_active=true

### Error: "Cannot find table"
✅ Run supabase-schema.sql di SQL Editor

### Build warnings tentang Edge Runtime
✅ Normal! Ignore warnings, build tetap sukses

## 📞 Need Help?

Check:
1. DATABASE_SETUP.md - Detailed database guide
2. supabase-schema.sql - Full schema
3. middleware.ts - Auth protection logic
4. lib/supabase-client.ts - Client setup
5. lib/supabase-server.ts - Server setup

Selamat! Website siap digunakan! 🎉
