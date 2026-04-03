import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'modalities', where: { slug: { equals: slug } }, limit: 1 })
    const mod = result.docs[0]
    if (!mod) return { title: 'Modality Not Found' }
    return {
      title: (mod.seo as any)?.metaTitle || mod.title,
      description: (mod.seo as any)?.metaDescription || (mod as any).excerpt || '',
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }
  }
}

export default async function ModalityPage({ params }: Props) {
  const { slug } = await params
  let modality: any = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'modalities', where: { slug: { equals: slug } }, limit: 1 })
    modality = result.docs[0]
  } catch {}

  const title = modality?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/modalities" className="text-primary-200 hover:text-white text-sm">&larr; Back to Modalities</Link>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{title}</h1>
          {modality?.excerpt && <p className="mt-4 text-lg text-primary-100">{modality.excerpt}</p>}
          {!modality && <p className="mt-4 text-lg text-primary-100">This modality page will be populated via the CMS.</p>}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {!modality && (
            <div className="text-center">
              <p className="text-gray-600 text-lg">Content coming soon. Please check back later or contact us for more information.</p>
            </div>
          )}

          <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Want to learn more?</h2>
            <p className="mt-2 text-gray-600">Contact us to find out if this treatment is right for your pet.</p>
            <Link href="/contact" className="mt-6 inline-block rounded-full bg-coral-400 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
