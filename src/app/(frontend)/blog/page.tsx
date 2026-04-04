import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PayloadImage } from '@/components/PayloadImage'
import type { BlogPost, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const { page: pageParam, category } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10))
  const perPage = 12

  let posts: BlogPost[] = []
  let totalPages = 1
  let allCategories: string[] = []

  try {
    const payload = await getPayload({ config })

    const where: { categories?: { contains: string } } = {}
    if (category && category !== 'all') {
      where.categories = { contains: category }
    }

    const result = await payload.find({
      collection: 'blog-posts',
      limit: perPage,
      page: currentPage,
      sort: '-date',
      where,
    })
    posts = result.docs
    totalPages = result.totalPages

    // Get all unique categories
    const allPosts = await payload.find({ collection: 'blog-posts', limit: 200, select: { categories: true } })
    const catSet = new Set<string>()
    allPosts.docs.forEach((p) => {
      p.categories?.forEach((c) => catSet.add(c))
    })
    allCategories = Array.from(catSet).sort()
  } catch {}

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">RehabVet Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Expert insights, rehabilitation guides, and the latest research from our clinical team.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {allCategories.length > 0 && (
        <section className="border-b border-gray-100 bg-white py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  !category || category === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                All
              </Link>
              {allCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${cat}`}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-primary-600 text-white'
                      : 'border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600'
                  }`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No posts yet. Check back soon!</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-primary-200 transition-all overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <PayloadImage
                        media={post.featuredImage as Media}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {post.categories && post.categories.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-1">
                          {post.categories.slice(0, 2).map((cat) => (
                            <span key={cat} className="inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                              {CATEGORY_LABELS[cat] || cat}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                      )}
                      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                        {post.author && <span>{post.author}</span>}
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}${category ? `&category=${category}` : ''}`}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 transition-colors"
                    >
                      Previous
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/blog?page=${p}${category ? `&category=${category}` : ''}`}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        p === currentPage
                          ? 'bg-primary-600 text-white'
                          : 'border border-gray-200 text-gray-700 hover:bg-primary-50'
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}${category ? `&category=${category}` : ''}`}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 transition-colors"
                    >
                      Next
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      <section className="bg-primary-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Have a question for our team?</h2>
          <p className="mt-4 text-lg text-gray-600">
            We love hearing from pet owners. Reach out and one of our clinicians will get back to you.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-coral-500 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
