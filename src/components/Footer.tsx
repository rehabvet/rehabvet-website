import Link from 'next/link'

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
  Contact: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/contact', label: 'Book Appointment' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary-700 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4">RehabVet</h3>
            <p className="text-sm text-primary-200 mb-4">
              Singapore&apos;s leading veterinary rehabilitation clinic. Helping pets recover, move, and thrive.
            </p>
            <div className="text-sm text-primary-200 space-y-1">
              <p>Singapore</p>
              <p>info@rehabvet.com</p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2">
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
        </div>

        <div className="mt-12 border-t border-primary-600 pt-8 text-center text-sm text-primary-300">
          <p>&copy; {new Date().getFullYear()} RehabVet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
