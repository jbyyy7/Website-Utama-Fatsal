'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'

interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  image_url: string | null
  category: 'berita' | 'prestasi' | 'kegiatan'
  published_at: string
}

export default function NewsSection() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('id, title, slug, excerpt, image_url, category, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3)

      if (error) throw error

      setNewsArticles(data || [])
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Memuat berita...</p>
          </div>
        </div>
      </section>
    )
  }

  if (newsArticles.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Berita & Prestasi
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Info Terkini
            </h2>
          </div>
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-gray-500">Belum ada berita yang dipublikasikan</p>
          </div>
        </div>
      </section>
    )
  }
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
                  src={article.image_url || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop'} 
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
