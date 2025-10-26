// TODO: Fetch from Supabase database
// This is demo data - will be replaced with real data from admin panel

const newsArticles = [
  {
    id: 1,
    title: 'Siswa MA Fathus Salafi Raih Juara 1 Olimpiade Sains Nasional',
    excerpt: 'Prestasi membanggakan dari siswa MA Fathus Salafi yang berhasil meraih juara 1 dalam Olimpiade Sains Nasional tingkat SMA/MA...',
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    category: 'prestasi',
    published_at: '2025-01-15',
  },
  {
    id: 2,
    title: 'Kegiatan Pesantren Kilat Ramadhan 1446 H',
    excerpt: 'Yayasan Fathus Salafi mengadakan kegiatan Pesantren Kilat selama bulan Ramadhan dengan berbagai kegiatan menarik...',
    image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    category: 'kegiatan',
    published_at: '2025-01-10',
  },
  {
    id: 3,
    title: 'Pembukaan Tahun Ajaran Baru 2024/2025',
    excerpt: 'Upacara pembukaan tahun ajaran baru 2024/2025 dilaksanakan dengan khidmat dan penuh semangat dari seluruh sivitas akademika...',
    image_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop',
    category: 'berita',
    published_at: '2024-07-15',
  },
]

export default function NewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            Berita & Prestasi
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Info Terkini
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berita, prestasi, dan kegiatan terbaru dari Yayasan Fathus Salafi
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {newsArticles.map((article) => (
            <div 
              key={article.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img 
                  src={article.image_url} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm ${
                    article.category === 'prestasi' ? 'bg-yellow-500/90' :
                    article.category === 'kegiatan' ? 'bg-green-500/90' :
                    'bg-blue-500/90'
                  }`}>
                    {article.category === 'prestasi' ? '🏆 Prestasi' :
                     article.category === 'kegiatan' ? '📅 Kegiatan' :
                     '📰 Berita'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <a 
                  href={`/berita/${article.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group/link"
                >
                  <span>Baca Selengkapnya</span>
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="/berita"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span>Lihat Semua Berita</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
