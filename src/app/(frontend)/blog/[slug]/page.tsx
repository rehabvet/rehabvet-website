import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

type Props = { params: Promise<{ slug: string }> }

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const post = result.docs[0]
    if (!post) return { title: 'Post Not Found' }
    return {
      title: (post.seo as any)?.metaTitle || post.title,
      description: (post.seo as any)?.metaDescription || post.excerpt || '',
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post: any = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    post = result.docs[0]
  } catch {
    // DB not available
  }

  const title =
    post?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-primary-200 hover:text-white text-sm">
            &larr; Back to Blog
          </Link>
          {post?.category && (
            <span className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
              {post.category}
            </span>
          )}
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl leading-tight">{title}</h1>
          {post?.excerpt && (
            <p className="mt-4 text-lg text-primary-100">{post.excerpt}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-200">
            {post?.author && <span>By {post.author}</span>}
            {post?.publishedDate && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{formatDate(post.publishedDate)}</span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 h-72 w-full rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <span className="text-7xl">📝</span>
          </div>

          {post?.content ? (
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{post.content}</p>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                This article is being prepared by our clinical team and will be published shortly.
                Our blog covers a wide range of topics including rehabilitation techniques,
                condition-specific guides, and the latest research in veterinary physiotherapy.
              </p>
              <p>
                In the meantime, if you have a specific question about your pet&apos;s condition or
                treatment options, please don&apos;t hesitate to reach out to our team directly.
              </p>
            </div>
          )}

          <div className="mt-16 flex flex-col gap-6 rounded-2xl bg-primary-50 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-gray-900">Ready to help your pet?</p>
              <p className="mt-1 text-sm text-gray-600">Book a rehabilitation consultation with our team.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-full bg-coral-400 px-8 py-3 text-center font-semibold text-white hover:bg-coral-600 transition-colors"
            >
              Book Now
            </Link>
          </div>

          <div className="mt-8">
            <Link href="/blog" className="text-sm font-medium text-primary-500 hover:text-primary-700">
              &larr; Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
