import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Expert advice, rehabilitation tips, and pet health articles from the RehabVet team.',
}

const defaultPosts = [
  {
    title: 'Understanding Canine Hip Dysplasia: Signs, Diagnosis & Rehabilitation',
    slug: 'understanding-canine-hip-dysplasia',
    excerpt:
      'Hip dysplasia is one of the most common developmental conditions in dogs. Learn how to spot the signs early and how rehabilitation can dramatically improve quality of life.',
    category: 'Education',
    author: 'Dr. Sarah Mitchell',
    publishedDate: '2024-03-15',
  },
  {
    title: 'The Benefits of Hydrotherapy for Post-Surgical Recovery',
    slug: 'hydrotherapy-post-surgical-recovery',
    excerpt:
      'Underwater treadmill therapy offers unparalleled advantages for pets recovering from orthopaedic surgery. We explore the science behind buoyancy and resistance.',
    category: 'Hydrotherapy',
    author: 'Dr. James Thornton',
    publishedDate: '2024-02-28',
  },
  {
    title: 'Life After Cruciate Repair: A Guide to TPLO Rehabilitation',
    slug: 'tplo-rehabilitation-guide',
    excerpt:
      'A successful TPLO outcome depends as much on post-operative rehabilitation as it does on surgical technique. Here is what to expect at each stage of recovery.',
    category: 'Orthopaedic',
    author: 'Dr. Sarah Mitchell',
    publishedDate: '2024-01-20',
  },
]

const categories = ['All', 'Education', 'Hydrotherapy', 'Orthopaedic', 'Neurological', 'Nutrition', 'Cancer']

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPage() {
  let posts: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blog-posts',
      limit: 50,
      sort: '-publishedDate',
    })
    posts = result.docs
  } catch {
    // DB not available yet
  }

  const displayPosts = posts.length > 0 ? posts : defaultPosts

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">RehabVet Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Expert insights, rehabilitation guides, and the latest research from our clinical team.
          </p>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white py-6 sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    cat === 'All'
                      ? 'bg-primary-500 text-white'
                      : 'border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="search"
              placeholder="Search articles..."
              className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 sm:w-64"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {displayPosts.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post: any) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-primary-200 transition-all overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <span className="text-5xl">📝</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {post.category && (
                      <span className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-0.5 text-xs font-medium text-primary-700">
                        {post.category}
                      </span>
                    )}
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                      <span>{post.author}</span>
                      {post.publishedDate && <span>{formatDate(post.publishedDate)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
            className="mt-8 inline-block rounded-full bg-coral-400 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
