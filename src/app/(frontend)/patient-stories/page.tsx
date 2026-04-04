import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Patient Stories',
  description: 'Real recovery stories from pets and their owners at RehabVet. Be inspired by the transformations we have witnessed.',
}



export default async function PatientStoriesPage() {
  let stories: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'patient-stories', limit: 50, sort: '-publishedDate' })
    stories = result.docs
  } catch {
    // DB not available yet
  }

  const displayStories = stories

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Patient Stories</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            In memories of all immobile dogs that were not given a second chance.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {displayStories.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-500 text-lg">Patient stories coming soon.</p>
              <Link href="/contact" className="mt-4 inline-block text-primary-600 hover:text-primary-800 font-medium">Contact us about your pet&apos;s journey &rarr;</Link>
            </div>
          ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayStories.map((story: any) => (
              <Link
                key={story.slug}
                href={`/patient-stories/${story.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-primary-200 transition-all overflow-hidden"
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                  <span className="text-5xl font-bold text-primary-300">{(story.petName || '?')[0]}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors">
                      {story.petName}
                    </h2>
                    {story.outcome && (
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                        {story.outcome}
                      </span>
                    )}
                  </div>
                  {story.breed && <p className="mt-0.5 text-sm text-gray-500">{story.breed}</p>}
                  {story.condition && (
                    <span className="mt-2 inline-block rounded-full border border-primary-100 bg-primary-50 px-3 py-0.5 text-xs font-medium text-primary-700">
                      {story.condition}
                    </span>
                  )}
                  <p className="mt-3 flex-1 text-sm text-gray-600 line-clamp-3">
                    {story.teaser || story.excerpt || ''}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-primary-500 group-hover:text-primary-700">
                    Read story &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>

      <section className="bg-primary-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Could your pet be our next success story?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Get in touch with our team to discuss how rehabilitation can help your animal companion.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-accent-400 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
