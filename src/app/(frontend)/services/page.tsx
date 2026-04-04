import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Veterinary Rehabilitation Services | RehabVet SG',
  description:
    'Explore our veterinary rehabilitation services including physiotherapy, hydrotherapy, HBOT, acupuncture, chiropractic, TCM and more.',
}

const SERVICES = [
  {
    title: 'Veterinary Rehabilitation',
    slug: 'veterinary-rehabilitation-consultation',
    excerpt:
      'Veterinary Rehabilitation Consultation is a service which provides specialist advice and support to help animals recover from injury or illness.',
  },
  {
    title: 'Rehabilitation',
    slug: 'animal-rehabilitation',
    excerpt:
      'Animal rehabilitation is the process of restoring an animal to its optimal physical and mental health through medical and behavioural interventions.',
  },
  {
    title: 'Physiotherapy',
    slug: 'dog-physiotherapy',
    excerpt:
      'Dog physiotherapy is a specialist service which provides tailored treatments to help improve the mobility and wellbeing of dogs. It is a great way to ensure your pet is in the best possible health.',
  },
  {
    title: 'Hydrotherapy',
    slug: 'dog-hydrotherapy',
    excerpt:
      'Hydrotherapy for Dogs is a beneficial service that can help to improve the mobility and well-being of our canine companions. It is a great way to provide a natural and holistic approach.',
  },
  {
    title: 'Hyperbaric Oxygen Treatment',
    slug: 'hbot-hyperbaric-oxygen-therapy-animals',
    excerpt:
      'Hyperbaric Oxygen Treatment is a medical procedure used to provide dogs with increased oxygen levels, which can help to improve their overall health and wellbeing.',
  },
  {
    title: 'Traditional Chinese Medicine',
    slug: 'traditional-chinese-veterinary-medicine',
    excerpt:
      'This service provides traditional Chinese veterinary medicine for dogs, offering a holistic approach to pet care. It combines ancient Chinese wisdom with modern veterinary science.',
  },
  {
    title: 'Chiropractic for Dogs',
    slug: 'dog-chiropractic',
    excerpt:
      'Chiropractic treatment is a holistic approach to canine health, providing a non-invasive and drug-free way to improve the well-being of our four-legged friends.',
  },
  {
    title: 'Acupuncture',
    slug: 'dog-acupuncture',
    excerpt:
      'Animal rehabilitation is a specialised field in veterinary medicine that focuses on restoring the health, mobility, and quality of life of pets recovering from injury.',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary-300 mb-2">
            <span className="text-primary-400">Home</span> / Services
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Expert Rehabilitation Services for Pets
          </h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                  <span className="text-5xl font-bold text-primary-300">
                    {service.title[0]}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {service.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-50 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to start your pet&apos;s recovery?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our team is here to help. Book a rehabilitation consultation today.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
