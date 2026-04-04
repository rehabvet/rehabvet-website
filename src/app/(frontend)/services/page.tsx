import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PayloadImage } from '@/components/PayloadImage'
import type { Service, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our veterinary rehabilitation services including physiotherapy, hydrotherapy, HBOT, acupuncture, and more.',
}

export default async function ServicesPage() {
  let services: Service[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', limit: 50, sort: 'title' })
    services = result.docs
  } catch {}

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Our Services</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Comprehensive rehabilitation services tailored to your pet&apos;s unique needs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No services available yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <PayloadImage
                      media={service.heroImage as Media}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h2>
                    {service.excerpt && (
                      <p className="mt-2 text-gray-600 line-clamp-3">{service.excerpt}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:text-primary-700">
                      Learn more <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
