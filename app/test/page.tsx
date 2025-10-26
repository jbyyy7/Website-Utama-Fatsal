export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Deployment Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          Website Utama Yayasan Fathus Salafi
        </p>
        <p className="text-sm text-gray-500">
          Next.js {process.env.NEXT_PUBLIC_VERCEL_ENV || 'local'}
        </p>
        <div className="mt-6">
          <a href="/" className="text-blue-600 hover:underline">
            Go to Home Page →
          </a>
        </div>
      </div>
    </div>
  )
}
