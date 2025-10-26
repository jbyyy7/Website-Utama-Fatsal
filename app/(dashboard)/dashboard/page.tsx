'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'

interface Stats {
  totalNews: number
  totalGalleries: number
  totalSchools: number
  ppdbStatus: {
    isActive: boolean
    academicYear: string
  }
}

interface RecentNews {
  id: string
  title: string
  published_at: string
  status: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalNews: 0,
    totalGalleries: 0,
    totalSchools: 0,
    ppdbStatus: { isActive: false, academicYear: '-' }
  })
  const [recentNews, setRecentNews] = useState<RecentNews[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats in parallel
      const [newsCount, galleriesCount, schoolsCount, ppdbSettings, latestNews] = await Promise.all([
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('galleries').select('id', { count: 'exact', head: true }),
        supabase.from('schools').select('id', { count: 'exact', head: true }),
        supabase.from('ppdb_settings').select('*').eq('is_active', true).single(),
        supabase.from('news').select('id, title, published_at, status').order('created_at', { ascending: false }).limit(3)
      ])

      setStats({
        totalNews: newsCount.count || 0,
        totalGalleries: galleriesCount.count || 0,
        totalSchools: schoolsCount.count || 0,
        ppdbStatus: {
          isActive: ppdbSettings.data?.is_active || false,
          academicYear: ppdbSettings.data?.academic_year || '-'
        }
      })

      setRecentNews(latestNews.data || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat data dashboard...</p>
        </div>
      </div>
    )
  }

  const statsData = [
    {
      title: 'Total Berita',
      value: stats.totalNews.toString(),
      change: `${stats.totalNews} artikel`,
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      bg: 'bg-blue-50',
      trend: 'up'
    },
    {
      title: 'Foto Galeri',
      value: stats.totalGalleries.toString(),
      change: `${stats.totalGalleries} foto`,
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bg: 'bg-green-50',
      trend: 'up'
    },
    {
      title: 'Total Sekolah',
      value: stats.totalSchools.toString(),
      change: 'Semua aktif',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      bg: 'bg-purple-50',
      trend: 'stable'
    },
    {
      title: 'PPDB Status',
      value: stats.ppdbStatus.isActive ? 'AKTIF' : 'NONAKTIF',
      change: stats.ppdbStatus.academicYear,
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      bg: 'bg-orange-50',
      trend: 'active'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Selamat Datang, Admin! 👋</h2>
        <p className="text-blue-100">Kelola konten website Yayasan Fathus Salafi dengan mudah</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className={`${stat.bg} rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Berita Terbaru</h3>
            <a href="/dashboard/news" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Lihat Semua →
            </a>
          </div>
          <div className="space-y-4">
            {recentNews.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">Belum ada berita</p>
            ) : (
              recentNews.map((news, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{news.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {news.published_at ? new Date(news.published_at).toLocaleDateString('id-ID') : 'Belum dipublikasi'}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${news.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {news.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/dashboard/news"
              className="flex flex-col items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
            >
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Tambah Berita</span>
            </a>
            
            <a
              href="/dashboard/gallery"
              className="flex flex-col items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
            >
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Upload Foto</span>
            </a>
            
            <a
              href="/dashboard/ppdb"
              className="flex flex-col items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
            >
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">Setting PPDB</span>
            </a>
            
            <a
              href="/"
              target="_blank"
              className="flex flex-col items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group"
            >
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">Preview Site</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
