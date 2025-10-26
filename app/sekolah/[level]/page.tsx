import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

interface SchoolDetailProps {
  params: {
    level: string
  }
}

export default async function SchoolDetailPage({ params }: SchoolDetailProps) {
  const supabase = await createClient()
  
  // Fetch school by level
  const { data: school, error } = await supabase
    .from('schools')
    .select('*')
    .ilike('level', params.level)
    .single()

  if (error || !school) {
    notFound()
  }

  // Color mapping
  const getColorClass = (level: string) => {
    switch(level.toUpperCase()) {
      case 'RA':
      case 'TK':
        return {
          bg: 'from-pink-500 to-rose-500',
          text: 'text-pink-600',
          lightBg: 'bg-pink-50'
        }
      case 'MI':
        return {
          bg: 'from-green-500 to-emerald-500',
          text: 'text-green-600',
          lightBg: 'bg-green-50'
        }
      case 'MTS':
        return {
          bg: 'from-blue-500 to-cyan-500',
          text: 'text-blue-600',
          lightBg: 'bg-blue-50'
        }
      case 'MA':
        return {
          bg: 'from-indigo-500 to-blue-500',
          text: 'text-indigo-600',
          lightBg: 'bg-indigo-50'
        }
      default:
        return {
          bg: 'from-gray-500 to-slate-500',
          text: 'text-gray-600',
          lightBg: 'bg-gray-50'
        }
    }
  }

  const colors = getColorClass(school.level)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className={`relative py-20 bg-gradient-to-r ${colors.bg} text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTEyIDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <a 
            href="/#sekolah" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Daftar Sekolah
          </a>

          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              {school.level}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {school.name}
            </h1>
            {school.description && (
              <p className="text-xl text-white/90 leading-relaxed">
                {school.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tentang Sekolah */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tentang {school.name}</h2>
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {school.description || `${school.name} adalah lembaga pendidikan Islam berkualitas yang berkomitmen memberikan pendidikan terbaik untuk generasi Muslim yang cerdas, berakhlak mulia, dan berwawasan global.`}
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Keunggulan Kami</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Kurikulum terintegrasi antara pendidikan umum dan pendidikan agama</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Tenaga pendidik profesional dan berpengalaman</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Fasilitas modern dan mendukung pembelajaran</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Pembentukan karakter Islami yang kuat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Program tahfidz dan bahasa Arab</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA Section */}
              <div className={`${colors.lightBg} rounded-2xl p-8 border-2 border-dashed ${colors.text} border-opacity-30`}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Siap Bergabung dengan Kami?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Daftarkan putra-putri Anda sekarang dan berikan mereka pendidikan terbaik
                  </p>
                  <a 
                    href="/ppdb"
                    className={`inline-block px-8 py-4 bg-gradient-to-r ${colors.bg} text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105`}
                  >
                    Daftar PPDB Sekarang
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Kontak</h3>
                <div className="space-y-4">
                  {school.address && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Alamat</div>
                        <div className="text-sm text-gray-800">{school.address}</div>
                      </div>
                    </div>
                  )}
                  
                  {school.phone && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Telepon</div>
                        <a href={`tel:${school.phone}`} className="text-sm text-blue-600 hover:underline">
                          {school.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {school.email && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Email</div>
                        <a href={`mailto:${school.email}`} className="text-sm text-blue-600 hover:underline break-all">
                          {school.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {school.website && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Website</div>
                        <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
                          {school.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Link Berguna</h3>
                <div className="space-y-2">
                  <a href="/ppdb" className="block p-3 hover:bg-gray-50 rounded-lg transition text-sm text-gray-700 hover:text-blue-600">
                    📝 Pendaftaran Siswa Baru
                  </a>
                  <a href="/ppdb/status" className="block p-3 hover:bg-gray-50 rounded-lg transition text-sm text-gray-700 hover:text-blue-600">
                    📊 Cek Status Pendaftaran
                  </a>
                  <a href="/#berita" className="block p-3 hover:bg-gray-50 rounded-lg transition text-sm text-gray-700 hover:text-blue-600">
                    📰 Berita & Prestasi
                  </a>
                  <a href="/#galeri" className="block p-3 hover:bg-gray-50 rounded-lg transition text-sm text-gray-700 hover:text-blue-600">
                    📷 Galeri Kegiatan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
