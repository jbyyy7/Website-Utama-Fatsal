'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'

interface Registration {
  registration_number: string
  academic_year: string
  student_name: string
  parent_email: string
  status: 'pending' | 'verified' | 'accepted' | 'rejected' | 'cancelled'
  created_at: string
  verified_at: string | null
  rejection_reason: string | null
  school: {
    name: string
    level: string
  }
}

export default function PPDBStatusPage() {
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [email, setEmail] = useState('')
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setRegistration(null)

    try {
      const { data, error } = await supabase
        .from('ppdb_registrations')
        .select(`
          registration_number,
          academic_year,
          student_name,
          parent_email,
          status,
          created_at,
          verified_at,
          rejection_reason,
          school:schools(name, level)
        `)
        .eq('registration_number', registrationNumber.toUpperCase())
        .eq('parent_email', email)
        .single()

      if (error || !data) {
        setError('Data pendaftaran tidak ditemukan. Periksa kembali nomor registrasi dan email Anda.')
      } else {
        setRegistration(data as any)
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      verified: 'bg-blue-100 text-blue-800 border-blue-300',
      accepted: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      cancelled: 'bg-gray-100 text-gray-800 border-gray-300'
    }

    const labels = {
      pending: '⏳ Menunggu Verifikasi',
      verified: '✓ Terverifikasi',
      accepted: '🎉 Diterima',
      rejected: '✗ Ditolak',
      cancelled: '⊘ Dibatalkan'
    }

    return (
      <span className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-semibold ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Cek Status Pendaftaran
          </h1>
          <p className="text-gray-600">
            Masukkan nomor registrasi dan email untuk melihat status pendaftaran PPDB Anda
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Registrasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
                placeholder="PPDB-2025-001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Orang Tua <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mencari...' : '🔍 Cek Status'}
            </button>
          </form>
        </div>

        {/* Registration Details */}
        {registration && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Status Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Status Pendaftaran</p>
                  <h2 className="text-2xl font-bold">{registration.student_name}</h2>
                </div>
                <div>
                  {getStatusBadge(registration.status)}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
              {/* Registration Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nomor Registrasi</p>
                  <p className="font-bold text-gray-800">{registration.registration_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tahun Ajaran</p>
                  <p className="font-bold text-gray-800">{registration.academic_year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sekolah Tujuan</p>
                  <p className="font-bold text-gray-800">
                    {registration.school?.name || '-'}
                  </p>
                  <p className="text-xs text-gray-500">{registration.school?.level}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tanggal Daftar</p>
                  <p className="font-bold text-gray-800">
                    {new Date(registration.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-800 mb-4">Timeline Pendaftaran</h3>
                <div className="space-y-4">
                  {/* Submitted */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        ✓
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Pendaftaran Diterima</p>
                      <p className="text-sm text-gray-600">
                        {new Date(registration.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Verified */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        registration.verified_at ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {registration.verified_at ? '✓' : '⋯'}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Verifikasi Data</p>
                      <p className="text-sm text-gray-600">
                        {registration.verified_at 
                          ? new Date(registration.verified_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })
                          : 'Sedang dalam proses verifikasi'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Accepted/Rejected */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        registration.status === 'accepted' ? 'bg-green-500' :
                        registration.status === 'rejected' ? 'bg-red-500' : 'bg-gray-300'
                      }`}>
                        {registration.status === 'accepted' ? '🎉' :
                         registration.status === 'rejected' ? '✗' : '⋯'}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Keputusan Akhir</p>
                      <p className="text-sm text-gray-600">
                        {registration.status === 'accepted' ? 'Selamat! Anda diterima' :
                         registration.status === 'rejected' ? 'Mohon maaf, pendaftaran ditolak' :
                         'Menunggu keputusan'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rejection Reason */}
              {registration.status === 'rejected' && registration.rejection_reason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-semibold text-red-800 mb-2">Alasan Penolakan:</p>
                  <p className="text-sm text-red-700">{registration.rejection_reason}</p>
                </div>
              )}

              {/* Next Steps */}
              {registration.status === 'accepted' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-semibold text-green-800 mb-2">🎉 Selamat!</p>
                  <p className="text-sm text-green-700 mb-3">
                    Pendaftaran Anda telah diterima. Silakan hubungi sekolah untuk informasi lebih lanjut mengenai proses selanjutnya.
                  </p>
                  <a
                    href="tel:08XXXXXXXXXX"
                    className="inline-flex items-center gap-2 text-sm text-green-700 font-semibold hover:text-green-800"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Hubungi Kami
                  </a>
                </div>
              )}

              {registration.status === 'pending' && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-semibold text-yellow-800 mb-2">⏳ Dalam Proses</p>
                  <p className="text-sm text-yellow-700">
                    Pendaftaran Anda sedang dalam proses verifikasi. Kami akan menghubungi Anda melalui email jika ada informasi lebih lanjut.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 bg-gray-50 border-t flex gap-3">
              <a
                href="/"
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Kembali ke Beranda
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
