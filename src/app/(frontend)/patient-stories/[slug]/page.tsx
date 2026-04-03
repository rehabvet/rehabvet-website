import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'patient-stories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const story = result.docs[0] as any
    if (!story) return { title: 'Patient Story Not Found' }
    return {
      title: story.seo?.metaTitle || `${story.patientName || story.petName}'s Story`,
      description: story.seo?.metaDescription || story.teaser || story.excerpt || '',
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
  }
}

export default async function PatientStoryPage({ params }: Props) {
  const { slug } = await params
  let story: any = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'patient-stories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    story = result.docs[0]
  } catch {
    // DB not available
  }

  const petName = story?.petName || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
  const breed = story?.breed || null
  const condition = story?.condition || null
  const teaser = (story as any)?.teaser || (story as any)?.excerpt || ''
  const content = story?.content || ''
  const outcome = story?.outcome || null
  const galleryImages: string[] = story?.galleryImages || []

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/patient-stories" className="text-primary-200 hover:text-white text-sm">
            &larr; Back to Patient Stories
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold sm:text-5xl">{petName}&apos;s Story</h1>
            {outcome && (
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white">
                {outcome}
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-primary-200 text-sm">
            {breed && <span>{breed}</span>}
            {breed && condition && <span aria-hidden="true">&middot;</span>}
            {condition && <span>{condition}</span>}
          </div>
          {teaser && <p className="mt-4 max-w-2xl text-lg text-primary-100">{teaser}</p>}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {galleryImages.length > 0 ? (
            <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {galleryImages.map((img: string, i: number) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <img src={img} alt={`${petName} - photo ${i + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center"
                >
                  <span className="text-4xl">🐾</span>
                </div>
              ))}
            </div>
          )}

          {content ? (
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{content}</p>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                {petName}&apos;s full story will be published here shortly. Our patient stories are
                shared with the kind permission of their owners and are a testament to the
                dedication of both the rehabilitation team and the families who commit to the process.
              </p>
              {condition && (
                <p>
                  This case involves{' '}
                  <Link href="/conditions" className="text-primary-500 underline hover:text-primary-700">
                    {condition}
                  </Link>
                  , a condition we have extensive experience treating through targeted rehabilitation
                  programmes.
                </p>
              )}
            </div>
          )}

          {condition && (
            <div className="mt-12 rounded-2xl border border-primary-100 bg-primary-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">About {condition}</h2>
              <p className="mt-2 text-sm text-gray-600">
                Learn more about this condition and how rehabilitation can help.
              </p>
              <Link
                href="/conditions"
                className="mt-3 inline-block text-sm font-medium text-primary-500 hover:text-primary-700"
              >
                View Conditions &rarr;
              </Link>
            </div>
          )}

          <div className="mt-16 rounded-2xl bg-coral-400/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Inspired by {petName}&apos;s story?</h2>
            <p className="mt-2 text-gray-600">
              Our team is ready to help your pet on their road to recovery.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-coral-400 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
              >
                Book a Consultation
              </Link>
              <Link
                href="/patient-stories"
                className="rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                More Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
