import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

type Props = { params: Promise<{ slug: string }> }

const categoryColors: Record<string, string> = {
  Developmental: 'bg-blue-100 text-blue-800',
  Degenerative: 'bg-amber-100 text-amber-800',
  Orthopaedic: 'bg-purple-100 text-purple-800',
  Neurological: 'bg-rose-100 text-rose-800',
  Cancer: 'bg-gray-100 text-gray-800',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'conditions',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const condition = result.docs[0]
    if (!condition) return { title: 'Condition Not Found' }
    return {
      title: (condition.seo as any)?.metaTitle || condition.title,
      description: (condition.seo as any)?.metaDescription || condition.excerpt || '',
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
  }
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params
  let condition: any = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'conditions',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    condition = result.docs[0]
  } catch {
    // DB not available
  }

  const title = condition?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
  const category = condition?.category || null
  const summary = condition?.excerpt || ''
  const description = condition?.description || ''
  const symptoms: string[] = condition?.symptoms || []
  const treatments: string[] = condition?.treatments || []
  const relatedModalities: any[] = condition?.relatedModalities || []

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/conditions" className="text-primary-200 hover:text-white text-sm">
            &larr; Back to Conditions
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
            {category && (
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${categoryColors[category] || 'bg-white/20 text-white'}`}
              >
                {category}
              </span>
            )}
          </div>
          {summary && <p className="mt-4 max-w-2xl text-lg text-primary-100">{summary}</p>}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {description ? (
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{description}</p>
            </div>
          ) : (
            <p className="text-gray-600 text-lg">
              Detailed information about this condition will be available soon. Our team is experienced
              in managing this condition and can provide a tailored rehabilitation plan.
            </p>
          )}

          {symptoms.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Common Symptoms</h2>
              <ul className="mt-4 space-y-3">
                {symptoms.map((symptom: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-coral-400 font-bold">&#8226;</span>
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {treatments.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">How We Help</h2>
              <ul className="mt-4 space-y-3">
                {treatments.map((treatment: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">&#10003;</span>
                    <span className="text-gray-700">{treatment}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedModalities.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Related Modalities</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedModalities.map((modality: any, i: number) => (
                  <Link
                    key={i}
                    href={`/modalities/${modality.slug || modality}`}
                    className="rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                  >
                    {modality.title || modality}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Concerned about your pet?</h2>
            <p className="mt-2 text-gray-600">
              Our rehabilitation team can assess your pet and create a personalised treatment plan.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-coral-400 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
              >
                Book a Consultation
              </Link>
              <Link
                href="/conditions"
                className="rounded-full border border-primary-500 px-8 py-3 font-semibold text-primary-500 hover:bg-primary-50 transition-colors"
              >
                View All Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
