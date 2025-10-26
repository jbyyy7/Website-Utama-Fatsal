// School data - Nanti bisa di-fetch dari database
const schools = [
  {
    id: 1,
    slug: 'ra',
    name: 'RA Fathus Salafi',
    description: 'Raudhatul Athfal dengan pembelajaran bermain sambil belajar yang menyenangkan dan Islami',
    color: 'from-pink-500 to-rose-500',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ['Usia 4-6 Tahun', 'Kurikulum Berbasis Karakter', 'Bermain Sambil Belajar']
  },
  {
    id: 2,
    slug: 'mi',
    name: 'MI Fathus Salafi',
    description: 'Madrasah Ibtidaiyah setara SD dengan penguatan Al-Qur\'an dan Bahasa Arab',
    color: 'from-green-500 to-emerald-500',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    features: ['Tahfidz Al-Qur\'an', 'Bahasa Arab & Inggris', 'Sains & Matematika']
  },
  {
    id: 3,
    slug: 'mts-putra',
    name: 'MTs Putra Fathus Salafi',
    description: 'Madrasah Tsanawiyah khusus putra dengan pendidikan karakter islami',
    color: 'from-blue-500 to-cyan-500',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    features: ['Khusus Putra', 'Kitab Kuning & Fiqih', 'Kurikulum Merdeka']
  },
  {
    id: 4,
    slug: 'mts-putri',
    name: 'MTs Putri Fathus Salafi',
    description: 'Madrasah Tsanawiyah khusus putri dengan pendidikan akhlak muslimah',
    color: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    features: ['Khusus Putri', 'Akhlak Muslimah', 'Pengembangan Bakat']
  },
  {
    id: 5,
    slug: 'ma',
    name: 'MA Fathus Salafi',
    description: 'Madrasah Aliyah dengan penjurusan IPA, IPS, dan Keagamaan',
    color: 'from-indigo-500 to-blue-500',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    features: ['Penjurusan IPA/IPS/Keagamaan', 'Persiapan PTN/PTKIN', 'Kepemimpinan & Organisasi']
  }
]

export default function SchoolsGrid() {
  return (
    <section className="py-20 relative bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Lembaga Pendidikan
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            5 Lembaga Pendidikan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pendidikan Islam terpadu dari RA hingga MA dengan fasilitas modern dan tenaga pendidik profesional
          </p>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {schools.map((school) => (
            <div 
              key={school.id}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2 ${school.id === 5 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Top Color Bar */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${school.color}`}></div>
              
              <div className="p-6">
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${school.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {school.icon}
                </div>

                {/* School Name */}
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {school.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {school.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {school.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a 
                  href={`/sekolah/${school.slug}`}
                  className={`block w-full text-center px-4 py-2.5 bg-gradient-to-r ${school.color} text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  Lihat Detail
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
