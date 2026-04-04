import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { PayloadImage } from '@/components/PayloadImage'
import { RichText } from '@/components/RichText'
import type { BlogPost, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

const CATEGORY_LABELS: Record<string, string> = {
  'pet-rehabilitation': 'Pet Rehabilitation',
  'animal-physiotherapy': 'Animal Physiotherapy',
  'hydrotherapy': 'Hydrotherapy',
  'acupuncture': 'Acupuncture',
  'cost-pricing': 'Cost & Pricing',
  'diet-weight': 'Diet & Weight',
  'luxating-patella': 'Luxating Patella',
  'neurology': 'Neurology',
  'tcvm': 'TCVM',
  'general': 'General',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'blog-posts', limit: 200, select: { slug: true } })
    return result.docs.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'blog-posts', where: { slug: { equals: slug } }, limit: 1 })
    const post = result.docs[0]
    if (!post) return { title: 'Post Not Found' }
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt || '',
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post: BlogPost | null = null
  let relatedPosts: BlogPost[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'blog-posts', where: { slug: { equals: slug } }, limit: 1 })
    post = result.docs[0] || null

    if (post && post.categories && post.categories.length > 0) {
      const related = await payload.find({
        collection: 'blog-posts',
        where: {
          and: [
            { slug: { not_equals: slug } },
            { categories: { contains: post.categories[0] } },
          ],
        },
        limit: 3,
        sort: '-date',
      })
      relatedPosts = related.docs
    }
  } catch {}

  if (!post) notFound()

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Blog
          </Link>
          {post.categories && post.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${cat}`}
                  className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
                >
                  {CATEGORY_LABELS[cat] || cat}
                </Link>
              ))}
            </div>
          )}
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-lg text-primary-100">{post.excerpt}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-200">
            {post.author && <span>By {post.author}</span>}
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {post.featuredImage && typeof post.featuredImage !== 'number' && post.featuredImage.url && (
            <div className="mb-12 relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
              <PayloadImage
                media={post.featuredImage}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* Content */}
          {post.content ? (
            <RichText data={post.content} />
          ) : (
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>This article is being prepared and will be published shortly.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 flex flex-col gap-6 rounded-2xl bg-primary-50 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-gray-900">Ready to help your pet?</p>
              <p className="mt-1 text-sm text-gray-600">Book a rehabilitation consultation with our team.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-full bg-accent-500 px-8 py-3 text-center font-semibold text-white hover:bg-accent-600 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <PayloadImage
                        media={related.featuredImage as Media}
                        fill
                        sizes="(max-width: 640px) 100vw, 250px"
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2">{related.title}</h3>
                      <p className="mt-1 text-xs text-gray-400">{formatDate(related.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
