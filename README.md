# Website-Utama-Fatsal
# Website Utama - Yayasan Fathus Salafi

Website resmi Yayasan Fathus Salafi yang menampilkan informasi sekolah, berita, dan sistem PPDB (Penerimaan Peserta Didik Baru) online.

## 🌐 Ekosistem Yayasan Fathus Salafi

Project ini adalah bagian dari ekosistem 3 sistem yang terintegrasi:

1. **Website Utama** (repo ini) - Landing page & PPDB
   - Domain: `yayasan-fatsal.com`
   
2. **SIAKAD** - Sistem Informasi Akademik
   - Domain: `siakad.yayasan-fatsal.com`
   - Repository: [Siakad-Fatsal](https://github.com/jbyyy7/Siakad-Fatsal)
   
3. **LMS** - Learning Management System
   - Domain: `lms.yayasan-fatsal.com`
   - Repository: [TBD]

**⚠️ PENTING:** Semua sistem menggunakan **SHARED AUTHENTICATION** via Supabase!

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (shared)
- **Forms:** React Hook Form + Zod
- **Language:** TypeScript

## 🔧 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/jbyyy7/Website-Utama-Fatsal.git
cd Website-Utama-Fatsal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env.local` and fill with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xlkphzmjbfyzpiqnnyvc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your_anon_key]
SUPABASE_SERVICE_ROLE_KEY=[your_service_role_key]
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ Important:** The Supabase credentials MUST be the same as SIAKAD!

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

See [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) for complete system documentation.

## 👥 Contact

- **Repository Owner:** jbyyy7
- **Organization:** Yayasan Fathus Salafi
