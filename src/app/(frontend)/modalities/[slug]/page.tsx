import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { PayloadImage } from '@/components/PayloadImage'
import { RichText } from '@/components/RichText'
import type { Modality, Condition, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'modalities', limit: 100, select: { slug: true } })
    return result.docs.map((m) => ({ slug: m.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'modalities', where: { slug: { equals: slug } }, limit: 1 })
    const mod = result.docs[0]
    if (!mod) return { title: 'Modality Not Found' }
    return {
      title: mod.seo?.metaTitle || mod.title,
      description: mod.seo?.metaDescription || mod.excerpt || '',
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
  }
}

export default async function ModalityPage({ params }: Props) {
  const { slug } = await params
  let modality: Modality | null = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'modalities',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    modality = result.docs[0] || null
  } catch {}

  if (!modality) notFound()

  const conditionsTreated = (modality.conditionsTreated || []).filter((c): c is Condition => typeof c !== 'number')

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 text-white">
        {modality.image && typeof modality.image !== 'number' && modality.image.url && (
          <div className="absolute inset-0 overflow-hidden">
            <PayloadImage media={modality.image} fill sizes="100vw" className="opacity-20" priority />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Link href="/modalities" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Modalities
          </Link>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{modality.title}</h1>
          {modality.excerpt && <p className="mt-4 max-w-2xl text-lg text-primary-100">{modality.excerpt}</p>}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Description */}
          <RichText data={modality.description} />

          {/* How It Works */}
          {modality.howItWorks && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
              <div className="mt-4">
                <RichText data={modality.howItWorks} />
              </div>
            </div>
          )}

          {/* Conditions Treated */}
          {conditionsTreated.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Conditions Treated</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {conditionsTreated.map((condition) => (
                  <Link
                    key={condition.id}
                    href={`/conditions/${condition.slug}`}
                    className="rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                  >
                    {condition.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Want to learn more?</h2>
            <p className="mt-2 text-gray-600">Contact us to find out if this treatment is right for your pet.</p>
            <Link href="/contact" className="mt-6 inline-block rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
