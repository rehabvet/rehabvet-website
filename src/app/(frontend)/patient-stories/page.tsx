import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import PagesHeader from '@/components/shared/pages-header'
import Button from '@/components/shared/primary-button'
import SectionHeader from '@/components/shared/section-header'
import { FaPaw } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Patient Stories | RehabVet',
  description: 'Real recovery stories from pets and their owners at RehabVet. Be inspired by the transformations we have witnessed.',
}

export default async function PatientStoriesPage() {
  let stories: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'patient-stories', limit: 50, sort: 'title' })
    stories = result.docs
  } catch {
    // DB not available
  }

  return (
    <>
      <PagesHeader
        title="Patient Stories"
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Patient Stories' }]}
      />

      <section>
        <div className="container">
          <SectionHeader
            className="text-center mb-10 lg:mb-14"
            subtitle="Real Recoveries"
            title="Inspiring Journeys at RehabVet"
          />

          {stories.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <FaPaw className="text-primary text-4xl mx-auto opacity-40" />
              <p className="text-text_color text-lg">Patient stories coming soon.</p>
              <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-700 transition-colors">
                Contact us about your pet&apos;s journey &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story: any, i: number) => (
                <Link
                  key={story.slug}
                  href={`/patient-stories/${story.slug}`}
                  className="group flex flex-col rounded-2xl border border-border_one bg-white overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300"
                  data-aos="zoom-in"
                  data-aos-delay={100 + i * 60}
                >
                  <div className="flex h-48 items-center justify-center bg-primary_shade">
                    <span className="text-6xl font-bold text-primary/20 font-display">
                      {(story.patientName || '?')[0]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 space-y-3">
                    <h5 className="!font-bold !text-lg group-hover:text-primary transition-colors">
                      {story.patientName || story.title}
                    </h5>
                    {story.condition && (
                      <span className="self-start rounded-full bg-primary_shade px-3 py-0.5 text-xs font-bold text-primary">
                        {story.condition.length > 60 ? story.condition.slice(0, 60) + '…' : story.condition}
                      </span>
                    )}
                    <p className="text-sm text-text_color line-clamp-3 flex-1">
                      {story.title}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Read story &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="!bg-primary">
        <div className="container text-center">
          <h2 className="!text-white" data-aos="fade-up">Could your pet be our next success story?</h2>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay={200}>
            Get in touch with our team to discuss how rehabilitation can help your animal companion.
          </p>
          <div className="mt-8" data-aos="fade-up" data-aos-delay={400}>
            <Button
              text="Book a Consultation"
              href="/contact"
              as="link"
              className="!bg-white !border-white !text-primary hover:!bg-primary_shade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
