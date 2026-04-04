import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PayloadImage } from '@/components/PayloadImage'
import type { Service, Condition, BlogPost, Media } from '@/payload-types'
import SectionHeader from '@/components/shared/section-header'
import Button from '@/components/shared/primary-button'
import { FaCheckCircle, FaHeart, FaMedkit, FaPaw } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'RehabVet — Veterinary Rehabilitation Singapore',
  description: "Singapore's leading veterinary rehabilitation clinic offering physiotherapy, hydrotherapy, acupuncture, and more for your pets.",
}

const CATEGORY_COLORS: Record<string, string> = {
  developmental: 'bg-blue-500',
  degenerative: 'bg-amber-500',
  orthopaedic: 'bg-emerald-500',
  neurological: 'bg-purple-500',
  cancer: 'bg-rose-400',
}

const CATEGORY_LABELS: Record<string, string> = {
  developmental: 'Developmental',
  degenerative: 'Degenerative',
  orthopaedic: 'Orthopaedic',
  neurological: 'Neurological',
  cancer: 'Cancer',
}

const HOMEPAGE_SERVICES = [
  { title: 'Veterinary Rehabilitation', slug: 'veterinary-rehabilitation-consultation', excerpt: 'Specialist advice and support to help animals recover from injury or illness.' },
  { title: 'Rehabilitation', slug: 'animal-rehabilitation', excerpt: 'Restoring an animal to its optimal physical and mental health through medical and behavioural interventions.' },
  { title: 'Physiotherapy', slug: 'dog-physiotherapy', excerpt: 'Tailored treatments to help improve the mobility and wellbeing of dogs.' },
  { title: 'Hydrotherapy', slug: 'dog-hydrotherapy', excerpt: 'A beneficial service that can help to improve the mobility and well-being of our canine companions.' },
  { title: 'Hyperbaric Oxygen Treatment', slug: 'hbot-hyperbaric-oxygen-therapy-animals', excerpt: 'Increased oxygen levels to help improve overall health and wellbeing.' },
  { title: 'Traditional Chinese Medicine', slug: 'traditional-chinese-veterinary-medicine', excerpt: 'A holistic approach combining ancient Chinese wisdom with modern veterinary science.' },
  { title: 'Chiropractic for Dogs', slug: 'dog-chiropractic', excerpt: 'A non-invasive and drug-free way to improve the well-being of our four-legged friends.' },
  { title: 'Acupuncture', slug: 'dog-acupuncture', excerpt: 'Restoring the health, mobility, and quality of life of pets recovering from injury.' },
]

const SERVICE_ICONS = [
  FaMedkit, FaHeart, FaPaw, FaCheckCircle,
  FaMedkit, FaPaw, FaHeart, FaCheckCircle,
]

const MEDIA_LOGOS = [
  { src: '/images/cna-logo.webp', alt: 'CNA' },
  { src: '/images/rice-media-logo.webp', alt: 'Rice Media' },
  { src: '/images/straits-times-logo.webp', alt: 'The Straits Times' },
  { src: '/images/today-logo.webp', alt: 'TODAY' },
  { src: '/images/zaobao-logo.webp', alt: 'Zaobao' },
]

const FEATURES = [
  {
    icon: FaMedkit,
    title: 'Specialized Care',
    desc: 'Evidence-based rehabilitation protocols tailored to each patient\'s unique needs.',
  },
  {
    icon: FaCheckCircle,
    title: 'Evidence-Based',
    desc: 'Our treatments follow the latest veterinary research and proven methodologies.',
  },
  {
    icon: FaHeart,
    title: 'Compassionate Team',
    desc: 'Dedicated veterinarians and therapists who truly care about your pet\'s wellbeing.',
  },
]

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
      payload.find({ collection: 'services', limit: 12, sort: 'title' }),
      payload.find({ collection: 'conditions', limit: 100, sort: 'title' }),
      payload.find({ collection: 'blog-posts', limit: 6, sort: '-date' }),
    ])
    services = servicesResult.docs
    conditions = conditionsResult.docs
    latestPosts = postsResult.docs
  } catch {}

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
      <section className="!py-0 relative min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero-bg.webp"
          alt="RehabVet clinic"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-dark/30" />
        <div className="relative z-10 container py-24 sm:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4" data-aos="fade-up">
              <div className="h-[2px] w-10 bg-primary" />
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Singapore&apos;s #1 Vet Rehab Clinic
              </p>
            </div>
            <h1 className="animateText text-white !tracking-tight">
              Veterinary Rehabilitation &amp; Physiotherapy
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80" data-aos="fade-up" data-aos-delay={300}>
              Helping your pets recover, move, and thrive with Singapore&apos;s most comprehensive range of animal rehabilitation modalities.
            </p>
            <div className="mt-10 flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay={500}>
              <Button text="Book Now" href="/contact" as="link" />
              <Button text="For Vets" href="/about#vets" as="link" variant="inverse" className="!text-white !border-white/50 hover:!text-dark" />
            </div>
          </div>
        </div>
      </section>

      {/* ── As Featured In ── */}
      <section className="!bg-dark !py-10">
        <div className="container">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-primary mb-8">
            As Featured In and Trusted Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {MEDIA_LOGOS.map((logo) => (
              <div key={logo.alt} className="relative h-8 w-28 sm:h-10 sm:w-32 grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-all" data-aos="fade-up">
                <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="128px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section>
        <div className="container">
          <SectionHeader
            className="text-center mb-10 lg:mb-16"
            subtitle="Why RehabVet"
            title="Expert Care for Your Pet"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {FEATURES.map((feat, i) => (
              <div
                key={feat.title}
                className="d2c_service_card bg-white rounded-2xl p-8 lg:p-10 border border-border_one hover:border-primary hover:shadow-lg transition-all duration-300 text-center space-y-4"
                data-aos="zoom-in"
                data-aos-delay={200 + i * 150}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary_shade flex items-center justify-center text-primary text-2xl">
                  <feat.icon />
                </div>
                <h5 className="!font-bold">{feat.title}</h5>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Purpose ── */}
      <section className="!bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden h-[350px] lg:h-[450px]" data-aos="fade-right">
              <Image src="/images/hero-bg.webp" alt="RehabVet clinic interior" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="space-y-6" data-aos="fade-left">
              <SectionHeader
                className="text-left"
                subtitle="About Us"
                title="RehabVet's Purpose"
                subtitleClass="!justify-start"
              />
              <p className="text-lg leading-relaxed">
                <strong>REHABVET CLINIC</strong> is Singapore&apos;s first full-fledged animal rehabilitation clinic.
                With our team of well-trained and experienced veterinarians and therapists, the comprehensive facility
                offers the widest range of rehabilitation modalities to all animals.
              </p>
              <Button text="Make An Appointment" href="/contact" as="link" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section>
        <div className="container">
          <SectionHeader
            className="text-center mb-10 lg:mb-16"
            subtitle="What We Do"
            title="Expert Rehabilitation Services"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOMEPAGE_SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[i]
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="d2c_service_card group rounded-2xl bg-white overflow-hidden border border-border_one hover:border-primary hover:shadow-lg transition-all duration-300"
                  data-aos="zoom-in"
                  data-aos-delay={200 + i * 100}
                >
                  <div className="relative h-40 overflow-hidden bg-primary_shade flex items-center justify-center">
                    <Icon className="text-primary/30 text-6xl group-hover:text-primary/50 transition-colors duration-300" />
                  </div>
                  <div className="p-6 space-y-2">
                    <h5 className="!font-bold !text-lg group-hover:text-primary transition-colors">
                      {service.title}
                    </h5>
                    <p className="text-sm line-clamp-2">{service.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Learn more &rarr;
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-12 text-center" data-aos="fade-up">
            <Button text="View All Services" href="/services" as="link" variant="inverse" />
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="!bg-primary">
        <div className="container text-center">
          <h6 className="!text-primary-900/60 mb-3" data-aos="fade-up">Our People</h6>
          <h2 className="!text-white" data-aos="fade-up" data-aos-delay={200}>Meet The RehabVet Team</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay={300}>
            Our dedicated veterinarians and therapists bring years of specialised experience to every patient.
          </p>
          <div className="mt-10" data-aos="fade-up" data-aos-delay={400}>
            <Button text="Meet the Team" href="/about" as="link" className="!bg-dark !border-dark !text-white hover:!bg-white hover:!text-dark hover:!border-white" />
          </div>
        </div>
      </section>

      {/* ── Conditions ── */}
      {conditionCategories.length > 0 && (
        <section className="!bg-white">
          <div className="container">
            <SectionHeader
              className="text-center mb-10 lg:mb-16"
              subtitle="What We Treat"
              title="Common Conditions We Rehabilitate"
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {conditionCategories.map(([cat, count], i) => (
                <Link
                  key={cat}
                  href="/conditions"
                  className={`${CATEGORY_COLORS[cat] || 'bg-gray-500'} rounded-2xl p-6 text-white hover:shadow-lg hover:scale-[1.02] transition-all`}
                  data-aos="zoom-in"
                  data-aos-delay={200 + i * 100}
                >
                  <h5 className="!text-white !font-bold">{CATEGORY_LABELS[cat] || cat}</h5>
                  <p className="mt-1 text-sm opacity-90">{count} condition{count !== 1 ? 's' : ''}</p>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center" data-aos="fade-up">
              <Button text="View All Conditions" href="/conditions" as="link" variant="inverse" />
            </div>
          </div>
        </section>
      )}

      {/* ── Blog ── */}
      {latestPosts.length > 0 && (
        <section>
          <div className="container">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 lg:mb-16 gap-4">
              <SectionHeader
                className="text-left"
                subtitle="Latest Articles"
                title="RehabVet Blog"
                subtitleClass="!justify-start"
              />
              <Button text="View All Posts" href="/blog" as="link" variant="inverse" className="hidden sm:inline-flex" />
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="d2c_blog_card group flex flex-col rounded-2xl bg-white border border-border_one overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300"
                  data-aos="zoom-in"
                  data-aos-delay={200 + i * 100}
                >
                  <div className="relative h-48 overflow-hidden bg-primary_shade">
                    <PayloadImage
                      media={post.featuredImage as Media}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {post.categories && post.categories.length > 0 && (
                      <span className="mb-2 inline-block self-start rounded-full bg-primary_shade px-3 py-0.5 text-xs font-bold text-primary">
                        {post.categories[0].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    )}
                    <h5 className="!text-lg !font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h5>
                    {post.excerpt && (
                      <p className="mt-2 flex-1 text-sm line-clamp-3">{post.excerpt}</p>
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
              <Button text="View All Posts" href="/blog" as="link" variant="inverse" />
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section className="!bg-dark">
        <div className="container text-center">
          <h2 className="animateText !text-white">Proven steps to pain free mobility.</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay={300}>
            Let our specialists build a personalised rehabilitation plan for your pet today.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay={500}>
            <div className="rounded-2xl bg-dark border border-border_one p-8">
              <h5 className="!text-primary !font-bold mb-3">Our Services</h5>
              <p className="text-gray-400 text-sm mb-6">
                Explore our full range of veterinary rehabilitation modalities.
              </p>
              <Button text="View Services" href="/services" as="link" variant="inverse" className="!text-primary !border-primary hover:!text-white" />
            </div>
            <div className="rounded-2xl bg-accent p-8">
              <h5 className="!text-white !font-bold mb-3">Contact Us</h5>
              <p className="text-white/80 text-sm mb-6">
                Book an appointment or reach out — we&apos;re here to help.
              </p>
              <Button text="Book Appointment" href="/contact" as="link" className="!bg-white !border-white !text-accent hover:!bg-primary_shade" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
