'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'

interface GalleryImage {
  id: string
  title: string
  description: string | null
  image_url: string
  category: string | null
}

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('galleries')
        .select('id, title, description, image_url, category')
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error

      setGalleryImages(data || [])
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Memuat galeri...</p>
          </div>
        </div>
      </section>
    )
  }

  if (galleryImages.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              Galeri Foto
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Dokumentasi Kegiatan
            </h2>
          </div>
          <div className="text-center py-12 bg-white rounded-2xl">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">Belum ada foto yang diupload</p>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
            Galeri Foto
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Dokumentasi Kegiatan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Foto-foto kegiatan dan momen berharga di Yayasan Fathus Salafi
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[4/3] cursor-pointer hover:-translate-y-2"
            >
              {/* Image */}
              <img 
                src={image.image_url} 
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* View Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="/galeri"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-800 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 shadow-md"
          >
            <span>Lihat Semua Galeri</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
