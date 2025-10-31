interface NavbarProps {
  ppdbActive: boolean
}

export default function Navbar({ ppdbActive }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Yayasan Fathus Salafi
              </div>
              <div className="text-xs text-gray-500">Pendidikan Islami Berkualitas</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <a href="/" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 font-medium">Beranda</a>
            <a href="/sekolah" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 font-medium">Sekolah</a>
            <a href="/#berita" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 font-medium">Berita</a>
            <a href="/#galeri" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 font-medium">Galeri</a>
            {ppdbActive && (
              <>
                <a href="/ppdb" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium">Daftar PPDB</a>
                <a href="/ppdb/status" className="px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium">Cek Status</a>
              </>
            )}
            <a href="/login" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 font-medium">Login</a>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
