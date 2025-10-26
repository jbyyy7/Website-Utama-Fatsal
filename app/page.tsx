export default function HomePage() {
  // TODO: Fetch from Supabase - managed by admin
  const ppdbActive = true // Will be from database
  const academicYear = "2024/2025"
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Navbar with Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Yayasan Fathus Salafi
                </div>
                <div className="text-xs text-gray-500">Pendidikan Islami Berkualitas</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <a href="/" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 font-medium">Beranda</a>
              <a href="/tentang" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 font-medium">Tentang</a>
              <a href="/berita" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 font-medium">Berita</a>
              {ppdbActive && (
                <a href="/ppdb" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium">PPDB</a>
              )}
              <a href="/login" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 font-medium">Login</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {ppdbActive && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Pendaftaran PPDB {academicYear} Dibuka</span>
              </div>
            )}

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Yayasan<br/>
              <span className="bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 bg-clip-text text-transparent">
                Fathus Salafi
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-100 font-medium">
              Pendidikan Islam Berkualitas untuk Generasi Rabbani
            </p>
            
            <p className="text-lg mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
              Menyelenggarakan pendidikan Islam terpadu dari RA hingga MA dengan kurikulum berkualitas 
              yang memadukan ilmu agama dan umum
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {ppdbActive && (
                <a 
                  href="/ppdb" 
                  className="group relative px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Daftar PPDB {academicYear}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              )}
              
              <a 
                href="/tentang" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Tentang Kami
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold mb-1">5</div>
                <div className="text-sm text-white/80">Lembaga Pendidikan</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold mb-1">1000+</div>
                <div className="text-sm text-white/80">Siswa Aktif</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold mb-1">100+</div>
                <div className="text-sm text-white/80">Tenaga Pendidik</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)"/>
          </svg>
        </div>
      </section>

