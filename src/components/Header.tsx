'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

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

export function Header({
  services = [],
  conditions = [],
  logoUrl,
}: {
  services?: NavService[]
  conditions?: NavCondition[]
  logoUrl?: string | null
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [conditionsOpen, setConditionsOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileConditionsOpen, setMobileConditionsOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const conditionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false)
      if (conditionsRef.current && !conditionsRef.current.contains(e.target as Node)) setConditionsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const groupedConditions = CATEGORY_ORDER
    .map((cat) => ({
      label: CATEGORY_LABELS[cat],
      items: conditions.filter((c) => c.category === cat),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {logoUrl ? (
              <Image src={logoUrl} alt="RehabVet" width={140} height={40} className="h-9 w-auto" priority />
            ) : (
              <span className="text-2xl font-bold text-primary-600" style={{color:'#e6ac00'}}>RehabVet</span>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
              Home
            </Link>
            <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
              About
            </Link>

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                type="button"
                onClick={() => { setServicesOpen(!servicesOpen); setConditionsOpen(false) }}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
              >
                Services
                <svg className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                  <Link href="/services" className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50" onClick={() => setServicesOpen(false)}>
                    All Services
                  </Link>
                  <div className="my-1 border-t border-gray-100" />
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600" onClick={() => setServicesOpen(false)}>
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/modalities" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
              Modalities
            </Link>

            {/* Conditions Dropdown */}
            <div ref={conditionsRef} className="relative">
              <button
                type="button"
                onClick={() => { setConditionsOpen(!conditionsOpen); setServicesOpen(false) }}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
              >
                Conditions
                <svg className={`w-4 h-4 transition-transform ${conditionsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {conditionsOpen && (
                <div className="absolute left-0 top-full mt-1 w-[480px] rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
                  <Link href="/conditions" className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 mb-2" onClick={() => setConditionsOpen(false)}>
                    All Conditions
                  </Link>
                  <div className="grid grid-cols-2 gap-4">
                    {groupedConditions.map((group) => (
                      <div key={group.label}>
                        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{group.label}</p>
                        {group.items.map((c) => (
                          <Link key={c.slug} href={`/conditions/${c.slug}`} className="block rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600" onClick={() => setConditionsOpen(false)}>
                            {c.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
              Blog
            </Link>
            <Link href="/patient-stories" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
              Stories
            </Link>
            <Link href="/faq" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
              FAQ
            </Link>
            <Link
              href="/contact"
              className="ml-2 rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white max-h-[80vh] overflow-y-auto">
          <div className="space-y-1 px-4 py-3">
            <Link href="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600" onClick={() => setMobileOpen(false)}>About</Link>

            {/* Mobile Services */}
            <div>
              <button type="button" onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50">
                Services
                <svg className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {mobileServicesOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-primary-100 pl-3 py-1">
                  <Link href="/services" className="block rounded-md px-3 py-1.5 text-sm font-semibold text-primary-600 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>All Services</Link>
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="block rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>{s.title}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/modalities" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600" onClick={() => setMobileOpen(false)}>Modalities</Link>

            {/* Mobile Conditions */}
            <div>
              <button type="button" onClick={() => setMobileConditionsOpen(!mobileConditionsOpen)} className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50">
                Conditions
                <svg className={`w-4 h-4 transition-transform ${mobileConditionsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {mobileConditionsOpen && (
                <div className="ml-4 space-y-2 border-l-2 border-primary-100 pl-3 py-1">
                  <Link href="/conditions" className="block rounded-md px-3 py-1.5 text-sm font-semibold text-primary-600 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>All Conditions</Link>
                  {groupedConditions.map((group) => (
                    <div key={group.label}>
                      <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{group.label}</p>
                      {group.items.map((c) => (
                        <Link key={c.slug} href={`/conditions/${c.slug}`} className="block rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>{c.title}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/patient-stories" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600" onClick={() => setMobileOpen(false)}>Stories</Link>
            <Link href="/faq" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600" onClick={() => setMobileOpen(false)}>FAQ</Link>
            <Link
              href="/contact"
              className="block rounded-full bg-accent-500 px-5 py-2.5 text-center text-base font-semibold text-white hover:bg-accent-600 mt-3"
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
