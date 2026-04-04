import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { PayloadImage } from '@/components/PayloadImage'
import { RichText } from '@/components/RichText'
import type { Modality, Condition, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

/* ---------- Static fallback data matching WP ---------- */
const STATIC_MODALITIES: Record<string, { title: string; excerpt: string; body: string }> = {
  'manual-therapy': {
    title: 'Manual Therapy',
    excerpt: 'Hands-on techniques to help improve the mobility and function of dogs and cats.',
    body: `Manual therapy is a type of physical therapy that uses hands-on techniques to help improve the mobility and function of dogs and cats.\n\nOur manual therapy techniques include:\n• Joint mobilisation — gentle movements to improve range of motion\n• Soft tissue mobilisation — massage and myofascial release\n• Trigger point therapy — targeted pressure on muscle knots\n• Stretching — passive and active range of motion exercises\n• Lymphatic drainage — gentle massage to reduce swelling\n\nManual therapy is often used as part of a comprehensive rehabilitation programme alongside other modalities such as hydrotherapy and therapeutic exercises.`,
  },
  'physical-therapy': {
    title: 'Physical Therapy',
    excerpt: 'Rehabilitative care to help improve mobility and reduce pain in dogs and cats.',
    body: `Physical therapy for dogs is a service that provides rehabilitative care to help improve mobility and reduce pain.\n\nOur physical therapy programme includes:\n• Therapeutic exercises — targeted exercises to build strength and flexibility\n• Balance and coordination training — proprioception exercises on unstable surfaces\n• Gait training — helping pets relearn proper movement patterns\n• Endurance building — gradual conditioning programmes\n• Home exercise programmes — customised exercises for owners to continue at home\n\nPhysical therapy is beneficial for pets recovering from surgery, managing chronic conditions, or maintaining fitness and mobility as they age.`,
  },
  'class-4-therapeutic-laser': {
    title: 'Class 4 Therapeutic Laser',
    excerpt: 'Advanced laser therapy providing relief for dogs and cats suffering from various ailments.',
    body: `Our Class 4 therapeutic laser is designed to provide relief to dogs and cats suffering from a variety of ailments.\n\nHow it works:\nClass 4 laser therapy uses specific wavelengths of light to penetrate deep into tissue, stimulating cellular activity and promoting healing.\n\nBenefits include:\n• Pain relief through endorphin release\n• Reduced inflammation and swelling\n• Accelerated tissue repair and cell growth\n• Improved nerve function\n• Faster wound healing\n• Non-invasive and painless treatment\n\nConditions treated:\n• Arthritis and joint pain\n• Soft tissue injuries\n• Post-surgical healing\n• Wound management\n• Intervertebral disc disease\n• Muscle strains and sprains`,
  },
  'electrical-therapy': {
    title: 'Electrical Therapy',
    excerpt: 'TENS and NMES therapy for both cats and dogs to improve health and function.',
    body: `Electrical therapy provides non-invasive treatments using electrical stimulation for both cats and dogs.\n\nTypes of electrical therapy we offer:\n\n• TENS (Transcutaneous Electrical Nerve Stimulation) — uses low-voltage electrical currents to provide pain relief by blocking pain signals to the brain and stimulating endorphin release.\n\n• NMES (Neuromuscular Electrical Stimulation) — stimulates muscle contractions to prevent muscle atrophy, rebuild strength, and improve function in weakened or paralysed limbs.\n\nBenefits:\n• Drug-free pain management\n• Prevention of muscle wasting\n• Improved muscle strength and tone\n• Enhanced blood circulation\n• Reduced swelling\n\nElectrical therapy is commonly used alongside other rehabilitation modalities for optimal results.`,
  },
  'ultrasound-therapy': {
    title: 'Ultrasound Therapy',
    excerpt: 'Non-invasive treatment using sound waves to reduce pain and inflammation.',
    body: `Ultrasound therapy is a non-invasive treatment for dogs and cats which uses sound waves to reduce pain and inflammation.\n\nHow it works:\nTherapeutic ultrasound uses high-frequency sound waves to generate deep heat within tissues, promoting healing and reducing pain.\n\nBenefits:\n• Deep tissue heating for pain relief\n• Increased blood flow to treated areas\n• Reduced muscle spasms\n• Accelerated soft tissue healing\n• Breaking down scar tissue\n• Improved tissue extensibility\n\nCommonly used for:\n• Tendon and ligament injuries\n• Muscle strains\n• Joint stiffness\n• Chronic pain conditions\n• Post-surgical recovery`,
  },
  'extracorporeal-shockwave-therapy': {
    title: 'Extracorporeal Shockwave Therapy',
    excerpt: 'Non-invasive treatment using sound waves to help reduce pain and promote healing.',
    body: `Extracorporeal Shockwave Therapy (ESWT) is a non-invasive treatment for dogs which uses focused sound waves to help reduce pain and promote tissue healing.\n\nHow it works:\nShockwave therapy delivers high-energy acoustic waves to affected areas, stimulating the body's natural healing processes.\n\nBenefits:\n• Stimulates new blood vessel formation\n• Breaks down calcifications\n• Reduces chronic inflammation\n• Triggers tissue regeneration\n• Provides long-lasting pain relief\n\nConditions treated:\n• Chronic tendon injuries\n• Osteoarthritis\n• Non-healing fractures\n• Spondylosis\n• Hip dysplasia pain\n• Shoulder and elbow conditions`,
  },
  'tcvm-tui-na': {
    title: 'TCVM Tui Na',
    excerpt: 'Traditional Chinese massage therapy tailored for dogs, providing a holistic approach.',
    body: `Tui-Na is a traditional Chinese massage therapy specifically tailored for dogs, providing a holistic approach to their wellbeing.\n\nTui-Na techniques include:\n• Acupressure — applying pressure to specific acupuncture points\n• Rolling and kneading — stimulating blood flow and relaxing muscles\n• Range of motion exercises — gentle joint mobilisation\n\nBenefits:\n• Pain relief and muscle relaxation\n• Improved circulation and energy flow (Qi)\n• Stress reduction and calming effects\n• Enhanced mobility and flexibility\n• Complements acupuncture treatment\n\nTui-Na is often used as part of our Traditional Chinese Veterinary Medicine (TCVM) approach alongside acupuncture and herbal medicine.`,
  },
  'underwater-treadmill': {
    title: 'Underwater Treadmill',
    excerpt: 'A unique way to exercise dogs with controlled resistance and buoyancy support.',
    body: `Our underwater treadmill provides a unique and effective way to exercise dogs, allowing them to walk or run on a treadmill submerged in warm water.\n\nHow it works:\n• Water level is adjusted based on the patient's condition and goals\n• Speed and incline are controlled for optimal exercise intensity\n• Warm water (around 28-32°C) provides comfort and promotes muscle relaxation\n• Jets can be added for additional resistance\n\nBenefits:\n• Buoyancy reduces weight-bearing stress on joints by up to 60%\n• Water resistance builds muscle strength\n• Improved cardiovascular fitness\n• Enhanced range of motion\n• Safe, controlled exercise environment\n• Real-time gait observation through viewing panels\n\nIdeal for:\n• Post-surgical rehabilitation\n• Arthritis management\n• Weight loss programmes\n• Neurological rehabilitation\n• General fitness and conditioning`,
  },
  'proprioception-exercises': {
    title: 'Proprioception Exercises',
    excerpt: 'Canine proprioception exercises to help dogs with nerve damage improve mobility.',
    body: `We offer canine proprioception exercises to help dogs with nerve damage improve their mobility. Our service is tailored to the individual needs of each patient.\n\nWhat is proprioception?\nProprioception is the body's ability to sense its position and movement in space. Damage to nerves or the spinal cord can impair this sense, leading to uncoordinated movement and instability.\n\nOur proprioception exercises include:\n• Balance board training — standing and weight-shifting on unstable surfaces\n• Cavaletti poles — stepping over raised poles to improve limb awareness\n• Textured surface walking — different surfaces to stimulate nerve endings\n• Wobble cushion exercises — building core stability and coordination\n• Targeted limb placement exercises — retraining correct foot placement\n\nConditions that benefit:\n• Intervertebral disc disease (IVDD)\n• Degenerative myelopathy\n• Fibrocartilaginous embolism (FCE)\n• Post-surgical neurological recovery\n• Vestibular disease`,
  },
}

export async function generateStaticParams() {
  const staticSlugs = Object.keys(STATIC_MODALITIES).map((slug) => ({ slug }))
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'modalities', limit: 100, select: { slug: true } })
    const cmsSlugs = result.docs.map((m) => ({ slug: m.slug }))
    const all = new Map<string, { slug: string }>()
    for (const s of [...staticSlugs, ...cmsSlugs]) all.set(s.slug, s)
    return [...all.values()]
  } catch {
    return staticSlugs
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const staticEntry = STATIC_MODALITIES[slug]
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'modalities', where: { slug: { equals: slug } }, limit: 1 })
    const mod = result.docs[0]
    if (mod) {
      return { title: `${mod.seo?.metaTitle || mod.title} | RehabVet`, description: mod.seo?.metaDescription || mod.excerpt || '' }
    }
  } catch {}
  if (staticEntry) {
    return { title: `${staticEntry.title} | RehabVet`, description: staticEntry.excerpt }
  }
  return { title: 'Modality Not Found' }
}

export default async function ModalityPage({ params }: Props) {
  const { slug } = await params
  let modality: Modality | null = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'modalities', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
    modality = result.docs[0] || null
  } catch {}

  const staticEntry = STATIC_MODALITIES[slug]

  /* CMS version */
  if (modality) {
    const conditionsTreated = (modality.conditionsTreated || []).filter((c): c is Condition => typeof c !== 'number')
    return (
      <>
        <section className="relative bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 text-white">
          {modality.image && typeof modality.image !== 'number' && modality.image.url && (
            <div className="absolute inset-0 overflow-hidden">
              <PayloadImage media={modality.image} fill sizes="100vw" className="opacity-20" priority />
            </div>
          )}
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Link href="/modalities" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Modalities
            </Link>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{modality.title}</h1>
            {modality.excerpt && <p className="mt-4 max-w-2xl text-lg text-primary-100">{modality.excerpt}</p>}
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RichText data={modality.description} />
            {modality.howItWorks && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
                <div className="mt-4"><RichText data={modality.howItWorks} /></div>
              </div>
            )}
            {conditionsTreated.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">Conditions Treated</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {conditionsTreated.map((c) => (
                    <Link key={c.id} href={`/conditions/${c.slug}`} className="rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors">{c.title}</Link>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Want to learn more?</h2>
              <p className="mt-2 text-gray-600">Contact us to find out if this treatment is right for your pet.</p>
              <Link href="/contact" className="mt-6 inline-block rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors">Book Appointment</Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  /* Static fallback */
  if (!staticEntry) notFound()

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Link href="/modalities" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Modalities
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
            <h2 className="text-2xl font-bold text-gray-900">Want to learn more about {staticEntry.title}?</h2>
            <p className="mt-2 text-gray-600">Contact us to find out if this treatment is right for your pet.</p>
            <Link href="/contact" className="mt-6 inline-block rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors">Book Appointment</Link>
          </div>
        </div>
      </section>
    </>
  )
}
