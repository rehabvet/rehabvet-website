import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { PayloadImage } from '@/components/PayloadImage'
import { RichText } from '@/components/RichText'
import type { Service, Media } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', limit: 100, select: { slug: true } })
    return result.docs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    const service = result.docs[0]
    if (!service) return { title: 'Service Not Found' }
    return {
      title: service.seo?.metaTitle || service.title,
      description: service.seo?.metaDescription || service.excerpt || '',
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  let service: Service | null = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    service = result.docs[0] || null
  } catch {}

  if (!service) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 text-white">
        {service.heroImage && typeof service.heroImage !== 'number' && service.heroImage.url && (
          <div className="absolute inset-0 overflow-hidden">
            <PayloadImage media={service.heroImage} fill sizes="100vw" className="opacity-20" priority />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Services
          </Link>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{service.title}</h1>
          {service.excerpt && <p className="mt-4 max-w-2xl text-lg text-primary-100">{service.excerpt}</p>}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Description */}
          <RichText data={service.description} />

          {/* Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Benefits</h2>
              <ul className="mt-6 space-y-4">
                {service.benefits.map((b, i) => (
                  <li key={b.id || i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-gray-700">{b.benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ Accordion */}
          {service.faq && service.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="mt-6 space-y-3">
                {service.faq.map((item, i) => (
                  <details key={item.id || i} className="group rounded-xl border border-gray-200 bg-white">
                    <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-gray-900 hover:text-primary-600 transition-colors">
                      {item.question}
                      <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">{item.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Interested in {service.title}?</h2>
            <p className="mt-2 text-gray-600">Book a consultation to discuss how we can help your pet.</p>
            <Link href="/contact" className="mt-6 inline-block rounded-full bg-coral-500 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
