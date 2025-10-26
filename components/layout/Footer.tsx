import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-4">
              Yayasan Fathus Salafi
            </h3>
            <p className="text-sm text-gray-400">
              Lembaga pendidikan Islam yang menyelenggarakan pendidikan berkualitas 
              dari tingkat TK hingga MA dengan kurikulum terpadu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Link Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tentang" className="hover:text-primary-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/sekolah" className="hover:text-primary-400 transition-colors">
                  Sekolah
                </Link>
              </li>
              <li>
                <Link href="/ppdb" className="hover:text-primary-400 transition-colors">
                  PPDB
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-primary-400 transition-colors">
                  Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Systems */}
          <div>
            <h3 className="text-white font-semibold mb-4">Sistem</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://siakad.yayasan-fatsal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  SIAKAD
                </a>
              </li>
              <li>
                <a 
                  href="https://lms.yayasan-fatsal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  Learning Management System
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">
                  Jl. Contoh No. 123, Kota
                </span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@yayasan-fatsal.com" className="text-gray-400 hover:text-primary-400">
                  info@yayasan-fatsal.com
                </a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">
                  (021) 1234-5678
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>
            © {currentYear} Yayasan Fathus Salafi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
