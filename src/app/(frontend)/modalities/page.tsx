import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'Modalities',
  description: 'Discover our range of veterinary rehabilitation modalities including laser therapy, electrotherapy, underwater treadmill, and more.',
}

const defaultModalities = [
  { title: 'Manual Therapy', slug: 'manual-therapy', excerpt: 'Hands-on techniques to improve joint mobility and reduce pain.' },
  { title: 'Physical Therapy', slug: 'physical-therapy', excerpt: 'Structured exercise programs for strength and flexibility.' },
  { title: 'Laser Therapy', slug: 'laser-therapy', excerpt: 'Low-level laser to reduce inflammation and promote tissue healing.' },
  { title: 'Electrotherapy', slug: 'electrotherapy', excerpt: 'Electrical stimulation for pain management and muscle activation.' },
  { title: 'Therapeutic Ultrasound', slug: 'therapeutic-ultrasound', excerpt: 'Deep tissue heating for pain relief and accelerated healing.' },
  { title: 'Shockwave Therapy', slug: 'shockwave-therapy', excerpt: 'Acoustic waves to stimulate healing in tendons and joints.' },
  { title: 'Tui Na', slug: 'tui-na', excerpt: 'Chinese therapeutic massage for circulation and pain relief.' },
  { title: 'Underwater Treadmill', slug: 'underwater-treadmill', excerpt: 'Low-impact exercise in water for safe rehabilitation.' },
  { title: 'Proprioception Training', slug: 'proprioception-training', excerpt: 'Balance and coordination exercises for neurological recovery.' },
  { title: 'Thermotherapy & Cryotherapy', slug: 'thermotherapy-cryotherapy', excerpt: 'Heat and cold applications for pain and inflammation management.' },
  { title: 'Hydro Treadmill', slug: 'hydro-treadmill', excerpt: 'Water-based treadmill for controlled exercise therapy.' },
  { title: 'Stance Analyzer', slug: 'stance-analyzer', excerpt: 'Digital assessment of weight distribution and balance.' },
]

export default async function ModalitiesPage() {
  let modalities: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'modalities', limit: 50, sort: 'title' })
    modalities = result.docs
  } catch {}

  const displayModalities = modalities.length > 0 ? modalities : defaultModalities

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Treatment Modalities</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            We use a wide range of evidence-based treatment modalities to help your pet recover.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayModalities.map((mod: any) => (
              <Link
                key={mod.slug}
                href={`/modalities/${mod.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
              >
                <div className="h-32 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <span className="text-3xl text-primary-300">🔬</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {mod.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{mod.excerpt || ''}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
