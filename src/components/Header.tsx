'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/modalities', label: 'Modalities' },
  { href: '/conditions', label: 'Conditions' },
  { href: '/blog', label: 'Blog' },
  { href: '/patient-stories', label: 'Stories' },
  { href: '/faq', label: 'FAQ' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-500">RehabVet</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full bg-coral-400 px-5 py-2 text-sm font-semibold text-white hover:bg-coral-600 transition-colors"
            >
              Book Appointment
            </Link>
          </nav>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-500"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block rounded-full bg-coral-400 px-5 py-2 text-center text-base font-semibold text-white hover:bg-coral-600 mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
