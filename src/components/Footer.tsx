import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'

const footerLinks = {
  Services: [
    { href: '/services', label: 'All Services' },
    { href: '/modalities', label: 'Modalities' },
    { href: '/conditions', label: 'Conditions' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/patient-stories', label: 'Patient Stories' },
    { href: '/faq', label: 'FAQ' },
  ],
}

export async function Footer() {
  let address = '11 Mandai Estate #03-12, Mandai Industrial Building, Singapore 729908'
  let phone = '+65 6481 7735'
  let email = 'info@rehabvet.com'
  let hours = ''
  let whatsapp = ''
  let facebook = ''
  let instagram = ''
  let youtube = ''

  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    if (settings.contactInfo?.address) address = settings.contactInfo.address
    if (settings.contactInfo?.phone) phone = settings.contactInfo.phone
    if (settings.contactInfo?.email) email = settings.contactInfo.email
    if (settings.contactInfo?.hours) hours = settings.contactInfo.hours
    if (settings.contactInfo?.whatsapp) whatsapp = settings.contactInfo.whatsapp
    if (settings.socialLinks?.facebook) facebook = settings.socialLinks.facebook
    if (settings.socialLinks?.instagram) instagram = settings.socialLinks.instagram
    if (settings.socialLinks?.youtube) youtube = settings.socialLinks.youtube
  } catch {}

  return (
    <footer className="bg-primary-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold">RehabVet</h3>
            <p className="mt-3 text-sm text-primary-200 leading-relaxed">
              Singapore&apos;s leading veterinary rehabilitation clinic. Helping pets recover, move, and thrive.
            </p>
            <div className="mt-6 space-y-3 text-sm text-primary-200">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </div>
            </div>
            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-lg bg-primary-700 p-2 hover:bg-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-lg bg-primary-700 p-2 hover:bg-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-lg bg-primary-700 p-2 hover:bg-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-primary-200 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Clinic Hours */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Clinic Hours</h4>
            {hours ? (
              <div className="text-sm text-primary-200 whitespace-pre-line leading-relaxed">{hours}</div>
            ) : (
              <div className="text-sm text-primary-200 space-y-1.5">
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>Sat: 9:00 AM - 1:00 PM</p>
                <p>Sun & PH: Closed</p>
              </div>
            )}
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block rounded-full bg-coral-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-coral-600 transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-400">
          <p>&copy; {new Date().getFullYear()} RehabVet. All rights reserved.</p>
          <p>Veterinary Rehabilitation &amp; Physiotherapy, Singapore</p>
        </div>
      </div>
    </footer>
  )
}
