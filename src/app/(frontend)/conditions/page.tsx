import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Condition } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Conditions We Treat',
  description: 'RehabVet treats a wide range of conditions including developmental, degenerative, orthopaedic, neurological, and cancer-related conditions in animals.',
}

const CATEGORIES = ['developmental', 'degenerative', 'orthopaedic', 'neurological', 'cancer'] as const
const CATEGORY_LABELS: Record<string, string> = {
  developmental: 'Developmental',
  degenerative: 'Degenerative',
  orthopaedic: 'Orthopaedic',
  neurological: 'Neurological',
  cancer: 'Cancer',
}

const categoryColors: Record<string, { badge: string; border: string }> = {
  developmental: { badge: 'bg-blue-100 text-blue-800', border: 'border-l-blue-500' },
  degenerative: { badge: 'bg-amber-100 text-amber-800', border: 'border-l-amber-500' },
  orthopaedic: { badge: 'bg-purple-100 text-purple-800', border: 'border-l-purple-500' },
  neurological: { badge: 'bg-rose-100 text-rose-800', border: 'border-l-rose-500' },
  cancer: { badge: 'bg-gray-100 text-gray-800', border: 'border-l-gray-500' },
}

export default async function ConditionsPage() {
  let conditions: Condition[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'conditions', limit: 100, sort: 'title' })
    conditions = result.docs
  } catch {}

  const grouped = CATEGORIES.map((cat) => ({
    key: cat,
    label: CATEGORY_LABELS[cat],
    items: conditions.filter((c) => c.category === cat),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Conditions We Treat</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Our experienced team treats a broad range of conditions across all life stages. Browse by category to learn how rehabilitation can help your pet.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {grouped.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No conditions available yet. Check back soon.</p>
          ) : (
            grouped.map((group) => {
              const colors = categoryColors[group.key]
              return (
                <div key={group.key}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">{group.label}</h2>
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${colors.badge}`}>
                      {group.items.length} condition{group.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((condition) => (
                      <Link
                        key={condition.id}
                        href={`/conditions/${condition.slug}`}
                        className={`group rounded-xl border border-gray-100 border-l-4 ${colors.border} bg-white p-6 shadow-sm hover:shadow-lg transition-all`}
                      >
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {condition.title}
                        </h3>
                        {condition.excerpt && (
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{condition.excerpt}</p>
                        )}
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:text-primary-700">
                          Learn more <span aria-hidden="true">&rarr;</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>

      <section className="bg-primary-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Not sure if we can help?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Contact our team and we&apos;ll discuss whether rehabilitation is right for your pet.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-coral-500 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
