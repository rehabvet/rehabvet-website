import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import Button from '@/components/shared/primary-button'
import { FaPaw } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'patient-stories', limit: 100, select: { slug: true } })
    return result.docs.map((s: any) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'patient-stories', where: { slug: { equals: slug } }, limit: 1 })
    const story = result.docs[0] as any
    if (!story) return { title: 'Patient Story Not Found' }
    return {
      title: `${story.patientName}'s Story | RehabVet`,
      description: story.condition || '',
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
    story = result.docs[0] || null
  } catch {}

  if (!story) notFound()

  const patientName: string = story.patientName || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
  const condition: string | null = story.condition || null

  return (
    <>
      {/* ── Page header ── */}
      <div className="bg-primary_bg py-6 md:py-8 xl:py-12 z-10 relative">
        <div className="container">
          <div className="py-10 md:py-14 xl:py-20 bg-primary_shade rounded-[30px] text-center space-y-4 px-6 md:px-12">
            <p className="text-sm font-semibold text-dark/60">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/patient-stories" className="hover:text-primary transition-colors">Patient Stories</Link>
            </p>

            <div className="flex items-center justify-center gap-2">
              <FaPaw className="text-primary text-lg" />
              <h6 className="!text-primary">{patientName}&apos;s Story</h6>
            </div>

            <h1 className="animateText !text-3xl md:!text-4xl xl:!text-5xl max-w-3xl mx-auto">
              {story.title}
            </h1>

            {condition && (
              <span className="inline-block rounded-full bg-white border border-border_one px-4 py-1 text-sm font-semibold text-primary">
                {condition.length > 80 ? condition.slice(0, 80) + '…' : condition}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Story content ── */}
      <section>
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {story.story ? (
              <div data-aos="fade-up">
                <RichText data={story.story} />
              </div>
            ) : (
              <div className="prose prose-lg max-w-none" data-aos="fade-up">
                <p>
                  {patientName}&apos;s full story will be published here shortly. Our patient stories
                  are shared with the kind permission of their owners and are a testament to the
                  dedication of both the rehabilitation team and the families who commit to the process.
                </p>
                {condition && (
                  <p>
                    This case involves{' '}
                    <Link href="/conditions" className="text-primary underline hover:text-primary-700">
                      {condition}
                    </Link>
                    , a condition we have extensive experience treating through targeted rehabilitation programmes.
                  </p>
                )}
              </div>
            )}

            {/* Condition info box */}
            {condition && (
              <div className="mt-12 rounded-2xl bg-primary_shade border border-border_one p-6" data-aos="fade-up">
                <h6 className="!font-bold text-dark">About this condition</h6>
                <p className="mt-2 text-sm text-text_color">
                  Learn more about this condition and how rehabilitation can help.
                </p>
                <Link href="/conditions" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-700 transition-colors">
                  View Conditions &rarr;
                </Link>
              </div>
            )}

            {/* CTA */}
            <div className="mt-14 rounded-2xl bg-primary border-0 p-8 text-center space-y-4" data-aos="fade-up">
              <h5 className="!text-white !font-bold">Inspired by {patientName}&apos;s story?</h5>
              <p className="text-white/80 text-sm">Our team is ready to help your pet on their road to recovery.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  text="Book a Consultation"
                  href="/contact"
                  as="link"
                  className="!bg-white !border-white !text-primary hover:!bg-primary_shade"
                />
                <Button
                  text="More Stories"
                  href="/patient-stories"
                  as="link"
                  variant="inverse"
                  className="!border-white/50 !text-white hover:!text-primary"
                />
              </div>
            </div>

            <div className="mt-8" data-aos="fade-up">
              <Link href="/patient-stories" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Patient Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
