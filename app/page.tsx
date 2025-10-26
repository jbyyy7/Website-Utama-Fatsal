export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
              Yayasan Fathus Salafi
            </div>
            <div className="hidden md:flex gap-6">
              <a href="/" className="text-gray-700 hover:text-blue-600">Beranda</a>
              <a href="/ppdb" className="text-gray-700 hover:text-blue-600">PPDB</a>
              <a href="/login" className="text-gray-700 hover:text-blue-600">Login</a>
              <a href="https://siakad.yayasan-fatsal.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">SIAKAD</a>
              <a href="https://lms.yayasan-fatsal.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">LMS</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Yayasan Fathus Salafi
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Pendidikan Islam Berkualitas untuk Generasi Rabbani
          </p>
          <p className="text-lg mb-10 max-w-2xl mx-auto">
            Menyelenggarakan pendidikan Islam terpadu dari TK hingga MA 
            dengan kurikulum berkualitas yang memadukan ilmu agama dan umum
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/ppdb" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Daftar PPDB 2024/2025
            </a>
            <a 
              href="/tentang" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Tentang Kami
            </a>
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sekolah Kami
            </h2>
            <p className="text-lg text-gray-600">
              Yayasan Fathus Salafi mengelola berbagai tingkat pendidikan Islam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MA */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                MA Fathus Salafi
              </h3>
              <p className="text-gray-600 mb-4">
                Madrasah Aliyah dengan program IPA, IPS, dan Keagamaan
              </p>
            </div>

            {/* MTs */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                MTs Fathus Salafi
              </h3>
              <p className="text-gray-600 mb-4">
                Madrasah Tsanawiyah dengan kurikulum terpadu
              </p>
            </div>

            {/* MI */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                MI Fathus Salafi
              </h3>
              <p className="text-gray-600 mb-4">
                Madrasah Ibtidaiyah dengan pembelajaran menyenangkan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bergabunglah dengan Kami
          </h2>
          <p className="text-xl mb-8">
            Daftarkan putra-putri Anda di Yayasan Fathus Salafi
          </p>
          <a 
            href="/ppdb" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Daftar PPDB Sekarang
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Yayasan Fathus Salafi
              </h3>
              <p className="text-sm text-gray-400">
                Lembaga pendidikan Islam yang menyelenggarakan pendidikan berkualitas 
                dari tingkat TK hingga MA dengan kurikulum terpadu.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Link Cepat</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-blue-400">Beranda</a></li>
                <li><a href="/ppdb" className="hover:text-blue-400">PPDB</a></li>
                <li><a href="/login" className="hover:text-blue-400">Login</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Sistem</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://siakad.yayasan-fatsal.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                    SIAKAD
                  </a>
                </li>
                <li>
                  <a href="https://lms.yayasan-fatsal.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                    LMS
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 Yayasan Fathus Salafi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
