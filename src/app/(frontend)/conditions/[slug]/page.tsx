import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import type { Condition, Modality, BlogPost } from '@/payload-types'
import PagesHeader from '@/components/shared/pages-header'
import Button from '@/components/shared/primary-button'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

const CATEGORY_LABELS: Record<string, string> = {
  developmental: 'Developmental',
  degenerative: 'Degenerative',
  orthopaedic: 'Orthopaedic',
  neurological: 'Neurological',
  cancer: 'Cancer',
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
    return { title: condition.seo?.metaTitle || condition.title, description: condition.seo?.metaDescription || condition.excerpt || '' }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
  }
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params
  let condition: Condition | null = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'conditions', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
    condition = result.docs[0] || null
  } catch {}

  if (!condition) notFound()

  const relatedModalities = (condition.relatedModalities || []).filter((m): m is Modality => typeof m !== 'number')
  const relatedPosts = (condition.relatedPosts || []).filter((p): p is BlogPost => typeof p !== 'number')

  return (
    <>
      <PagesHeader
        title={condition.title}
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Conditions', href: '/conditions' },
          { name: condition.title },
        ]}
      />

      <section>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6" data-aos="fade-up">
              <span className="inline-block rounded-full bg-primary_shade px-4 py-1 text-sm font-semibold text-primary">
                {CATEGORY_LABELS[condition.category] || condition.category}
              </span>
            </div>

            {condition.excerpt && <p className="text-lg leading-relaxed mb-6" data-aos="fade-up">{condition.excerpt}</p>}

            {condition.description ? (
              <div data-aos="fade-up" data-aos-delay={200}><RichText data={condition.description} /></div>
            ) : (
              <p className="text-lg" data-aos="fade-up">Detailed information about this condition will be available soon.</p>
            )}

            {condition.symptoms && (
              <div className="mt-12" data-aos="fade-up">
                <h3>Common Symptoms</h3>
                <div className="mt-4"><RichText data={condition.symptoms} /></div>
              </div>
            )}

            {condition.treatments && (
              <div className="mt-12" data-aos="fade-up">
                <h3>How We Help</h3>
                <div className="mt-4"><RichText data={condition.treatments} /></div>
              </div>
            )}

            {relatedModalities.length > 0 && (
              <div className="mt-12" data-aos="fade-up">
                <h3>Related Modalities</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {relatedModalities.map((modality) => (
                    <Link key={modality.id} href={`/modalities/${modality.slug}`} className="rounded-full border border-primary bg-primary_shade px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors">
                      {modality.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div className="mt-12" data-aos="fade-up">
                <h3>Related Articles</h3>
                <div className="mt-4 space-y-3">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block rounded-xl border border-border_one p-4 hover:bg-primary_shade hover:border-primary transition-colors">
                      <h5 className="!text-base !font-bold">{post.title}</h5>
                      {post.excerpt && <p className="mt-1 text-sm line-clamp-2">{post.excerpt}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
              <h3>Concerned about your pet?</h3>
              <p className="mt-2">Our rehabilitation team can assess your pet and create a personalised treatment plan.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button text="Book a Consultation" href="/contact" as="link" />
                <Button text="View All Conditions" href="/conditions" as="link" variant="inverse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
