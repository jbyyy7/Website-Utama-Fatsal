interface PPDBBannerProps {
  isActive: boolean
  academicYear: string
}

export default function PPDBBanner({ isActive, academicYear }: PPDBBannerProps) {
  // Jika PPDB tidak aktif (diatur oleh admin), component ini tidak render
  if (!isActive) return null

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">Pendaftaran Terbuka!</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Siap Bergabung dengan<br/>
            <span className="bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 bg-clip-text text-transparent">
              Keluarga Besar Fathus Salafi?
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Daftarkan putra-putri Anda sekarang dan berikan mereka pendidikan Islam berkualitas 
            untuk masa depan yang gemilang
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a 
              href="/ppdb" 
              className="group relative px-10 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Daftar PPDB {academicYear}</span>
              </span>
            </a>
            
            <a 
              href="/login" 
              className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              Cek Status Pendaftaran
            </a>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-bold mb-2">Pendaftaran Mudah</h3>
              <p className="text-sm text-white/80">Form online yang simpel dan cepat</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-bold mb-2">Proses Transparan</h3>
              <p className="text-sm text-white/80">Lacak status pendaftaran realtime</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🎓</div>
              <h3 className="font-bold mb-2">Bimbingan Lengkap</h3>
              <p className="text-sm text-white/80">Tim kami siap membantu Anda</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
