import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Yayasan Fathus Salafi
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                Pendidikan Islam Berkualitas untuk Generasi Rabbani
              </p>
              <p className="text-lg mb-10 text-primary-50">
                Menyelenggarakan pendidikan Islam terpadu dari TK hingga MA 
                dengan kurikulum berkualitas yang memadukan ilmu agama dan umum
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ppdb">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Daftar PPDB 2024/2025
                  </Button>
                </Link>
                <Link href="/tentang">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Tentang Kami
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Schools Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Sekolah Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Yayasan Fathus Salafi mengelola berbagai tingkat pendidikan Islam
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* MA */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  MA Fathus Salafi
                </h3>
                <p className="text-gray-600 mb-4">
                  Madrasah Aliyah dengan program IPA, IPS, dan Keagamaan
                </p>
                <Link href="/sekolah/ma">
                  <Button variant="outline" size="sm">
                    Selengkapnya →
                  </Button>
                </Link>
              </div>

              {/* MTs */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  MTs Fathus Salafi
                </h3>
                <p className="text-gray-600 mb-4">
                  Madrasah Tsanawiyah dengan kurikulum terpadu
                </p>
                <Link href="/sekolah/mts">
                  <Button variant="outline" size="sm">
                    Selengkapnya →
                  </Button>
                </Link>
              </div>

              {/* MI */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  MI Fathus Salafi
                </h3>
                <p className="text-gray-600 mb-4">
                  Madrasah Ibtidaiyah dengan pembelajaran menyenangkan
                </p>
                <Link href="/sekolah/mi">
                  <Button variant="outline" size="sm">
                    Selengkapnya →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Keunggulan Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Mengapa memilih Yayasan Fathus Salafi?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Kurikulum Terpadu</h3>
                <p className="text-gray-600 text-sm">
                  Memadukan kurikulum nasional dengan pendidikan agama Islam
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Guru Berkualitas</h3>
                <p className="text-gray-600 text-sm">
                  Tenaga pengajar profesional dan berpengalaman
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Fasilitas Lengkap</h3>
                <p className="text-gray-600 text-sm">
                  Sarana dan prasarana pendidikan yang memadai
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Sistem Digital</h3>
                <p className="text-gray-600 text-sm">
                  SIAKAD dan LMS untuk pembelajaran modern
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Bergabunglah dengan Kami
            </h2>
            <p className="text-xl mb-8 text-primary-50">
              Daftarkan putra-putri Anda di Yayasan Fathus Salafi
            </p>
            <Link href="/ppdb">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Daftar PPDB Sekarang
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
