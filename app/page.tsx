import { createClient } from '@/lib/supabase-server'
import Navbar from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import SchoolsGrid from '@/components/home/SchoolsGrid'
import NewsSection from '@/components/home/NewsSection'
import GallerySection from '@/components/home/GallerySection'
import PPDBBanner from '@/components/home/PPDBBanner'
import PortalSection from '@/components/home/PortalSection'

export default async function HomePage() {
  const supabase = await createClient()
  
  // Fetch PPDB settings from database
  const { data: ppdbSettings } = await supabase
    .from('ppdb_settings')
    .select('is_active, academic_year')
    .eq('is_active', true)
    .single()
  
  const ppdbActive = ppdbSettings?.is_active || false
  const academicYear = ppdbSettings?.academic_year || new Date().getFullYear() + '/' + (new Date().getFullYear() + 1)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <Navbar ppdbActive={ppdbActive} />

      {/* Hero Section with PPDB Badge */}
      <HeroSection ppdbActive={ppdbActive} academicYear={academicYear} />

      {/* About Section - Visi, Misi, Nilai */}
      <div id="tentang">
        <AboutSection />
      </div>

      {/* Schools Grid - 5 Lembaga */}
      <div id="sekolah">
        <SchoolsGrid />
      </div>

      {/* News/Prestasi/Kegiatan Section */}
      <div id="berita">
        <NewsSection />
      </div>

      {/* Gallery Section */}
      <div id="galeri">
        <GallerySection />
      </div>

      {/* Portal Section - SIAKAD & LMS */}
      <PortalSection />

      {/* PPDB Banner (Conditional) */}
      <PPDBBanner isActive={ppdbActive} academicYear={academicYear} />

      {/* Footer */}
      <Footer />
    </div>
  )
}