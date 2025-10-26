'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Navbar() {
  const { user, profile, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-heading font-bold text-primary-600">
                Yayasan Fathus Salafi
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                Beranda
              </Link>
              <Link 
                href="/tentang"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                Tentang Kami
              </Link>
              <Link 
                href="/sekolah"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                Sekolah
              </Link>
              <Link 
                href="/ppdb"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                PPDB
              </Link>
              <Link 
                href="/berita"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                Berita
              </Link>
              <Link 
                href="/kontak"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                Kontak
              </Link>
              
              {/* Links to other systems */}
              <a 
                href="https://siakad.yayasan-fatsal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                SIAKAD
              </a>
              <a 
                href="https://lms.yayasan-fatsal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                LMS
              </a>
            </div>
          </div>
          
          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Halo, <span className="font-semibold">{profile?.full_name || user.email}</span>
                </span>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/ppdb">
                  <Button size="sm">
                    Daftar Sekarang
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-primary-500 py-2">
                Beranda
              </Link>
              <Link href="/tentang" className="text-gray-700 hover:text-primary-500 py-2">
                Tentang Kami
              </Link>
              <Link href="/sekolah" className="text-gray-700 hover:text-primary-500 py-2">
                Sekolah
              </Link>
              <Link href="/ppdb" className="text-gray-700 hover:text-primary-500 py-2">
                PPDB
              </Link>
              <Link href="/berita" className="text-gray-700 hover:text-primary-500 py-2">
                Berita
              </Link>
              <Link href="/kontak" className="text-gray-700 hover:text-primary-500 py-2">
                Kontak
              </Link>
              <a 
                href="https://siakad.yayasan-fatsal.com"
                className="text-gray-700 hover:text-primary-500 py-2"
              >
                SIAKAD
              </a>
              <a 
                href="https://lms.yayasan-fatsal.com"
                className="text-gray-700 hover:text-primary-500 py-2"
              >
                LMS
              </a>
              
              {user ? (
                <>
                  <Link href="/dashboard" className="pt-4">
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="pt-4">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/ppdb">
                    <Button className="w-full">
                      Daftar Sekarang
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
