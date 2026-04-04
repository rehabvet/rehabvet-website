'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from './primary-button'

type NavService = { title: string; slug: string }
type NavCondition = { title: string; slug: string; category: string }

const CATEGORY_ORDER = ['developmental', 'degenerative', 'orthopaedic', 'neurological', 'cancer']
const CATEGORY_LABELS: Record<string, string> = {
  developmental: 'Developmental',
  degenerative: 'Degenerative',
  orthopaedic: 'Orthopaedic',
  neurological: 'Neurological',
  cancer: 'Cancer',
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', hasDropdown: 'services' },
  { name: 'Modalities', href: '/modalities' },
  { name: 'Conditions', href: '/conditions', hasDropdown: 'conditions' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
]

export default function Navbar({
  services = [],
  conditions = [],
  logoUrl,
}: {
  services?: NavService[]
  conditions?: NavCondition[]
  logoUrl?: string | null
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()

  const toggleMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
    setMobileExpanded(null)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const groupedConditions = CATEGORY_ORDER
    .map((cat) => ({
      label: CATEGORY_LABELS[cat],
      items: conditions.filter((c) => c.category === cat),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <header className="sticky top-0 w-full z-50 bg-light_gray shadow-[0px_-0.25px_12.27px_0px_rgba(0,0,0,0.04),0px_-2px_98px_0px_rgba(0,0,0,0.07)]">
      <div className="container">
        <nav className="w-full mx-auto flex justify-between items-center py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logoUrl || '/logo.webp'}
              alt="RehabVet"
              width={346}
              height={72}
              priority
              className="max-w-[130px] xl:max-w-[210px] h-auto"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              const hasDropdown = link.hasDropdown

              if (hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(hasDropdown)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`d2c_nav_link flex items-center gap-1 ${isActive ? 'text-primary font-semibold' : ''}`}
                    >
                      {link.name}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {activeDropdown === 'services' && hasDropdown === 'services' && services.length > 0 && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className="w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                          <Link
                            href="/services"
                            className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-primary_shade"
                            onClick={() => setActiveDropdown(null)}
                          >
                            All Services
                          </Link>
                          <div className="my-1 border-t border-gray-100" />
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="block rounded-lg px-3 py-2 text-sm text-text_color hover:bg-primary_shade hover:text-primary"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeDropdown === 'conditions' && hasDropdown === 'conditions' && groupedConditions.length > 0 && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className="w-[480px] rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
                          <Link
                            href="/conditions"
                            className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-primary_shade mb-2"
                            onClick={() => setActiveDropdown(null)}
                          >
                            All Conditions
                          </Link>
                          <div className="grid grid-cols-2 gap-4">
                            {groupedConditions.map((group) => (
                              <div key={group.label}>
                                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                                  {group.label}
                                </p>
                                {group.items.map((c) => (
                                  <Link
                                    key={c.slug}
                                    href={`/conditions/${c.slug}`}
                                    className="block rounded-lg px-3 py-1.5 text-sm text-text_color hover:bg-primary_shade hover:text-primary"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {c.title}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`d2c_nav_link ${isActive ? 'text-primary font-semibold' : ''}`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Book Now Button */}
          <div className="hidden lg:block">
            <Button text="Book Now" href="/contact" as="link" />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white bg-primary rounded-md p-1.5">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="fixed inset-0 bg-black/20" onClick={closeMenu} />
          <div
            className={`fixed top-0 right-0 w-3/4 max-w-xs h-full bg-light_gray shadow-lg p-6 flex flex-col transform transition-transform duration-300 ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <button onClick={closeMenu} className="self-end text-dark mb-6 text-xl">
              ✕
            </button>
            <div className="flex flex-col gap-4 overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const hasDropdown = link.hasDropdown

                if (hasDropdown === 'services' && services.length > 0) {
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                        className="flex w-full items-center justify-between text-dark font-medium text-lg"
                      >
                        {link.name}
                        <svg className={`w-4 h-4 transition-transform ${mobileExpanded === 'services' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileExpanded === 'services' && (
                        <div className="ml-4 mt-2 space-y-2 border-l-2 border-primary/20 pl-3">
                          <Link href="/services" className="block text-sm font-semibold text-primary" onClick={closeMenu}>All Services</Link>
                          {services.map((s) => (
                            <Link key={s.slug} href={`/services/${s.slug}`} className="block text-sm text-text_color" onClick={closeMenu}>{s.title}</Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                if (hasDropdown === 'conditions' && groupedConditions.length > 0) {
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === 'conditions' ? null : 'conditions')}
                        className="flex w-full items-center justify-between text-dark font-medium text-lg"
                      >
                        {link.name}
                        <svg className={`w-4 h-4 transition-transform ${mobileExpanded === 'conditions' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileExpanded === 'conditions' && (
                        <div className="ml-4 mt-2 space-y-2 border-l-2 border-primary/20 pl-3">
                          <Link href="/conditions" className="block text-sm font-semibold text-primary" onClick={closeMenu}>All Conditions</Link>
                          {groupedConditions.map((g) => (
                            <div key={g.label}>
                              <p className="text-xs font-semibold uppercase text-gray-400 mt-2">{g.label}</p>
                              {g.items.map((c) => (
                                <Link key={c.slug} href={`/conditions/${c.slug}`} className="block text-sm text-text_color py-0.5" onClick={closeMenu}>{c.title}</Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`text-dark font-medium text-lg capitalize hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="mt-4 px-6 py-2 bg-primary text-white text-lg font-semibold rounded-full shadow-md hover:bg-primary-600 transition text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
