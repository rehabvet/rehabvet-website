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
    title: 'Veterinary Rehabilitation Consultation',
    slug: 'veterinary-rehabilitation-consultation',
    excerpt:
      'Get your pet back on their feet with RehabVet\'s veterinary rehabilitation consultation. Let us help your pet live a healthier, happier life.',
  },
  {
    title: 'Animal Rehabilitation',
    slug: 'animal-rehabilitation',
    excerpt:
      'Restore your pet\'s mobility with expert animal rehabilitation at RehabVet Singapore. Physiotherapy, hydrotherapy & more. Book today.',
  },
  {
    title: 'Dog Physiotherapy',
    slug: 'dog-physiotherapy',
    excerpt:
      'RehabVet provides physiotherapy for dogs to help them recover from injury and improve their mobility. Get your pup back to their best with RehabVet!',
  },
  {
    title: 'Hydrotherapy for Dogs',
    slug: 'dog-hydrotherapy',
    excerpt:
      'RehabVet offers hydrotherapy treatment for dogs to help them recover from injury or surgery. Get in touch with our experienced team!',
  },
  {
    title: 'Hyperbaric Oxygen Therapy for Pets',
    slug: 'hbot-hyperbaric-oxygen-therapy-animals',
    excerpt:
      'RehabVet offers Hyperbaric Oxygen Treatment for dogs to help them recover from injury or illness. Get your pup back to health with our expert care!',
  },
  {
    title: 'Traditional Chinese Veterinary Medicine (TCVM) for Pets',
    slug: 'traditional-chinese-veterinary-medicine',
    excerpt:
      'Traditional Chinese Veterinary Medicine blends acupuncture, herbal therapy and holistic care for your pet\'s wellbeing. Learn more at RehabVet Singapore.',
  },
  {
    title: 'Dog Chiropractic in Singapore',
    slug: 'dog-chiropractic',
    excerpt:
      'RehabVet offers chiropractic treatment for dogs to help improve mobility and reduce pain. Get your pet back to feeling their best with our experienced team.',
  },
  {
    title: 'Dog Acupuncture in Singapore',
    slug: 'dog-acupuncture',
    excerpt:
      'Discover the benefits of acupuncture for pets at RehabVet to explore how this therapy helps dogs and cats find relief and wellness.',
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
