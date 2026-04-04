import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PayloadImage } from '@/components/PayloadImage'
import type { Service, Condition, BlogPost, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'RehabVet — Veterinary Rehabilitation Singapore',
  description: "Singapore's leading veterinary rehabilitation clinic offering physiotherapy, hydrotherapy, acupuncture, and more for your pets.",
}

const CATEGORY_COLORS: Record<string, string> = {
  developmental: 'from-blue-500 to-blue-600',
  degenerative: 'from-amber-500 to-amber-600',
  orthopaedic: 'from-emerald-500 to-emerald-600',
  neurological: 'from-purple-500 to-purple-600',
  cancer: 'from-rose-400 to-rose-500',
}

const CATEGORY_LABELS: Record<string, string> = {
  developmental: 'Developmental',
  degenerative: 'Degenerative',
  orthopaedic: 'Orthopaedic',
  neurological: 'Neurological',
  cancer: 'Cancer',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function HomePage() {
  let services: Service[] = []
  let conditions: Condition[] = []
  let latestPosts: BlogPost[] = []

  try {
    const payload = await getPayload({ config })
    const [servicesResult, conditionsResult, postsResult] = await Promise.all([
      payload.find({ collection: 'services', limit: 6, sort: 'title' }),
      payload.find({ collection: 'conditions', limit: 100, sort: 'title' }),
      payload.find({ collection: 'blog-posts', limit: 3, sort: '-date' }),
    ])
    services = servicesResult.docs
    conditions = conditionsResult.docs
    latestPosts = postsResult.docs
  } catch {}

  // Group conditions by category with counts
  const conditionCategories = Object.entries(
    conditions.reduce<Record<string, number>>((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1
      return acc
    }, {}),
  ).sort((a, b) => {
    const order = ['developmental', 'degenerative', 'orthopaedic', 'neurological', 'cancer']
    return order.indexOf(a[0]) - order.indexOf(b[0])
  })

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-200 mb-4">Singapore&apos;s Veterinary Rehabilitation Specialists</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Helping Pets Recover, Move &amp; Thrive
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-100">
              We combine modern veterinary medicine with proven rehabilitation therapies to give your pet the best chance at recovery and a better quality of life.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-coral-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-coral-600 hover:shadow-xl transition-all"
              >
                Book a Consultation
              </Link>
              <Link
                href="/services"
                className="rounded-full border-2 border-white/80 px-8 py-3.5 text-base font-semibold text-white hover:bg-white hover:text-primary-700 transition-all"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive rehabilitation care tailored to your pet&apos;s unique needs</p>
          </div>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    {service.excerpt && (
                      <p className="mt-2 text-gray-600 line-clamp-2">{service.excerpt}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:text-primary-700">
                      Learn more <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Services coming soon.</p>
          )}
          {services.length > 0 && (
            <div className="mt-12 text-center">
              <Link href="/services" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                View all services <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
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
                className="mt-8 inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Learn more about us
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 h-80 flex items-center justify-center">
              <svg className="w-24 h-24 text-primary-400" fill="currentColor" viewBox="0 0 512 512">
                <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5c-14.3-42.9.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7.9 78.5 33.3zm309.2 0c18.9-32.4 54.1-45.3 78.5-33.3s29.1 51.7 10.2 84.1-54.1 45.3-78.5 33.3-29.1-51.7-10.2-84.1zM369.9 92.9c14.3-42.9 52.1-70.5 84.4-58.5s46.9 53.9 32.6 96.8-52.1 70.5-84.4 58.5-46.9-53.9-32.6-96.8zM256 512c-66.3 0-116-45.6-136-96-19.4-48.8-8.3-100.6 26.1-133.9 24.5-23.7 56.1-38.5 83.2-44.5 8.6-1.9 17.6-2.8 26.7-2.8s18.1.9 26.7 2.8c27.1 6 58.7 20.8 83.2 44.5 34.4 33.3 45.5 85.1 26.1 133.9-20 50.4-69.7 96-136 96z"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      {conditionCategories.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Conditions We Treat</h2>
              <p className="mt-4 text-lg text-gray-600">Expert care for a wide range of conditions</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {conditionCategories.map(([cat, count]) => (
                <Link
                  key={cat}
                  href={`/conditions`}
                  className={`bg-gradient-to-br ${CATEGORY_COLORS[cat] || 'from-gray-500 to-gray-600'} rounded-2xl p-6 text-white hover:shadow-lg hover:scale-[1.02] transition-all`}
                >
                  <h3 className="font-bold text-lg">{CATEGORY_LABELS[cat] || cat}</h3>
                  <p className="mt-1 text-sm opacity-90">{count} condition{count !== 1 ? 's' : ''}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Latest from Our Blog</h2>
              <Link href="/blog" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors hidden sm:block">
                View all posts &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <PayloadImage
                      media={post.featuredImage as Media}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {post.categories && post.categories.length > 0 && (
                      <span className="mb-2 inline-block self-start rounded-full bg-primary-50 px-3 py-0.5 text-xs font-medium text-primary-700">
                        {post.categories[0].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                      {post.author && <span>{post.author}</span>}
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/blog" className="text-primary-600 font-semibold hover:text-primary-700">
                View all posts &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Help Your Pet?</h2>
          <p className="mt-4 text-lg text-primary-100">
            Book a consultation today and let our team create a personalised rehabilitation plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-coral-500 px-10 py-4 text-lg font-semibold text-white shadow-lg hover:bg-coral-600 transition-all"
            >
              Book Appointment
            </Link>
            <a
              href="tel:+6564817735"
              className="rounded-full border-2 border-white/80 px-10 py-4 text-lg font-semibold text-white hover:bg-white hover:text-primary-700 transition-all"
            >
              Call +65 6481 7735
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
