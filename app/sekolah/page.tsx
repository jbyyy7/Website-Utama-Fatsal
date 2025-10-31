import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

interface School {
  id: string
  name: string
  level: string
  description: string | null
  address: string | null
  phone: string | null
  email: string | null
}

export default async function SekolahPage() {
  const supabase = await createClient()
  
  const { data: schools, error } = await supabase
    .from('schools')
    .select('*')
    .order('level', { ascending: true })

  const getColorClass = (level: string) => {
    switch(level.toUpperCase()) {
      case 'RA':
      case 'TK':
        return {
          bg: 'from-pink-500 to-rose-500',
          text: 'text-pink-600',
          lightBg: 'bg-pink-50',
          border: 'border-pink-200'
        }
      case 'MI':
        return {
          bg: 'from-green-500 to-emerald-500',
          text: 'text-green-600',
          lightBg: 'bg-green-50',
          border: 'border-green-200'
        }
      case 'MTS':
        return {
          bg: 'from-blue-500 to-cyan-500',
          text: 'text-blue-600',
          lightBg: 'bg-blue-50',
          border: 'border-blue-200'
        }
      case 'MA':
        return {
          bg: 'from-indigo-500 to-blue-500',
          text: 'text-indigo-600',
          lightBg: 'bg-indigo-50',
          border: 'border-indigo-200'
        }
      default:
        return {
          bg: 'from-gray-500 to-slate-500',
          text: 'text-gray-600',
          lightBg: 'bg-gray-50',
          border: 'border-gray-200'
        }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTEyIDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Beranda
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Lembaga Pendidikan Kami
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Pendidikan Islam terpadu dari RA hingga MA dengan fasilitas modern dan tenaga pendidik profesional
            </p>
          </div>
        </div>
      </section>

      {/* Schools List */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">Gagal memuat data sekolah</p>
            </div>
          )}

          {!schools || schools.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏫</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada data sekolah</h3>
              <p className="text-gray-600">Data sekolah sedang dalam proses penambahan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {schools.map((school) => {
                const colors = getColorClass(school.level)
                
                return (
                  <Link
                    key={school.id}
                    href={`/sekolah/${school.level.toLowerCase()}`}
                    className="group"
                  >
                    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${colors.border} hover:scale-105`}>
                      {/* Header */}
                      <div className={`bg-gradient-to-r ${colors.bg} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTEyIDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
                        
                        <div className="relative z-10">
                          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-2">
                            {school.level}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{school.name}</h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {school.description && (
                          <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                            {school.description}
                          </p>
                        )}

                        <div className="space-y-3 mb-4">
                          {school.address && (
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="line-clamp-2">{school.address}</span>
                            </div>
                          )}

                          {school.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span>{school.phone}</span>
                            </div>
                          )}

                          {school.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="truncate">{school.email}</span>
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <div className={`mt-4 pt-4 border-t ${colors.border}`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-semibold ${colors.text}`}>
                              Lihat Detail
                            </span>
                            <svg className={`w-5 h-5 ${colors.text} group-hover:translate-x-2 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-3xl mx-auto border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Tertarik Bergabung?
              </h3>
              <p className="text-gray-600 mb-6">
                Daftarkan putra-putri Anda sekarang dan berikan mereka pendidikan Islam berkualitas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/ppdb"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                >
                  Daftar PPDB
                </Link>
                <Link 
                  href="/ppdb/status"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
                >
                  Cek Status Pendaftaran
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
