import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { PayloadImage } from '@/components/PayloadImage'
import { RichText } from '@/components/RichText'
import type { BlogPost, Media } from '@/payload-types'
import Button from '@/components/shared/primary-button'
import { FaPaw } from 'react-icons/fa'

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

function getImageUrl(media: Media | number | null | undefined): string | null {
  if (!media || typeof media === 'number') return null
  return (media as Media).url || null
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

  const featuredImgUrl = getImageUrl(post.featuredImage as Media)

  return (
    <>
      {/* ── Page header ── */}
      <div className="bg-primary_bg py-6 md:py-8 xl:py-12 z-10 relative">
        <div className="container">
          <div className="py-10 md:py-14 xl:py-20 bg-primary_shade rounded-[30px] text-center space-y-4 px-6 md:px-12">
            {/* Breadcrumb */}
            <p className="text-sm font-semibold text-dark/60">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </p>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {post.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/blog?category=${cat}`}
                    className="rounded-full bg-white border border-border_one px-4 py-1 text-xs font-bold text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  >
                    {CATEGORY_LABELS[cat] || cat}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="animateText !text-3xl md:!text-4xl xl:!text-5xl max-w-4xl mx-auto">{post.title}</h1>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-text_color/70">
              <span className="flex items-center gap-1">
                <FaPaw className="text-primary text-xs" />
                {post.author || 'RehabVet'}
              </span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <section>
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {/* Featured Image */}
            {featuredImgUrl && (
              <div className="mb-10 relative aspect-[16/9] w-full rounded-2xl overflow-hidden" data-aos="fade-up">
                <Image
                  src={featuredImgUrl}
                  alt={(post.featuredImage as Media)?.alt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Body */}
            <div data-aos="fade-up" data-aos-delay={100}>
              {post.content ? (
                <RichText data={post.content} />
              ) : (
                <p className="text-lg text-text_color leading-relaxed">
                  This article is being prepared and will be published shortly.
                </p>
              )}
            </div>

            {/* Inline CTA */}
            <div className="mt-14 rounded-2xl bg-primary_shade border border-border_one p-8 flex flex-col sm:flex-row items-center gap-6" data-aos="fade-up">
              <div className="flex-1">
                <h5 className="!font-bold">Ready to help your pet?</h5>
                <p className="mt-1 text-sm">Book a rehabilitation consultation with our team.</p>
              </div>
              <Button text="Book Now" href="/contact" as="link" className="shrink-0" />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16" data-aos="fade-up">
                <div className="flex items-center gap-2 mb-6">
                  <FaPaw className="text-primary" />
                  <h5 className="!font-bold">Related Articles</h5>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {relatedPosts.map((related) => {
                    const relatedImgUrl = getImageUrl(related.featuredImage as Media)
                    return (
                      <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="group rounded-2xl border border-border_one overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative h-32 overflow-hidden bg-primary_shade">
                          {relatedImgUrl ? (
                            <Image
                              src={relatedImgUrl}
                              alt={related.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 250px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-primary/40 text-xs">RehabVet</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors line-clamp-2">{related.title}</p>
                          <p className="mt-1 text-xs text-text_color/60">{formatDate(related.date)}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-10" data-aos="fade-up">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
