import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Rehabilitation Modalities for Pets | RehabVet SG',
  description:
    'Discover the wide range of evidence-based treatment modalities we use at RehabVet to help your pet recover — from manual therapy to underwater treadmills.',
}

const MODALITIES = [
  {
    title: 'Manual Therapy',
    slug: 'manual-therapy-dog-cat',
    excerpt:
      'Manual therapy is a type of physical therapy that uses hands-on techniques to help improve the mobility and function of dogs and cats.',
  },
  {
    title: 'Physical Therapy',
    slug: 'physical-therapy-dogs-cats',
    excerpt:
      'Physical therapy for dogs is a service that provides rehabilitative care to help improve mobility and reduce pain.',
  },
  {
    title: 'Class 4 Therapeutic Laser',
    slug: 'class-4-theraputic-laser-for-dogs-and-cats',
    excerpt:
      'This class 4 therapeutic laser is designed to provide relief to dogs and cats suffering from a variety of ailments.',
  },
  {
    title: 'Electrical Therapy',
    slug: 'electrical-therapy-tens-nmes-for-dogs-and-cats',
    excerpt:
      'This service provides electrical therapy, such as TENS and NMES, for both cats and dogs. It is a great way to help improve the health.',
  },
  {
    title: 'Ultrasound Therapy',
    slug: 'ultrasound-therapy-for-dogs-and-cats',
    excerpt:
      'Ultrasound Therapy is a non-invasive treatment for dogs and cats which uses sound waves to reduce pain and inflammation.',
  },
  {
    title: 'Extracorporeal shockwave',
    slug: 'extracorporeal-shockwave-therapy-eswt-for-animals',
    excerpt:
      'Extracorporeal Shockwave Therapy (ESWT) is a non-invasive treatment for dogs which uses sound waves to help reduce pain.',
  },
  {
    title: 'TCVM Tui Na',
    slug: 'tcvm-tui-na-for-dogs-and-cats',
    excerpt:
      'Tui-Na is a traditional Chinese massage therapy specifically tailored for dogs, providing a holistic approach to their wellbeing.',
  },
  {
    title: 'Underwater Treadmill',
    slug: 'underwater-treadmill',
    excerpt:
      'This service provides a unique way to exercise dogs, allowing them to run on a treadmill submerged in water.',
  },
  {
    title: 'Proprioception Exercises',
    slug: 'canine-rehabilitation-proprioception-exercises',
    excerpt:
      'We offer canine proprioception exercises to help dogs with nerve damage improve their mobility. Our service is tailored to the individual needs.',
  },
]

export default function ModalitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary-300 mb-2">
            <span className="text-primary-400">Home</span> / Modalities
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Expert Rehabilitation Modalities for Dogs and Cats
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            We use a wide range of evidence-based treatment modalities to help your pet recover.
          </p>
        </div>
      </section>

      {/* Modalities Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {MODALITIES.map((mod) => (
              <Link
                key={mod.slug}
                href={`/modalities/${mod.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                  <span className="text-5xl font-bold text-primary-300">
                    {mod.title[0]}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {mod.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{mod.excerpt}</p>
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
            Not sure which modality is right for your pet?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our team will assess your pet and recommend the best treatment plan.
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
