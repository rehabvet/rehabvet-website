import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { BlogPost, Media } from '@/payload-types'
import PagesHeader from '@/components/shared/pages-header'
import Button from '@/components/shared/primary-button'
import { FaPaw } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | RehabVet',
  description: 'Expert advice, rehabilitation tips, and pet health articles from the RehabVet team.',
}

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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const { page: pageParam, category } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10))
  const perPage = 9

  let posts: BlogPost[] = []
  let totalPages = 1
  let allCategories: string[] = []
  let categoryCounts: Record<string, number> = {}

  try {
    const payload = await getPayload({ config })

    const where: any = {}
    if (category && category !== 'all') {
      where.categories = { contains: category }
    }

    const result = await payload.find({
      collection: 'blog-posts',
      limit: perPage,
      page: currentPage,
      sort: '-date',
      where,
      depth: 1,
    })
    posts = result.docs
    totalPages = result.totalPages

    const allPosts = await payload.find({
      collection: 'blog-posts',
      limit: 500,
      select: { categories: true } as any,
      depth: 0,
    })
    const catSet = new Set<string>()
    allPosts.docs.forEach((p: any) => {
      p.categories?.forEach((c: string) => {
        catSet.add(c)
        categoryCounts[c] = (categoryCounts[c] || 0) + 1
      })
    })
    allCategories = Array.from(catSet).sort((a, b) => (categoryCounts[b] || 0) - (categoryCounts[a] || 0))
  } catch (e) {
    console.error('Blog page error:', e)
  }

  const totalPostCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0)

  return (
    <>
      <PagesHeader
        title="RehabVet Blog"
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Blog' }]}
      />

      <section>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

            {/* ── Main post grid ── */}
            <div className="flex-1 min-w-0">
              {posts.length === 0 ? (
                <p className="text-center text-text_color py-16">No posts found.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post, i) => {
                      const imgUrl = getImageUrl(post.featuredImage as Media)
                      const firstCat = post.categories?.[0]
                      return (
                        <article
                          key={post.id}
                          className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border_one hover:border-primary hover:shadow-lg transition-all duration-300"
                          data-aos="zoom-in"
                          data-aos-delay={100 + i * 50}
                        >
                          <Link href={`/blog/${post.slug}`} className="relative block h-52 overflow-hidden bg-primary_shade">
                            {imgUrl ? (
                              <Image
                                src={imgUrl}
                                alt={(post.featuredImage as Media)?.alt || post.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-primary/40 text-sm font-semibold tracking-wide">RehabVet</span>
                              </div>
                            )}
                          </Link>

                          <div className="flex flex-1 flex-col p-6 space-y-3">
                            {firstCat && (
                              <span className="self-start rounded-full bg-primary_shade px-3 py-0.5 text-xs font-bold text-primary">
                                {CATEGORY_LABELS[firstCat] || firstCat}
                              </span>
                            )}
                            <Link href={`/blog/${post.slug}`}>
                              <h5 className="!text-lg !font-bold group-hover:text-primary transition-colors line-clamp-2 !leading-snug">
                                {post.title}
                              </h5>
                            </Link>
                            {post.excerpt && (
                              <p className="text-sm line-clamp-3 flex-1">{post.excerpt}</p>
                            )}
                            <div className="flex items-center justify-between pt-2 border-t border-border_one">
                              <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="text-sm font-semibold text-primary hover:text-primary-700 transition-colors"
                              >
                                Read More »
                              </Link>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="mt-12 flex justify-center flex-wrap gap-2">
                      {currentPage > 1 && (
                        <Link
                          href={`/blog?page=${currentPage - 1}${category ? `&category=${category}` : ''}`}
                          className="rounded-full px-5 py-2 text-sm font-semibold border border-border_one text-dark hover:border-primary hover:text-primary transition-colors"
                        >
                          ← Prev
                        </Link>
                      )}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                          key={p}
                          href={`/blog?page=${p}${category ? `&category=${category}` : ''}`}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                            p === currentPage
                              ? 'bg-primary text-white border border-primary'
                              : 'border border-border_one text-dark hover:border-primary hover:text-primary'
                          }`}
                        >
                          {p}
                        </Link>
                      ))}
                      {currentPage < totalPages && (
                        <Link
                          href={`/blog?page=${currentPage + 1}${category ? `&category=${category}` : ''}`}
                          className="rounded-full px-5 py-2 text-sm font-semibold border border-border_one text-dark hover:border-primary hover:text-primary transition-colors"
                        >
                          Next →
                        </Link>
                      )}
                    </nav>
                  )}
                </>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-8">

              {/* Search */}
              <div className="bg-white rounded-2xl border border-border_one p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaPaw className="text-primary" />
                  <p className="text-sm font-bold uppercase tracking-wider text-dark">Search</p>
                </div>
                <form action="/blog" method="get" className="flex gap-2">
                  <input
                    name="q"
                    type="text"
                    placeholder="Search articles..."
                    className="flex-1 border border-border_one rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Go
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl border border-border_one p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaPaw className="text-primary" />
                  <p className="text-sm font-bold uppercase tracking-wider text-dark">Blog Categories</p>
                </div>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/blog"
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${!category ? 'bg-primary_shade text-primary font-semibold' : 'text-text_color hover:bg-primary_shade hover:text-primary'}`}
                    >
                      <span>All Posts</span>
                      <span className="text-xs font-semibold">{totalPostCount}</span>
                    </Link>
                  </li>
                  {allCategories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/blog?category=${cat}`}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${category === cat ? 'bg-primary_shade text-primary font-semibold' : 'text-text_color hover:bg-primary_shade hover:text-primary'}`}
                      >
                        <span>{CATEGORY_LABELS[cat] || cat}</span>
                        <span className="text-xs font-semibold">{categoryCounts[cat] || 0}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-primary rounded-2xl p-6 text-white text-center space-y-3">
                <FaPaw className="text-white/60 text-2xl mx-auto" />
                <h6 className="!text-white !font-bold">Book a Consultation</h6>
                <p className="text-sm text-white/80">Help your pet recover with expert rehabilitation care.</p>
                <Button
                  text="Contact Us"
                  href="/contact"
                  as="link"
                  className="!bg-white !border-white !text-primary hover:!bg-primary_shade !w-full justify-center"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
