'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'

interface NewsArticle {
  id: string
  title: string
  category: string
  author_id?: string
  created_at: string
  is_published: boolean
  views: number
}

export default function NewsManagementPage() {
  const supabase = createClient()
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNews(data || [])
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id)

      if (error) throw error

      setNews(news.filter(item => item.id !== id))
      alert('Berita berhasil dihapus!')
    } catch (error) {
      console.error('Error deleting news:', error)
      alert('Gagal menghapus berita')
    }
  }

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ 
          is_published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', id)

      if (error) throw error

      setNews(news.map(item => 
        item.id === id 
          ? { ...item, is_published: !currentStatus }
          : item
      ))
    } catch (error) {
      console.error('Error toggling publish:', error)
      alert('Gagal mengubah status publish')
    }
  }

  const filteredNews = filter === 'all' 
    ? news 
    : news.filter(item => item.category === filter)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getCategoryBadge = (category: string) => {
    const styles = {
      prestasi: 'bg-yellow-100 text-yellow-700',
      kegiatan: 'bg-green-100 text-green-700',
      berita: 'bg-blue-100 text-blue-700'
    }
    return styles[category as keyof typeof styles] || 'bg-gray-100 text-gray-700'
  }

  const getStatusBadge = (status: string) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-700'
      : 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Berita & Prestasi</h1>
          <p className="text-gray-500 mt-1">Tambah, edit, dan kelola konten berita</p>
        </div>
        
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Berita Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-800">{news.length}</div>
          <div className="text-sm text-gray-500">Total Berita</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="text-2xl font-bold text-green-700">
            {news.filter(n => n.is_published).length}
          </div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
          <div className="text-2xl font-bold text-yellow-700">
            {news.filter(n => !n.is_published).length}
          </div>
          <div className="text-sm text-gray-600">Draft</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="text-2xl font-bold text-blue-700">
            {news.reduce((sum, n) => sum + (n.views || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-semibold text-gray-700">Filter:</span>
          {['all', 'berita', 'prestasi', 'kegiatan'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Judul
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-500">ID: {item.id.substring(0, 8)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadge(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(item.created_at).toLocaleDateString('id-ID', { 
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(item.id, item.is_published)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.is_published ? 'published' : 'draft')}`}
                    >
                      {item.is_published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {item.views || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => togglePublish(item.id, item.is_published)}
                        className={`p-2 rounded-lg transition-colors ${item.is_published ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`}
                        title={item.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {item.is_published ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
