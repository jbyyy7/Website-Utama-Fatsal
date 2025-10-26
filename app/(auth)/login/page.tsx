export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Yayasan Fathus Salafi
          </h1>
          <p className="text-gray-600 mt-2">Pendidikan Islami Berkualitas</p>
        </div>
        
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
            <p className="text-sm text-gray-500 mt-1">
              Masukkan email dan password Anda untuk mengakses sistem
            </p>
          </div>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Login
            </button>

            {/* Link to PPDB */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <p>
                Belum punya akun?{' '}
                <a href="/ppdb" className="text-blue-600 hover:text-blue-700 font-medium">
                  Daftar PPDB
                </a>
              </p>
            </div>
          </form>

          {/* Note */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Login menggunakan akun yang terdaftar di sistem SIAKAD atau LMS
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-gray-600 hover:text-blue-600">
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  )
}

