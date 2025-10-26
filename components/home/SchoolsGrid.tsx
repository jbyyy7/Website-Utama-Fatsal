'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'

interface School {
  id: string
  name: string
  level: 'MA' | 'MTs' | 'MI' | 'RA' | 'TK'
  address: string | null
}

// Icon mapping based on school level
const getSchoolIcon = (level: string) => {
  switch(level) {
    case 'RA':
    case 'TK':
      return (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'MI':
      return (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    case 'MTs':
      return (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    case 'MA':
      return (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    default:
      return null
  }
}

// Color mapping based on school level
const getSchoolColor = (level: string) => {
  switch(level) {
    case 'RA':
    case 'TK':
      return 'from-pink-500 to-rose-500'
    case 'MI':
      return 'from-green-500 to-emerald-500'
    case 'MTs':
      return 'from-blue-500 to-cyan-500'
    case 'MA':
      return 'from-indigo-500 to-blue-500'
    default:
      return 'from-gray-500 to-slate-500'
  }
}

// Description based on school level
const getSchoolDescription = (level: string, name: string) => {
  switch(level) {
    case 'RA':
    case 'TK':
      return 'Raudhatul Athfal dengan pembelajaran bermain sambil belajar yang menyenangkan dan Islami'
    case 'MI':
      return 'Madrasah Ibtidaiyah setara SD dengan penguatan Al-Qur\'an dan Bahasa Arab'
    case 'MTs':
      return name.toLowerCase().includes('putra') 
        ? 'Madrasah Tsanawiyah khusus putra dengan pendidikan karakter islami'
        : name.toLowerCase().includes('putri')
        ? 'Madrasah Tsanawiyah khusus putri dengan pendidikan akhlak muslimah'
        : 'Madrasah Tsanawiyah dengan pendidikan karakter islami yang kuat'
    case 'MA':
      return 'Madrasah Aliyah dengan penjurusan IPA, IPS, dan Keagamaan'
    default:
      return 'Lembaga pendidikan Islam berkualitas'
  }
}

// Features based on school level
const getSchoolFeatures = (level: string, name: string) => {
  switch(level) {
    case 'RA':
    case 'TK':
      return ['Usia 4-6 Tahun', 'Kurikulum Berbasis Karakter', 'Bermain Sambil Belajar']
    case 'MI':
      return ['Tahfidz Al-Qur\'an', 'Bahasa Arab & Inggris', 'Sains & Matematika']
    case 'MTs':
      return name.toLowerCase().includes('putra')
        ? ['Khusus Putra', 'Kitab Kuning & Fiqih', 'Kurikulum Merdeka']
        : name.toLowerCase().includes('putri')
        ? ['Khusus Putri', 'Akhlak Muslimah', 'Pengembangan Bakat']
        : ['Kitab Kuning & Fiqih', 'Kurikulum Merdeka', 'Pengembangan Karakter']
    case 'MA':
      return ['Penjurusan IPA/IPS/Keagamaan', 'Persiapan PTN/PTKIN', 'Kepemimpinan & Organisasi']
    default:
      return ['Pendidikan Berkualitas', 'Fasilitas Modern', 'Tenaga Profesional']
  }
}

export default function SchoolsGrid() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('level', { ascending: true })

      if (error) throw error

      setSchools(data || [])
    } catch (error) {
      console.error('Error fetching schools:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 relative bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Memuat data sekolah...</p>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-20 relative bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Lembaga Pendidikan
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Lembaga Pendidikan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pendidikan Islam terpadu dari RA hingga MA dengan fasilitas modern dan tenaga pendidik profesional
          </p>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {schools.map((school, index) => {
            const color = getSchoolColor(school.level)
            const icon = getSchoolIcon(school.level)
            const description = getSchoolDescription(school.level, school.name)
            const features = getSchoolFeatures(school.level, school.name)

            return (
              <div 
                key={school.id}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2`}
              >
                {/* Top Color Bar */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${color}`}></div>
                
                <div className="p-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {icon}
                  </div>

                  {/* School Name */}
                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {school.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Address (if available) */}
                  {school.address && (
                    <div className="flex items-start gap-2 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="leading-relaxed">{school.address}</span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <a 
                    href={`/sekolah/${school.level.toLowerCase()}`}
                    className={`block w-full text-center px-4 py-2.5 bg-gradient-to-r ${color} text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    Lihat Detail
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
