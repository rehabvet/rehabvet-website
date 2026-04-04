import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import type { Condition, Modality, BlogPost } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

const CATEGORY_LABELS: Record<string, string> = {
  developmental: 'Developmental',
  degenerative: 'Degenerative',
  orthopaedic: 'Orthopaedic',
  neurological: 'Neurological',
  cancer: 'Cancer',
}

const categoryColors: Record<string, string> = {
  developmental: 'bg-blue-100 text-blue-800',
  degenerative: 'bg-amber-100 text-amber-800',
  orthopaedic: 'bg-purple-100 text-purple-800',
  neurological: 'bg-rose-100 text-rose-800',
  cancer: 'bg-gray-100 text-gray-800',
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'conditions', limit: 100, select: { slug: true } })
    return result.docs.map((c) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'conditions', where: { slug: { equals: slug } }, limit: 1 })
    const condition = result.docs[0]
    if (!condition) return { title: 'Condition Not Found' }
    return {
      title: condition.seo?.metaTitle || condition.title,
      description: condition.seo?.metaDescription || condition.excerpt || '',
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
  }
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params
  let condition: Condition | null = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'conditions',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    condition = result.docs[0] || null
  } catch {}

  if (!condition) notFound()

  const relatedModalities = (condition.relatedModalities || []).filter((m): m is Modality => typeof m !== 'number')
  const relatedPosts = (condition.relatedPosts || []).filter((p): p is BlogPost => typeof p !== 'number')

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/conditions" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Conditions
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold sm:text-5xl">{condition.title}</h1>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${categoryColors[condition.category] || 'bg-white/20 text-white'}`}>
              {CATEGORY_LABELS[condition.category] || condition.category}
            </span>
          </div>
          {condition.excerpt && <p className="mt-4 max-w-2xl text-lg text-primary-100">{condition.excerpt}</p>}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Description */}
          {condition.description ? (
            <RichText data={condition.description} />
          ) : (
            <p className="text-gray-600 text-lg">
              Detailed information about this condition will be available soon.
            </p>
          )}

          {/* Symptoms */}
          {condition.symptoms && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Common Symptoms</h2>
              <div className="mt-4">
                <RichText data={condition.symptoms} />
              </div>
            </div>
          )}

          {/* Treatments */}
          {condition.treatments && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">How We Help</h2>
              <div className="mt-4">
                <RichText data={condition.treatments} />
              </div>
            </div>
          )}

          {/* Related Modalities */}
          {relatedModalities.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Related Modalities</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedModalities.map((modality) => (
                  <Link
                    key={modality.id}
                    href={`/modalities/${modality.slug}`}
                    className="rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                  >
                    {modality.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Blog Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
              <div className="mt-4 space-y-3">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block rounded-xl border border-gray-100 p-4 hover:bg-primary-50 hover:border-primary-200 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    {post.excerpt && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Concerned about your pet?</h2>
            <p className="mt-2 text-gray-600">Our rehabilitation team can assess your pet and create a personalised treatment plan.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="rounded-full bg-coral-500 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors">
                Book a Consultation
              </Link>
              <Link href="/conditions" className="rounded-full border border-primary-500 px-8 py-3 font-semibold text-primary-600 hover:bg-primary-50 transition-colors">
                View All Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
