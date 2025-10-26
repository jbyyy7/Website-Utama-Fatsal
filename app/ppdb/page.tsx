'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

interface FormData {
  // School Selection
  school_id: string
  
  // Student Data
  student_name: string
  student_nisn: string
  place_of_birth: string
  date_of_birth: string
  gender: 'L' | 'P' | ''
  religion: string
  address: string
  phone_number: string
  
  // Parent Data
  parent_name: string
  parent_phone: string
  parent_email: string
  parent_occupation: string
  
  // Previous School
  previous_school_name: string
  previous_school_address: string
}

interface School {
  id: string
  name: string
  level: string
}

export default function PPDBPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [schools, setSchools] = useState<School[]>([])
  const [ppdbSettings, setPpdbSettings] = useState<any>(null)
  
  const [formData, setFormData] = useState<FormData>({
    school_id: '',
    student_name: '',
    student_nisn: '',
    place_of_birth: '',
    date_of_birth: '',
    gender: '',
    religion: '',
    address: '',
    phone_number: '',
    parent_name: '',
    parent_phone: '',
    parent_email: '',
    parent_occupation: '',
    previous_school_name: '',
    previous_school_address: '',
  })

  // Fetch schools dan PPDB settings saat component mount
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [schoolsRes, ppdbRes] = await Promise.all([
        supabase.from('schools').select('id, name, level').order('level'),
        supabase.from('ppdb_settings').select('*').eq('is_active', true).single()
      ])

      if (schoolsRes.data) setSchools(schoolsRes.data)
      if (ppdbRes.data) setPpdbSettings(ppdbRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate registration number
      const year = ppdbSettings?.academic_year?.split('/')[0] || new Date().getFullYear()
      
      // Get next number
      const { count } = await supabase
        .from('ppdb_registrations')
        .select('*', { count: 'exact', head: true })
        .like('registration_number', `PPDB-${year}-%`)

      const nextNumber = (count || 0) + 1
      const registrationNumber = `PPDB-${year}-${String(nextNumber).padStart(3, '0')}`

      // Insert registration
      const { data, error } = await supabase
        .from('ppdb_registrations')
        .insert([{
          registration_number: registrationNumber,
          academic_year: ppdbSettings?.academic_year || `${year}/${parseInt(year) + 1}`,
          ...formData,
          status: 'pending'
        }])
        .select()
        .single()

      if (error) throw error

      // Success - redirect ke success page
      alert(`Pendaftaran berhasil! Nomor registrasi Anda: ${registrationNumber}`)
      router.push(`/ppdb/success?registration=${registrationNumber}`)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  // Check if PPDB is active
  if (ppdbSettings && !ppdbSettings.is_active) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">PPDB Belum Dibuka</h1>
          <p className="text-gray-600 mb-6">
            Pendaftaran Peserta Didik Baru untuk tahun ajaran {ppdbSettings?.academic_year || 'ini'} belum dibuka.
          </p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Formulir Pendaftaran PPDB
          </h1>
          <p className="text-gray-600">
            Tahun Ajaran {ppdbSettings?.academic_year || '-'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-16 md:w-24 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mx-auto mt-2 text-xs md:text-sm text-gray-600">
            <span>Pilih Sekolah</span>
            <span>Data Siswa</span>
            <span>Data Orang Tua</span>
            <span>Sekolah Asal</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: School Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pilih Sekolah Tujuan</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schools.map((school) => (
                    <label
                      key={school.id}
                      className={`relative flex items-center p-6 border-2 rounded-xl cursor-pointer transition ${
                        formData.school_id === school.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="school_id"
                        value={school.id}
                        checked={formData.school_id === school.id}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500 mb-1">
                          {school.level}
                        </div>
                        <div className="text-lg font-bold text-gray-800">
                          {school.name}
                        </div>
                      </div>
                      {formData.school_id === school.id && (
                        <div className="text-blue-600">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Student Data */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Calon Siswa</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="student_name"
                      value={formData.student_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NISN (Opsional)
                    </label>
                    <input
                      type="text"
                      name="student_nisn"
                      value={formData.student_nisn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10 digit NISN"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="place_of_birth"
                      value={formData.place_of_birth}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Kota kelahiran"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agama <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No. Telepon/HP (Opsional)
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Lengkap <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Parent Data */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Orang Tua / Wali</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap Orang Tua/Wali <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="parent_name"
                      value={formData.parent_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nama lengkap orang tua/wali"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No. Telepon/HP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="parent_phone"
                      value={formData.parent_phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="parent_email"
                      value={formData.parent_email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pekerjaan (Opsional)
                    </label>
                    <input
                      type="text"
                      name="parent_occupation"
                      value={formData.parent_occupation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Pekerjaan orang tua/wali"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Previous School */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Sekolah Asal</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Sekolah Asal (Opsional)
                    </label>
                    <input
                      type="text"
                      name="previous_school_name"
                      value={formData.previous_school_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nama sekolah sebelumnya"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Sekolah Asal (Opsional)
                    </label>
                    <textarea
                      name="previous_school_address"
                      value={formData.previous_school_address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Alamat lengkap sekolah asal"
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-4">
                    <h3 className="font-bold text-gray-800 mb-4">Ringkasan Pendaftaran</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sekolah Tujuan:</span>
                        <span className="font-semibold">
                          {schools.find(s => s.id === formData.school_id)?.name || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nama Siswa:</span>
                        <span className="font-semibold">{formData.student_name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email Orang Tua:</span>
                        <span className="font-semibold">{formData.parent_email || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  ← Sebelumnya
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Selanjutnya →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Mengirim...' : '✓ Kirim Pendaftaran'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Butuh bantuan? Hubungi kami di <strong>{ppdbSettings?.contact_phone || '08XX-XXXX-XXXX'}</strong></p>
        </div>
      </div>
    </div>
  )
}
