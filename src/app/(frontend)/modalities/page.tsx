import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PayloadImage } from '@/components/PayloadImage'
import type { Modality, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Modalities',
  description: 'Discover our range of veterinary rehabilitation modalities including laser therapy, electrotherapy, underwater treadmill, and more.',
}

export default async function ModalitiesPage() {
  let modalities: Modality[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'modalities', limit: 50, sort: 'title' })
    modalities = result.docs
  } catch {}

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Treatment Modalities</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            We use a wide range of evidence-based treatment modalities to help your pet recover.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {modalities.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No modalities available yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {modalities.map((mod) => (
                <Link
                  key={mod.id}
                  href={`/modalities/${mod.slug}`}
                  className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <PayloadImage
                      media={mod.image as Media}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {mod.title}
                    </h2>
                    {mod.excerpt && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{mod.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
