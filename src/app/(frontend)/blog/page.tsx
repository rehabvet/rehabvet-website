import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { BlogPost, Media } from '@/payload-types'

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

    // Get all posts for category counts
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
    allCategories = Array.from(catSet).sort((a, b) =>
      (categoryCounts[b] || 0) - (categoryCounts[a] || 0)
    )
  } catch (e) {
    console.error('Blog page error:', e)
  }

  return (
    <>
      {/* Hero — full width with background image */}
      <section className="relative bg-gray-800 py-24 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://rehabvet.com/wp-content/uploads/2026/02/dog-physiotherapy-singapore-featured.jpg')" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">RehabVet Blog</h1>
          <p className="mt-3 text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-accent-400">Blog</span>
          </p>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {posts.length === 0 ? (
                <p className="text-center text-gray-500 py-16">No posts found.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post) => {
                      const imgUrl = getImageUrl(post.featuredImage as Media)
                      const firstCat = post.categories?.[0]
                      return (
                        <article
                          key={post.id}
                          className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                          {/* Image */}
                          <Link href={`/blog/${post.slug}`} className="relative block h-52 overflow-hidden bg-gray-100">
                            {imgUrl ? (
                              <Image
                                src={imgUrl}
                                alt={(post.featuredImage as Media)?.alt || post.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                <span className="text-primary-400 text-sm font-medium">RehabVet</span>
                              </div>
                            )}
                            {/* Category badge on image */}
                            {firstCat && (
                              <span className="absolute top-3 left-3 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
                                {CATEGORY_LABELS[firstCat] || firstCat}
                              </span>
                            )}
                          </Link>

                          {/* Content */}
                          <div className="flex flex-1 flex-col p-5">
                            <Link href={`/blog/${post.slug}`}>
                              <h2 className="text-base font-bold text-gray-900 group-hover:text-accent-500 transition-colors line-clamp-2 leading-snug">
                                {post.title}
                              </h2>
                            </Link>
                            {post.excerpt && (
                              <p className="mt-2 text-sm text-gray-500 line-clamp-3 flex-1">{post.excerpt}</p>
                            )}
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="text-sm font-semibold text-accent-500 hover:text-accent-600 transition-colors"
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
                    <nav className="mt-12 flex justify-center gap-2">
                      {currentPage > 1 && (
                        <Link
                          href={`/blog?page=${currentPage - 1}${category ? `&category=${category}` : ''}`}
                          className="rounded px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-accent-50 hover:border-accent-400 transition-colors"
                        >
                          ← Prev
                        </Link>
                      )}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                          key={p}
                          href={`/blog?page=${p}${category ? `&category=${category}` : ''}`}
                          className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                            p === currentPage
                              ? 'bg-accent-500 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-accent-50'
                          }`}
                        >
                          {p}
                        </Link>
                      ))}
                      {currentPage < totalPages && (
                        <Link
                          href={`/blog?page=${currentPage + 1}${category ? `&category=${category}` : ''}`}
                          className="rounded px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-accent-50 hover:border-accent-400 transition-colors"
                        >
                          Next →
                        </Link>
                      )}
                    </nav>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0 space-y-8">
              {/* Search */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">Search</h3>
                <form action="/blog" method="get" className="flex gap-2">
                  <input
                    name="q"
                    type="text"
                    placeholder="Type to start searching..."
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-400"
                  />
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">Blog Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/blog"
                      className={`flex items-center justify-between text-sm py-1 border-b border-gray-50 hover:text-accent-500 transition-colors ${!category ? 'text-accent-500 font-semibold' : 'text-gray-600'}`}
                    >
                      <span>All Posts</span>
                      <span className="text-xs text-gray-400">{Object.values(categoryCounts).reduce((a, b) => a + b, 0)}</span>
                    </Link>
                  </li>
                  {allCategories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/blog?category=${cat}`}
                        className={`flex items-center justify-between text-sm py-1 border-b border-gray-50 hover:text-accent-500 transition-colors ${category === cat ? 'text-accent-500 font-semibold' : 'text-gray-600'}`}
                      >
                        <span>{CATEGORY_LABELS[cat] || cat}</span>
                        <span className="text-xs text-gray-400">{categoryCounts[cat] || 0}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-primary-600 rounded-lg p-5 text-white text-center">
                <h3 className="font-bold text-lg">Book a Consultation</h3>
                <p className="mt-2 text-sm text-primary-100">Help your pet recover with expert rehabilitation care.</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block rounded-full bg-accent-500 px-6 py-2 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
