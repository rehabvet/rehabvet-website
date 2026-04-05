import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { PayloadImage } from '@/components/PayloadImage'
import { RichText } from '@/components/RichText'
import type { Service, Media } from '@/payload-types'
import PagesHeader from '@/components/shared/pages-header'
import SectionHeader from '@/components/shared/section-header'
import Button from '@/components/shared/primary-button'
import type { ReactNode } from 'react'
import VeterinaryRehabilitationConsultationContent from './content/veterinary-rehabilitation-consultation'
import AnimalRehabilitationContent from './content/animal-rehabilitation'
import DogPhysiotherapyContent from './content/dog-physiotherapy'
import DogHydrotherapyContent from './content/dog-hydrotherapy'
import HbotHyperbaricOxygenTherapyAnimalsContent from './content/hbot-hyperbaric-oxygen-therapy-animals'
import TraditionalChineseVeterinaryMedicineContent from './content/traditional-chinese-veterinary-medicine'
import DogChiropracticContent from './content/dog-chiropractic'
import DogAcupunctureContent from './content/dog-acupuncture'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

/* ---------- Static fallback data matching WP ---------- */
const STATIC_SERVICES: Record<string, { title: string; excerpt: string; body: ReactNode }> = {
  'veterinary-rehabilitation-consultation': {
    title: 'Veterinary Rehabilitation Consultation',
    excerpt: 'Get your pet back on their feet with RehabVet\'s veterinary rehabilitation consultation. Let us help your pet live a healthier, happier life.',
    body: (<VeterinaryRehabilitationConsultationContent />),
  },
  'animal-rehabilitation': {
    title: 'Animal Rehabilitation',
    excerpt: 'Restore your pet\'s mobility with expert animal rehabilitation at RehabVet Singapore. Physiotherapy, hydrotherapy &amp; more.',
    body: (<AnimalRehabilitationContent />),
  },
  'dog-physiotherapy': {
    title: 'Dog Physiotherapy',
    excerpt: 'RehabVet provides physiotherapy for dogs to help them recover from injury and improve their mobility.',
    body: (<DogPhysiotherapyContent />),
  },
  'dog-hydrotherapy': {
    title: 'Hydrotherapy for Dogs',
    excerpt: 'RehabVet offers hydrotherapy treatment for dogs to help them recover from injury or surgery.',
    body: (<DogHydrotherapyContent />),
  },
  'hbot-hyperbaric-oxygen-therapy-animals': {
    title: 'Hyperbaric Oxygen Therapy for Pets',
    excerpt: 'RehabVet offers Hyperbaric Oxygen Treatment for dogs to help them recover from injury or illness.',
    body: (<HbotHyperbaricOxygenTherapyAnimalsContent />),
  },
  'traditional-chinese-veterinary-medicine': {
    title: 'Traditional Chinese Veterinary Medicine (TCVM) for Pets',
    excerpt: 'Traditional Chinese Veterinary Medicine blends acupuncture, herbal therapy and holistic care for your pet\'s wellbeing.',
    body: (<TraditionalChineseVeterinaryMedicineContent />),
  },
  'dog-chiropractic': {
    title: 'Dog Chiropractic in Singapore',
    excerpt: 'RehabVet offers chiropractic treatment for dogs to help improve mobility and reduce pain.',
    body: (<DogChiropracticContent />),
  },
  'dog-acupuncture': {
    title: 'Dog Acupuncture in Singapore',
    excerpt: 'Discover the benefits of acupuncture for pets at RehabVet to explore how this therapy helps dogs and cats find relief and wellness.',
    body: (<DogAcupunctureContent />),
  },
}

export async function generateStaticParams() {
  const staticSlugs = Object.keys(STATIC_SERVICES).map((slug) => ({ slug }))
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', limit: 100, select: { slug: true } })
    const cmsSlugs = result.docs.map((s) => ({ slug: s.slug }))
    const all = new Map<string, { slug: string }>()
    for (const s of [...staticSlugs, ...cmsSlugs]) all.set(s.slug, s)
    return [...all.values()]
  } catch {
    return staticSlugs
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const staticEntry = STATIC_SERVICES[slug]
  if (staticEntry) {
    return { title: `${staticEntry.title} | RehabVet`, description: staticEntry.excerpt }
  }
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    const service = result.docs[0]
    if (service) {
      return { title: `${service.seo?.metaTitle || service.title} | RehabVet`, description: service.seo?.metaDescription || service.excerpt || '' }
    }
  } catch {}
  return { title: 'Service Not Found' }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  let service: Service | null = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    service = result.docs[0] || null
  } catch {}

  const staticEntry = STATIC_SERVICES[slug]

  if (staticEntry) {
    return (
      <>
        <PagesHeader
          title={staticEntry.title}
          breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: staticEntry.title }]}
        />
        <section>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed mb-6" data-aos="fade-up">{staticEntry.excerpt}</p>
              <div className="prose prose-lg max-w-none">
                {staticEntry.body}
              </div>
              <div className="mt-16 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
                <h3>Interested in {staticEntry.title}?</h3>
                <p className="mt-2">Book a consultation to discuss how we can help your pet.</p>
                <div className="mt-6">
                  <Button text="Book Appointment" href="/contact" as="link" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  if (service) {
    return (
      <>
        <PagesHeader
          title={service.title}
          breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: service.title }]}
        />
        <section>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {service.excerpt && <p className="text-lg leading-relaxed mb-6" data-aos="fade-up">{service.excerpt}</p>}
              <div data-aos="fade-up" data-aos-delay={200}>
                <RichText data={service.description} />
              </div>
              {service.benefits && service.benefits.length > 0 && (
                <div className="mt-12" data-aos="fade-up">
                  <h3>Benefits</h3>
                  <ul className="mt-6 space-y-4">
                    {service.benefits.map((b, i) => (
                      <li key={b.id || i} className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary_shade text-primary">✓</span>
                        <span>{b.benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {service.faq && service.faq.length > 0 && (
                <div className="mt-12" data-aos="fade-up">
                  <h3>Frequently Asked Questions</h3>
                  <div className="mt-6 space-y-3">
                    {service.faq.map((item, i) => (
                      <details key={item.id || i} className="group rounded-xl border border-border_one bg-white">
                        <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-dark">{item.question}</summary>
                        <div className="px-5 pb-5 leading-relaxed border-t border-border_one pt-4">{item.answer}</div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-16 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
                <h3>Interested in {service.title}?</h3>
                <p className="mt-2">Book a consultation to discuss how we can help your pet.</p>
                <div className="mt-6">
                  <Button text="Book Appointment" href="/contact" as="link" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  notFound()
}
