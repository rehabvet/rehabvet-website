import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { PayloadImage } from '@/components/PayloadImage'
import { RichText } from '@/components/RichText'
import type { Service, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

/* ---------- Static fallback data matching WP ---------- */
const STATIC_SERVICES: Record<string, { title: string; excerpt: string; body: string }> = {
  'veterinary-rehabilitation-consultation': {
    title: 'Veterinary Rehabilitation Consultation',
    excerpt: 'Get your pet back on their feet with RehabVet\'s veterinary rehabilitation consultation. Let us help your pet live a healthier, happier life.',
    body: `A Veterinary Rehabilitation Consultation is a comprehensive assessment of your pet's condition by our experienced rehabilitation veterinarian. During the consultation, we will review your pet's medical history, perform a thorough physical and neurological examination, and develop a personalised rehabilitation plan.\n\nOur rehabilitation consultations cover:\n• Comprehensive musculoskeletal assessment\n• Neurological examination\n• Gait and posture analysis\n• Pain assessment\n• Range of motion evaluation\n• Muscle mass measurement\n• Personalised treatment plan development\n\nWhether your pet is recovering from surgery, managing a chronic condition, or needs help with mobility issues, our consultation is the first step toward better health.`,
  },
  'animal-rehabilitation': {
    title: 'Animal Rehabilitation',
    excerpt: 'Restore your pet\'s mobility with expert animal rehabilitation at RehabVet Singapore. Physiotherapy, hydrotherapy & more.',
    body: `Animal rehabilitation is the process of restoring an animal to its optimal physical and mental health through medical and behavioural interventions. Our rehabilitation programmes are tailored to each patient's specific needs and goals.\n\nRehabilitation can help with:\n• Post-surgical recovery (TPLO, fracture repair, spinal surgery)\n• Chronic pain management\n• Neurological conditions (IVDD, FCE, degenerative myelopathy)\n• Orthopaedic conditions (arthritis, hip dysplasia)\n• Weight management\n• Geriatric care and mobility maintenance\n• Sports conditioning and injury prevention\n\nOur approach combines multiple modalities including physiotherapy, hydrotherapy, acupuncture, and therapeutic exercises to achieve the best outcomes for your pet.`,
  },
  'dog-physiotherapy': {
    title: 'Dog Physiotherapy',
    excerpt: 'RehabVet provides physiotherapy for dogs to help them recover from injury and improve their mobility.',
    body: `Dog physiotherapy is a specialist service which provides tailored treatments to help improve the mobility and wellbeing of dogs. It is a great way to ensure your pet is in the best possible health.\n\nOur physiotherapy services include:\n• Therapeutic exercises and stretching\n• Manual therapy and joint mobilisation\n• Massage therapy\n• Balance and proprioception training\n• Strength and conditioning programmes\n• Home exercise programme design\n\nPhysiotherapy is beneficial for dogs recovering from surgery, managing chronic conditions like arthritis, or those who need help maintaining mobility as they age. Our certified therapists work closely with your primary veterinarian to ensure coordinated care.`,
  },
  'dog-hydrotherapy': {
    title: 'Hydrotherapy for Dogs',
    excerpt: 'RehabVet offers hydrotherapy treatment for dogs to help them recover from injury or surgery.',
    body: `Hydrotherapy for dogs is a beneficial service that can help to improve the mobility and well-being of our canine companions. It is a great way to provide a natural and holistic approach to rehabilitation.\n\nOur hydrotherapy facilities include:\n• Underwater treadmill — allows controlled exercise with adjustable water levels and speed\n• Warm water therapy — promotes muscle relaxation and pain relief\n\nBenefits of hydrotherapy:\n• Reduced joint stress due to buoyancy\n• Increased muscle strength without overloading joints\n• Improved cardiovascular fitness\n• Enhanced range of motion\n• Pain relief through warm water immersion\n• Faster post-surgical recovery\n\nAll hydrotherapy sessions are supervised by our certified hydrotherapists trained at Greyfriars, UK.`,
  },
  'hbot-hyperbaric-oxygen-therapy-animals': {
    title: 'Hyperbaric Oxygen Therapy for Pets',
    excerpt: 'RehabVet offers Hyperbaric Oxygen Treatment for dogs to help them recover from injury or illness.',
    body: `Hyperbaric Oxygen Treatment (HBOT) is a medical procedure that provides animals with increased oxygen levels in a pressurised chamber, which can help to improve their overall health and wellbeing.\n\nHBOT is used to treat:\n• Wound healing and tissue repair\n• Post-surgical recovery\n• Neurological conditions\n• Inflammation reduction\n• Snake and insect bites\n• Smoke inhalation\n• Intervertebral disc disease\n\nDuring treatment, your pet rests comfortably in a specially designed hyperbaric chamber while breathing pure oxygen at increased pressure. This increases the amount of oxygen delivered to damaged tissues, promoting faster healing and recovery.\n\nRehabVet is one of the few veterinary facilities in Singapore offering HBOT for animals.`,
  },
  'traditional-chinese-veterinary-medicine': {
    title: 'Traditional Chinese Veterinary Medicine (TCVM) for Pets',
    excerpt: 'Traditional Chinese Veterinary Medicine blends acupuncture, herbal therapy and holistic care for your pet\'s wellbeing.',
    body: `Traditional Chinese Veterinary Medicine (TCVM) provides a holistic approach to pet care, combining ancient Chinese wisdom with modern veterinary science.\n\nOur TCVM services include:\n• Acupuncture — stimulates specific points to promote healing and pain relief\n• Herbal medicine — customised herbal formulations for various conditions\n• Tui-Na massage — traditional Chinese massage for pain relief and relaxation\n• Food therapy — dietary recommendations based on TCM principles\n\nTCVM can help with:\n• Chronic pain and arthritis\n• Neurological conditions\n• Gastrointestinal disorders\n• Skin conditions\n• Anxiety and behavioural issues\n• Cancer support\n• Geriatric wellness\n\nDr Sara Lam is a Certified Veterinary Acupuncturist (CVA) with extensive training in TCVM.`,
  },
  'dog-chiropractic': {
    title: 'Dog Chiropractic in Singapore',
    excerpt: 'RehabVet offers chiropractic treatment for dogs to help improve mobility and reduce pain.',
    body: `Chiropractic treatment is a holistic approach to canine health, providing a non-invasive and drug-free way to improve the well-being of our four-legged friends.\n\nChiropractic care involves:\n• Spinal assessment and adjustment\n• Joint mobilisation\n• Soft tissue techniques\n• Posture correction\n\nConditions that benefit from chiropractic care:\n• Back pain and stiffness\n• Neck pain\n• Gait abnormalities\n• Reduced performance in sporting dogs\n• Post-surgical rehabilitation\n• Age-related mobility issues\n\nChiropractic care works well alongside other rehabilitation modalities to provide comprehensive treatment for your pet.`,
  },
  'dog-acupuncture': {
    title: 'Dog Acupuncture in Singapore',
    excerpt: 'Discover the benefits of acupuncture for pets at RehabVet to explore how this therapy helps dogs and cats find relief and wellness.',
    body: `Veterinary acupuncture is a specialised treatment that involves inserting fine needles into specific points on the body to stimulate healing and provide pain relief.\n\nAcupuncture is effective for:\n• Chronic pain and arthritis\n• Intervertebral disc disease (IVDD)\n• Neurological conditions\n• Post-surgical pain management\n• Muscle spasms and trigger points\n• Gastrointestinal disorders\n• Geriatric wellness\n\nOur approach:\n• Dry needling — fine needle insertion at specific acupuncture points\n• Electroacupuncture — mild electrical stimulation through needles for enhanced effect\n• Aquapuncture — injection of vitamin B12 or saline at acupuncture points\n\nDr Sara Lam is a Certified Veterinary Acupuncturist (CVA) trained at the Chi Institute.`,
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
  /* Static data takes precedence (verified against WP) */
  if (staticEntry) {
    return { title: `${staticEntry.title} | RehabVet`, description: staticEntry.excerpt }
  }
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    const service = result.docs[0]
    if (service) {
      return {
        title: `${service.seo?.metaTitle || service.title} | RehabVet`,
        description: service.seo?.metaDescription || service.excerpt || '',
      }
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

  /* Static data takes precedence (verified against WP) */
  if (staticEntry) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 text-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Link href="/services" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Services
            </Link>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{staticEntry.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-primary-100">{staticEntry.excerpt}</p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              {staticEntry.body.split('\n\n').map((para, i) => (
                <p key={i} className="whitespace-pre-line">{para}</p>
              ))}
            </div>
            <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Interested in {staticEntry.title}?</h2>
              <p className="mt-2 text-gray-600">Book a consultation to discuss how we can help your pet.</p>
              <Link href="/contact" className="mt-6 inline-block rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors">Book Appointment</Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  /* CMS fallback for slugs not in static data */
  if (service) {
    return (
      <>
        <section className="relative bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 text-white">
          {service.heroImage && typeof service.heroImage !== 'number' && service.heroImage.url && (
            <div className="absolute inset-0 overflow-hidden">
              <PayloadImage media={service.heroImage} fill sizes="100vw" className="opacity-20" priority />
            </div>
          )}
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Link href="/services" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Services
            </Link>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{service.title}</h1>
            {service.excerpt && <p className="mt-4 max-w-2xl text-lg text-primary-100">{service.excerpt}</p>}
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RichText data={service.description} />
            {service.benefits && service.benefits.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">Benefits</h2>
                <ul className="mt-6 space-y-4">
                  {service.benefits.map((b, i) => (
                    <li key={b.id || i} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">✓</span>
                      <span className="text-gray-700">{b.benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.faq && service.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                <div className="mt-6 space-y-3">
                  {service.faq.map((item, i) => (
                    <details key={item.id || i} className="group rounded-xl border border-gray-200 bg-white">
                      <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-gray-900">{item.question}</summary>
                      <div className="px-5 pb-5 text-gray-600 leading-relaxed">{item.answer}</div>
                    </details>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Interested in {service.title}?</h2>
              <p className="mt-2 text-gray-600">Book a consultation to discuss how we can help your pet.</p>
              <Link href="/contact" className="mt-6 inline-block rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors">Book Appointment</Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  /* No static entry and no CMS entry */
  notFound()
}
