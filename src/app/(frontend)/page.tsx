import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PayloadImage } from '@/components/PayloadImage'
import type { Service, Condition, BlogPost, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

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

const MEDIA_LOGOS = [
  { src: '/images/cna-logo.webp', alt: 'CNA' },
  { src: '/images/rice-media-logo.webp', alt: 'Rice Media' },
  { src: '/images/straits-times-logo.webp', alt: 'The Straits Times' },
  { src: '/images/today-logo.webp', alt: 'TODAY' },
  { src: '/images/zaobao-logo.webp', alt: 'Zaobao' },
]

export default async function HomePage() {
  let services: Service[] = []
  let conditions: Condition[] = []
  let latestPosts: BlogPost[] = []

  try {
    const payload = await getPayload({ config })
    const [servicesResult, conditionsResult, postsResult] = await Promise.all([
      payload.find({ collection: 'services', limit: 12, sort: 'title' }),
      payload.find({ collection: 'conditions', limit: 100, sort: 'title' }),
      payload.find({ collection: 'blog-posts', limit: 6, sort: '-date' }),
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
      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-bg.webp"
          alt="RehabVet clinic"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-400 mb-4">
              Singapore&apos;s #1 Vet Rehab Clinic
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Singapore&apos;s first &amp; trusted Veterinary Rehabilitation, Physiotherapy and Hydrotherapy Clinic.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Helping your pets recover, move, and thrive with Singapore&apos;s most comprehensive range of animal rehabilitation modalities.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-accent-500 px-8 py-3.5 text-base font-bold text-white shadow-lg hover:bg-accent-600 hover:shadow-xl transition-all"
              >
                Book Now
              </Link>
              <Link
                href="/about#vets"
                className="rounded-full border-2 border-white/80 px-8 py-3.5 text-base font-bold text-white hover:bg-white hover:text-gray-900 transition-all"
              >
                For Vets
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── As Featured In ── */}
      <section className="bg-gray-900 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-primary-400 mb-8">
            As Featured In and Trusted Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {MEDIA_LOGOS.map((logo) => (
              <div key={logo.alt} className="relative h-8 w-28 sm:h-10 sm:w-32 grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-all">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 112px, 128px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Purpose ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-3">About Us</p>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl" style={{ color: '#303030' }}>
              RehabVet&apos;s Purpose
            </h2>
            <div className="mt-4 h-1 w-16 bg-primary-500 mx-auto rounded-full" />
            <p className="mt-8 text-lg leading-relaxed" style={{ color: '#303030' }}>
              <strong>REHABVET CLINIC</strong> is Singapore&apos;s first full-fledged animal rehabilitation clinic.
              With our team of well-trained and experienced veterinarians and therapists, the comprehensive facility
              offers the widest range of rehabilitation modalities to all animals.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-block rounded-full bg-accent-500 px-8 py-3.5 text-base font-bold text-white shadow hover:bg-accent-600 transition-all"
              >
                Make An Appointment — For Pet Owners
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-3">What We Do</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ color: '#303030' }}>
              Expert Rehabilitation Services for Pets
            </h2>
            <div className="mt-4 h-1 w-16 bg-primary-500 mx-auto rounded-full" />
          </div>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary-300 transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-primary-50">
                    <PayloadImage
                      media={service.heroImage as Media}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors" style={{ color: '#303030' }}>
                      {service.title}
                    </h3>
                    {service.excerpt && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{service.excerpt}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-500 group-hover:text-accent-600">
                      Learn more <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // Fallback: static service tiles when CMS is empty
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[
                'Physiotherapy', 'Hydrotherapy', 'Acupuncture', 'Hyperbaric Oxygen Treatment',
                'Rehabilitation', 'Hydro Treadmill', 'Traditional Chinese Medicine',
                'Manual Therapy', 'Electrical Therapy', 'Therapeutic Laser',
              ].map((name) => (
                <div key={name} className="rounded-2xl bg-white border border-primary-200 p-6 text-center hover:border-primary-400 hover:shadow-md transition-all">
                  <p className="font-semibold text-sm" style={{ color: '#303030' }}>{name}</p>
                </div>
              ))}
            </div>
          )}
          {services.length > 0 && (
            <div className="mt-12 text-center">
              <Link href="/services" className="inline-flex items-center gap-2 font-bold text-accent-500 hover:text-accent-600 transition-colors">
                View all services <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 bg-primary-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-900/60 mb-3">Our People</p>
          <h2 className="text-3xl font-extrabold text-primary-900 sm:text-4xl">
            Meet The RehabVet Team
          </h2>
          <p className="mt-4 text-lg text-primary-900/70 max-w-2xl mx-auto">
            Our dedicated veterinarians and therapists bring years of specialised experience to every patient.
          </p>
          <div className="mt-10">
            <Link
              href="/about"
              className="inline-block rounded-full bg-primary-900 px-8 py-3.5 text-base font-bold text-white hover:bg-primary-800 transition-all"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── Conditions ── */}
      {conditionCategories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-3">What We Treat</p>
              <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ color: '#303030' }}>
                Common Conditions In Singapore Pets That Require Rehabilitation
              </h2>
              <div className="mt-4 h-1 w-16 bg-primary-500 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {conditionCategories.map(([cat, count]) => (
                <Link
                  key={cat}
                  href="/conditions"
                  className={`bg-gradient-to-br ${CATEGORY_COLORS[cat] || 'from-gray-500 to-gray-600'} rounded-2xl p-6 text-white hover:shadow-lg hover:scale-[1.02] transition-all`}
                >
                  <h3 className="font-bold text-lg">{CATEGORY_LABELS[cat] || cat}</h3>
                  <p className="mt-1 text-sm opacity-90">{count} condition{count !== 1 ? 's' : ''}</p>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/conditions" className="inline-flex items-center gap-2 font-bold text-accent-500 hover:text-accent-600 transition-colors">
                View all conditions <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Blog ── */}
      {latestPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-2">Latest Articles</p>
                <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ color: '#303030' }}>RehabVet Blogs</h2>
                <div className="mt-3 h-1 w-16 bg-primary-500 rounded-full" />
              </div>
              <Link href="/blog" className="hidden sm:inline-flex items-center gap-1 font-bold text-accent-500 hover:text-accent-600 transition-colors">
                View all posts &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden bg-primary-50">
                    <PayloadImage
                      media={post.featuredImage as Media}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {post.categories && post.categories.length > 0 && (
                      <span className="mb-2 inline-block self-start rounded-full bg-primary-100 px-3 py-0.5 text-xs font-bold text-primary-700">
                        {post.categories[0].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    )}
                    <h3 className="text-base font-bold group-hover:text-accent-500 transition-colors line-clamp-2" style={{ color: '#303030' }}>
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
              <Link href="/blog" className="font-bold text-accent-500 hover:text-accent-600">
                View all posts &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Proven steps to pain free mobility.
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Let our specialists build a personalised rehabilitation plan for your pet today.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
            <div className="rounded-2xl bg-gray-800 p-8">
              <h3 className="text-xl font-bold text-primary-400 mb-3">Our Services</h3>
              <p className="text-gray-400 text-sm mb-6">
                Explore our full range of veterinary rehabilitation modalities.
              </p>
              <Link
                href="/services"
                className="inline-block rounded-full border-2 border-primary-400 px-6 py-2.5 text-sm font-bold text-primary-400 hover:bg-primary-400 hover:text-gray-900 transition-all"
              >
                View Services
              </Link>
            </div>
            <div className="rounded-2xl bg-accent-500 p-8">
              <h3 className="text-xl font-bold text-white mb-3">Contact Us</h3>
              <p className="text-white/80 text-sm mb-6">
                Book an appointment or reach out — we&apos;re here to help.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-accent-600 hover:bg-gray-100 transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
