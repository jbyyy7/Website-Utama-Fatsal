// Types for dynamic content managed by admin

export interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt: string
  image_url?: string
  category: 'prestasi' | 'kegiatan' | 'pengumuman' | 'berita'
  published_at: string
  created_at: string
  updated_at: string
  author_id: string
  is_published: boolean
}

export interface GalleryImage {
  id: string
  title: string
  description?: string
  image_url: string
  category: string
  uploaded_at: string
  is_featured: boolean
}

export interface PPDBSettings {
  id: string
  is_active: boolean // Toggle PPDB on/off
  start_date: string
  end_date: string
  academic_year: string // e.g., "2024/2025"
  announcement_text?: string
  created_at: string
  updated_at: string
}

export interface SchoolInfo {
  id: string
  name: string
  slug: string // 'ra' | 'mi' | 'mts-putra' | 'mts-putri' | 'ma'
  description: string
  full_description?: string
  facilities?: string[]
  programs?: string[]
  contact_person?: string
  phone?: string
  is_active: boolean
}
