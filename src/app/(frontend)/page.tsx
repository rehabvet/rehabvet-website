import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'RehabVet — Veterinary Rehabilitation Singapore',
  description: "Singapore's leading veterinary rehabilitation clinic offering physiotherapy, hydrotherapy, acupuncture, and more for your pets.",
}

const services = [
  { icon: '🏥', title: 'Rehab Consultation', desc: 'Comprehensive assessment and personalised rehabilitation plans for your pet.' },
  { icon: '💪', title: 'Physiotherapy', desc: 'Targeted exercises and manual therapy to restore mobility and strength.' },
  { icon: '🏊', title: 'Hydrotherapy', desc: 'Underwater treadmill therapy for low-impact recovery and fitness.' },
  { icon: '🫧', title: 'HBOT', desc: 'Hyperbaric oxygen therapy to accelerate healing and reduce inflammation.' },
  { icon: '📍', title: 'Acupuncture', desc: 'Traditional techniques to relieve pain and promote natural healing.' },
  { icon: '🦴', title: 'Chiropractic', desc: 'Spinal adjustments to improve mobility and nervous system function.' },
]

const conditionCategories = [
  { title: 'Developmental', color: 'bg-blue-500', count: '5+ conditions' },
  { title: 'Degenerative', color: 'bg-amber-500', count: '4+ conditions' },
  { title: 'Orthopaedic', color: 'bg-green-500', count: '5+ conditions' },
  { title: 'Neurological', color: 'bg-purple-500', count: '3+ conditions' },
  { title: 'Cancer', color: 'bg-red-400', count: '2+ conditions' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-500 to-primary-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Helping Pets Recover, Move &amp; Thrive
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-100">
              Singapore&apos;s leading veterinary rehabilitation clinic. We combine modern medicine with proven therapies to give your pet the best chance at recovery.
            </p>
            <div className="mt-10 flex gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-coral-400 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-coral-600 transition-all"
              >
                Book a Consultation
              </Link>
              <Link
                href="/services"
                className="rounded-full border-2 border-white px-8 py-3 text-base font-semibold text-white hover:bg-white hover:text-primary-700 transition-all"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive rehabilitation care tailored to your pet&apos;s needs</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href="/services"
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-primary-200 transition-all"
              >
                <span className="text-4xl">{service.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Dedicated to Your Pet&apos;s Recovery
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                At RehabVet, we believe every pet deserves the chance to live their best life. Our team of experienced veterinary rehabilitation specialists combines cutting-edge technology with compassionate care.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                From post-surgical recovery to managing chronic conditions, we create personalised treatment plans that help your pet regain mobility, reduce pain, and improve quality of life.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-700 transition-colors"
              >
                Learn more about us
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="rounded-2xl bg-primary-100 h-80 flex items-center justify-center text-primary-400">
              <span className="text-6xl">🐾</span>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Conditions We Treat</h2>
            <p className="mt-4 text-lg text-gray-600">Expert care for a wide range of conditions</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {conditionCategories.map((cat) => (
              <Link
                key={cat.title}
                href="/conditions"
                className={`${cat.color} rounded-2xl p-6 text-white hover:opacity-90 transition-opacity`}
              >
                <h3 className="font-bold text-lg">{cat.title}</h3>
                <p className="mt-1 text-sm opacity-90">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest from Our Blog</h2>
            <Link href="/blog" className="text-primary-500 font-semibold hover:text-primary-700 transition-colors">
              View all posts &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Understanding Pet Rehabilitation', excerpt: 'Learn about the different types of rehabilitation therapies available for your pet.' },
              { title: 'When Does Your Pet Need Physiotherapy?', excerpt: 'Signs that your pet could benefit from professional physiotherapy treatment.' },
              { title: 'The Benefits of Hydrotherapy', excerpt: 'How underwater treadmill therapy can help pets recover faster and build strength.' },
            ].map((post) => (
              <article key={post.title} className="rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-primary-100 flex items-center justify-center">
                  <span className="text-4xl text-primary-300">📝</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{post.excerpt}</p>
                  <Link href="/blog" className="mt-4 inline-block text-sm font-medium text-primary-500 hover:text-primary-700">
                    Read more &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-500 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Help Your Pet?</h2>
          <p className="mt-4 text-lg text-primary-100">
            Book a consultation today and let our team create a personalised rehabilitation plan.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-coral-400 px-10 py-4 text-lg font-semibold text-white shadow-lg hover:bg-coral-600 transition-all"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </>
  )
}
