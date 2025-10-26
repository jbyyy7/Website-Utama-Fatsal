'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function PPDBSuccessContent() {
  const searchParams = useSearchParams()
  const registrationNumber = searchParams.get('registration')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (registrationNumber) {
      navigator.clipboard.writeText(registrationNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-8 text-center text-white">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Pendaftaran Berhasil! 🎉</h1>
          <p className="text-green-100">
            Terima kasih telah mendaftar di Yayasan Fathus Salafi
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Registration Number */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2 text-center">Nomor Registrasi Anda</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-blue-600 tracking-wider">
                {registrationNumber || 'PPDB-XXXX-XXX'}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-blue-100 rounded-lg transition"
                title="Copy nomor registrasi"
              >
                {copied ? (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-3">
              💡 Simpan nomor ini untuk cek status pendaftaran
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 mb-6">
            <h2 className="font-bold text-gray-800 text-lg mb-4">Langkah Selanjutnya:</h2>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Cek Email Anda</h3>
                <p className="text-sm text-gray-600">
                  Kami telah mengirim konfirmasi pendaftaran ke email yang Anda daftarkan.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Menunggu Verifikasi</h3>
                <p className="text-sm text-gray-600">
                  Tim kami akan memverifikasi data Anda dalam 1-3 hari kerja.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Pantau Status</h3>
                <p className="text-sm text-gray-600">
                  Anda bisa cek status pendaftaran kapan saja dengan nomor registrasi Anda.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`/ppdb/status?registration=${registrationNumber}`}
              className="flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition"
            >
              📊 Cek Status Pendaftaran
            </a>
            <a
              href="/"
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-50 transition"
            >
              🏠 Kembali ke Beranda
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Pertanyaan? Hubungi kami di <br/>
              <strong className="text-gray-800">📞 08XX-XXXX-XXXX</strong> atau{' '}
              <strong className="text-gray-800">📧 ppdb@fathussalafi.sch.id</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PPDBSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PPDBSuccessContent />
    </Suspense>
  )
}
