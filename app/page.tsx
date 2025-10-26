import Navbar from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import SchoolsGrid from '@/components/home/SchoolsGrid'
import NewsSection from '@/components/home/NewsSection'
import GallerySection from '@/components/home/GallerySection'
import PPDBBanner from '@/components/home/PPDBBanner'

export default function HomePage() {
  // TODO: Fetch from Supabase database - managed by admin dashboard
  const ppdbActive = true // From ppdb_settings table
  const academicYear = "2024/2025" // From ppdb_settings table
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <Navbar ppdbActive={ppdbActive} />

      {/* Hero Section with PPDB Badge */}
      <HeroSection ppdbActive={ppdbActive} academicYear={academicYear} />

      {/* About Section - Visi, Misi, Nilai */}
      <AboutSection />

      {/* Schools Grid - 5 Lembaga */}
      <SchoolsGrid />

      {/* News/Prestasi/Kegiatan Section */}
      <NewsSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* PPDB Banner (Conditional) */}
      <PPDBBanner isActive={ppdbActive} academicYear={academicYear} />

      {/* Footer */}
      <Footer />
    </div>
  )
}