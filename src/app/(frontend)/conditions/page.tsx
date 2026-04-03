import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'Conditions We Treat',
  description: 'RehabVet treats a wide range of conditions including developmental, degenerative, orthopaedic, neurological, and cancer-related conditions in animals.',
}

const CATEGORIES = ['Developmental', 'Degenerative', 'Orthopaedic', 'Neurological', 'Cancer'] as const

const defaultConditions: Record<string, { title: string; slug: string; excerpt: string }[]> = {
  Developmental: [
    { title: 'Hip Dysplasia', slug: 'hip-dysplasia', excerpt: 'Abnormal development of the hip joint leading to pain and reduced mobility.' },
    { title: 'Elbow Dysplasia', slug: 'elbow-dysplasia', excerpt: 'A group of developmental abnormalities of the elbow joint common in large breeds.' },
    { title: 'Osteochondrosis (OCD)', slug: 'osteochondrosis', excerpt: 'A developmental condition affecting cartilage growth in young animals.' },
  ],
  Degenerative: [
    { title: 'Osteoarthritis', slug: 'osteoarthritis', excerpt: 'Progressive joint disease causing cartilage breakdown, pain, and stiffness.' },
    { title: 'Degenerative Myelopathy', slug: 'degenerative-myelopathy', excerpt: 'A progressive spinal cord disease affecting the hind limbs in dogs.' },
    { title: 'Spondylosis Deformans', slug: 'spondylosis-deformans', excerpt: 'Bony spurs that form along the spine, often causing stiffness and discomfort.' },
  ],
  Orthopaedic: [
    { title: 'Cruciate Ligament Rupture', slug: 'cruciate-ligament-rupture', excerpt: 'Tearing of the cranial cruciate ligament in the knee, a common injury in dogs.' },
    { title: 'Fracture Rehabilitation', slug: 'fracture-rehabilitation', excerpt: 'Post-surgical or conservative rehabilitation following bone fractures.' },
    { title: 'Luxating Patella', slug: 'luxating-patella', excerpt: 'Dislocation of the kneecap causing intermittent lameness and discomfort.' },
  ],
  Neurological: [
    { title: 'Intervertebral Disc Disease (IVDD)', slug: 'ivdd', excerpt: 'Disc herniation pressing on the spinal cord, causing pain or paralysis.' },
    { title: 'Fibrocartilaginous Embolism (FCE)', slug: 'fce', excerpt: 'A spinal stroke causing sudden onset weakness or paralysis.' },
    { title: 'Wobbler Syndrome', slug: 'wobbler-syndrome', excerpt: 'Spinal cord compression in the neck causing an unsteady gait in dogs.' },
  ],
  Cancer: [
    { title: 'Post-Amputation Rehabilitation', slug: 'post-amputation-rehabilitation', excerpt: 'Helping animals regain strength and mobility following limb amputation.' },
    { title: 'Cancer-Related Pain Management', slug: 'cancer-pain-management', excerpt: 'Multi-modal approaches to improve quality of life in cancer patients.' },
    { title: 'Post-Surgical Oncology Recovery', slug: 'oncology-recovery', excerpt: 'Rehabilitation support following surgical tumour removal.' },
  ],
}

const categoryColors: Record<string, string> = {
  Developmental: 'bg-blue-100 text-blue-800',
  Degenerative: 'bg-amber-100 text-amber-800',
  Orthopaedic: 'bg-purple-100 text-purple-800',
  Neurological: 'bg-rose-100 text-rose-800',
  Cancer: 'bg-gray-100 text-gray-800',
}

export default async function ConditionsPage() {
  let conditions: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'conditions', limit: 100, sort: 'title' })
    conditions = result.docs
  } catch {
    // DB not available yet
  }

  const groupedConditions: Record<string, { title: string; slug: string; excerpt: string }[]> =
    conditions.length > 0
      ? CATEGORIES.reduce(
          (acc, cat) => {
            acc[cat] = conditions
              .filter((c: any) => c.category === cat)
              .map((c: any) => ({ title: c.title, slug: c.slug, excerpt: c.excerpt || '' }))
            return acc
          },
          {} as Record<string, { title: string; slug: string; excerpt: string }[]>,
        )
      : defaultConditions

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Conditions We Treat</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Our experienced team treats a broad range of conditions across all life stages. Browse by
            category to learn how rehabilitation can help your pet.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {CATEGORIES.map((category) => {
            const items = groupedConditions[category] || []
            if (items.length === 0) return null
            return (
              <div key={category}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${categoryColors[category]}`}>
                    {items.length} condition{items.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((condition) => (
                    <Link
                      key={condition.slug}
                      href={`/conditions/${condition.slug}`}
                      className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                    >
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[category]}`}
                      >
                        {category}
                      </span>
                      <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                        {condition.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{condition.excerpt}</p>
                      <span className="mt-4 inline-block text-sm font-medium text-primary-500 group-hover:text-primary-700">
                        Learn more &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-primary-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Not sure if we can help?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Contact our team and we&apos;ll discuss whether rehabilitation is right for your pet.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-coral-400 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
