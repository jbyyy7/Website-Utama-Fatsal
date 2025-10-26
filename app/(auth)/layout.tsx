export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary-600">
            Yayasan Fathus Salafi
          </h1>
          <p className="text-gray-600 mt-2">Pendidikan Islami Berkualitas</p>
        </div>
        
        {children}
      </div>
    </div>
  )
}
