import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our veterinary rehabilitation services including physiotherapy, hydrotherapy, HBOT, acupuncture, and more.',
}

export default async function ServicesPage() {
  let services: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', limit: 50, sort: 'title' })
    services = result.docs
  } catch {
    // DB not available yet
  }

  const defaultServices = [
    { title: 'Rehab Consultation', slug: 'rehab-consultation', excerpt: 'Comprehensive assessment and personalised rehabilitation plans.', icon: '🏥' },
    { title: 'Physiotherapy', slug: 'physiotherapy', excerpt: 'Targeted exercises and manual therapy to restore mobility.', icon: '💪' },
    { title: 'Hydrotherapy', slug: 'hydrotherapy', excerpt: 'Underwater treadmill therapy for low-impact recovery.', icon: '🏊' },
    { title: 'Hyperbaric Oxygen Therapy', slug: 'hbot', excerpt: 'Accelerate healing with pressurised oxygen treatment.', icon: '🫧' },
    { title: 'Acupuncture', slug: 'acupuncture', excerpt: 'Traditional techniques for pain relief and natural healing.', icon: '📍' },
    { title: 'TCVM', slug: 'tcvm', excerpt: 'Traditional Chinese Veterinary Medicine for holistic care.', icon: '🌿' },
    { title: 'Chiropractic', slug: 'chiropractic', excerpt: 'Spinal adjustments for improved mobility and function.', icon: '🦴' },
    { title: 'Animal Rehabilitation', slug: 'animal-rehabilitation', excerpt: 'Complete rehabilitation programs for post-surgical and chronic conditions.', icon: '🐕' },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Our Services</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Comprehensive rehabilitation services tailored to your pet&apos;s unique needs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayServices.map((service: any) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
              >
                <span className="text-4xl">{service.icon || '🩺'}</span>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {service.title}
                </h2>
                <p className="mt-2 text-gray-600">{service.excerpt || ''}</p>
                <span className="mt-4 inline-block text-sm font-medium text-primary-500 group-hover:text-primary-700">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
