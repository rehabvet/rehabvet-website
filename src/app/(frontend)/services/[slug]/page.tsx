import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    const service = result.docs[0]
    if (!service) return { title: 'Service Not Found' }
    return {
      title: (service.seo as any)?.metaTitle || service.title,
      description: (service.seo as any)?.metaDescription || service.excerpt || '',
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  let service: any = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    service = result.docs[0]
  } catch {
    // DB not available
  }

  if (!service) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/services" className="text-primary-200 hover:text-white text-sm">&larr; Back to Services</Link>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl capitalize">{slug.replace(/-/g, ' ')}</h1>
            <p className="mt-4 text-lg text-primary-100">This service page will be populated via the CMS.</p>
          </div>
        </section>
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600 text-lg">Content coming soon. Please check back later or contact us for more information.</p>
            <Link href="/contact" className="mt-8 inline-block rounded-full bg-coral-400 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors">
              Contact Us
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="text-primary-200 hover:text-white text-sm">&larr; Back to Services</Link>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{service.title}</h1>
          {service.excerpt && <p className="mt-4 text-lg text-primary-100">{service.excerpt}</p>}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Detailed service content from CMS will appear here.</p>
          </div>

          {service.benefits && service.benefits.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Benefits</h2>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((b: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">✓</span>
                    <span className="text-gray-700">{b.benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.faq && service.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
              <div className="mt-4 space-y-6">
                {service.faq.map((item: any, i: number) => (
                  <div key={i}>
                    <h3 className="font-semibold text-gray-900">{item.question}</h3>
                    <p className="mt-1 text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Interested in this service?</h2>
            <p className="mt-2 text-gray-600">Book a consultation to discuss how we can help your pet.</p>
            <Link href="/contact" className="mt-6 inline-block rounded-full bg-coral-400 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
