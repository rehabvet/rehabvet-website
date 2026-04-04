import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'
import { HeaderServer } from '@/components/HeaderServer'
import SiteFooter from '@/components/shared/footer'
import ClientWrapper from '@/components/shared/client-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'RehabVet — Veterinary Rehabilitation Singapore',
    template: '%s | RehabVet',
  },
  description: "Singapore's leading veterinary rehabilitation clinic offering physiotherapy, hydrotherapy, acupuncture, and more for your pets.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    siteName: 'RehabVet',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientWrapper>
          <HeaderServer />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
        </ClientWrapper>
      </body>
    </html>
  )
}
