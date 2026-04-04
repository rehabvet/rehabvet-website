import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Patient Stories',
  description: 'Real recovery stories from pets and their owners at RehabVet. Be inspired by the transformations we have witnessed.',
}

const defaultStories = [
  {
    slug: 'max-cruciate-recovery',
    petName: 'Max',
    breed: 'Labrador Retriever',
    condition: 'Cruciate Ligament Rupture',
    teaser: 'Max tore his cruciate ligament chasing a ball. After TPLO surgery and 12 weeks of rehabilitation, he was back to his energetic self.',
    outcome: 'Full recovery',
    emoji: '🐕',
  },
  {
    slug: 'bella-ivdd-journey',
    petName: 'Bella',
    breed: 'Dachshund',
    condition: 'Intervertebral Disc Disease (IVDD)',
    teaser: 'Bella was paralysed in her hind legs following a disc herniation. Intensive hydrotherapy and physiotherapy gave her back her mobility.',
    outcome: 'Walking independently',
    emoji: '🐾',
  },
  {
    slug: 'charlie-hip-dysplasia',
    petName: 'Charlie',
    breed: 'German Shepherd',
    condition: 'Hip Dysplasia',
    teaser: 'Charlie was diagnosed with severe bilateral hip dysplasia at 18 months. A tailored rehab programme transformed his quality of life.',
    outcome: 'Pain-free mobility',
    emoji: '🐶',
  },
  {
    slug: 'luna-post-amputation',
    petName: 'Luna',
    breed: 'Border Collie',
    condition: 'Post-Amputation (Osteosarcoma)',
    teaser: 'After losing a front leg to bone cancer, Luna learned to navigate life as a tripod with the help of our dedicated rehabilitation team.',
    outcome: 'Happy and active',
    emoji: '🦮',
  },
  {
    slug: 'oscar-fce-recovery',
    petName: 'Oscar',
    breed: 'Cocker Spaniel',
    condition: 'Fibrocartilaginous Embolism (FCE)',
    teaser: 'Oscar suffered a spinal stroke that left him unable to use his hind legs. Months of dedicated therapy brought him back to near-normal.',
    outcome: 'Near-normal function',
    emoji: '🐩',
  },
  {
    slug: 'rosie-osteoarthritis',
    petName: 'Rosie',
    breed: 'Golden Retriever',
    condition: 'Osteoarthritis',
    teaser: 'At 10 years old, Rosie was struggling with severe arthritis. An ongoing rehabilitation programme keeps her comfortable and active.',
    outcome: 'Managed long-term',
    emoji: '🐕‍🦺',
  },
]

export default async function PatientStoriesPage() {
  let stories: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'patient-stories', limit: 50, sort: '-publishedDate' })
    stories = result.docs
  } catch {
    // DB not available yet
  }

  const displayStories = stories.length > 0 ? stories : defaultStories

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Patient Stories</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Every recovery is a unique journey. Read about the real pets whose lives have been
            transformed through veterinary rehabilitation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayStories.map((story: any) => (
              <Link
                key={story.slug}
                href={`/patient-stories/${story.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-primary-200 transition-all overflow-hidden"
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                  <span className="text-6xl">{story.emoji || '🐾'}</span>
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
