'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'

interface PPDBSettings {
  id?: string
  isActive: boolean
  academicYear: string
  startDate: string
  endDate: string
  registrationLink: string
  maxStudents: number
}

export default function PPDBSettingsPage() {
  const supabase = createClient()
  const [ppdbSettings, setPpdbSettings] = useState<PPDBSettings>({
    isActive: true,
    academicYear: '2024/2025',
    startDate: '2024-11-01',
    endDate: '2025-07-31',
    registrationLink: '/ppdb',
    maxStudents: 500
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Fetch PPDB settings on mount
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('ppdb_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) throw error

      if (data) {
        setPpdbSettings({
          id: data.id,
          isActive: data.is_active,
          academicYear: data.academic_year,
          startDate: data.start_date,
          endDate: data.end_date,
          registrationLink: data.registration_link || '/ppdb',
          maxStudents: data.max_students
        })
      }
    } catch (error) {
      console.error('Error fetching PPDB settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async () => {
    const newStatus = !ppdbSettings.isActive
    setPpdbSettings(prev => ({ ...prev, isActive: newStatus }))
    
    try {
      const { error } = await supabase
        .from('ppdb_settings')
        .update({ is_active: newStatus })
        .eq('id', ppdbSettings.id)

      if (error) throw error
      
      setMessage(`PPDB ${newStatus ? 'diaktifkan' : 'dinonaktifkan'} ✓`)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error toggling PPDB:', error)
      setPpdbSettings(prev => ({ ...prev, isActive: !newStatus })) // Revert on error
      alert('Gagal mengubah status PPDB')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('ppdb_settings')
        .update({
          academic_year: ppdbSettings.academicYear,
          start_date: ppdbSettings.startDate,
          end_date: ppdbSettings.endDate,
          registration_link: ppdbSettings.registrationLink,
          max_students: ppdbSettings.maxStudents
        })
        .eq('id', ppdbSettings.id)

      if (error) throw error

      setMessage('✓ Pengaturan berhasil disimpan!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error saving PPDB settings:', error)
      alert('Gagal menyimpan pengaturan')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pengaturan PPDB</h1>
          <p className="text-gray-500 mt-1">Kelola pendaftaran siswa baru</p>
        </div>
        
        <div className="flex items-center gap-4">
          {message && (
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium animate-pulse">
              {message}
            </div>
          )}
          {/* Status Badge */}
          <div className={`px-4 py-2 rounded-full font-semibold ${ppdbSettings.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {ppdbSettings.isActive ? '🟢 PPDB Aktif' : '🔴 PPDB Nonaktif'}
          </div>
        </div>
      </div>

      {/* Main Toggle Card */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Status PPDB {ppdbSettings.academicYear}</h2>
            <p className="text-blue-100">
              {ppdbSettings.isActive 
                ? 'Pendaftaran sedang dibuka. Tombol PPDB ditampilkan di website.'
                : 'Pendaftaran ditutup. Tombol PPDB disembunyikan dari website.'
              }
            </p>
          </div>
          
          {/* Toggle Switch */}
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-16 w-32 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
              ppdbSettings.isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}
          >
            <span
              className={`inline-block h-12 w-12 transform rounded-full bg-white shadow-lg transition-transform ${
                ppdbSettings.isActive ? 'translate-x-16' : 'translate-x-2'
              }`}
            >
              <span className="flex h-full w-full items-center justify-center">
                {ppdbSettings.isActive ? (
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Detail Pengaturan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Year */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tahun Ajaran
            </label>
            <input
              type="text"
              value={ppdbSettings.academicYear}
              onChange={(e) => setPpdbSettings(prev => ({ ...prev, academicYear: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="2024/2025"
            />
          </div>

          {/* Max Students */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kuota Maksimal Siswa
            </label>
            <input
              type="number"
              value={ppdbSettings.maxStudents}
              onChange={(e) => setPpdbSettings(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="500"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal Mulai Pendaftaran
            </label>
            <input
              type="date"
              value={ppdbSettings.startDate}
              onChange={(e) => setPpdbSettings(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal Akhir Pendaftaran
            </label>
            <input
              type="date"
              value={ppdbSettings.endDate}
              onChange={(e) => setPpdbSettings(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Registration Link */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Link Pendaftaran
            </label>
            <input
              type="text"
              value={ppdbSettings.registrationLink}
              onChange={(e) => setPpdbSettings(prev => ({ ...prev, registrationLink: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="/ppdb atau https://..."
            />
            <p className="text-sm text-gray-500 mt-2">
              URL halaman pendaftaran (bisa relatif atau absolute)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  <>💾 Simpan Perubahan</>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => fetchSettings()}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                ↩️ Reset
              </button>          <a
            href="/"
            target="_blank"
            className="ml-auto px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors"
          >
            👁️ Preview Website
          </a>
        </div>
      </form>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-bold text-gray-800">Status Toggle</h4>
          </div>
          <p className="text-sm text-gray-600">
            Toggle PPDB untuk menampilkan/menyembunyikan tombol pendaftaran di homepage dan navbar.
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-bold text-gray-800">Real-time Update</h4>
          </div>
          <p className="text-sm text-gray-600">
            Perubahan langsung terlihat di website tanpa perlu rebuild atau deploy ulang.
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-bold text-gray-800">Penjadwalan</h4>
          </div>
          <p className="text-sm text-gray-600">
            Set tanggal mulai dan akhir pendaftaran untuk periode PPDB yang terkontrol.
          </p>
        </div>
      </div>
    </div>
  )
}
