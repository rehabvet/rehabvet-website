import type { Metadata } from 'next'
import Link from 'next/link'
import PagesHeader from '@/components/shared/pages-header'
import SectionHeader from '@/components/shared/section-header'
import Button from '@/components/shared/primary-button'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Veterinary Rehabilitation Services | RehabVet SG',
  description: 'Explore our veterinary rehabilitation services including physiotherapy, hydrotherapy, HBOT, acupuncture, chiropractic, TCM and more.',
}

const SERVICE_COLORS = [
  'bg-primary', 'bg-accent', 'bg-emerald-600', 'bg-amber-500',
  'bg-purple-600', 'bg-blue-600', 'bg-rose-500', 'bg-teal-600',
]

const SERVICES = [
  { title: 'Veterinary Rehabilitation', slug: 'veterinary-rehabilitation-consultation', excerpt: 'Veterinary Rehabilitation Consultation is a service which provides specialist advice and support to help animals recover from injury or illness.' },
  { title: 'Rehabilitation', slug: 'animal-rehabilitation', excerpt: 'Animal rehabilitation is the process of restoring an animal to its optimal physical and mental health through medical and behavioural interventions.' },
  { title: 'Physiotherapy', slug: 'dog-physiotherapy', excerpt: 'Dog physiotherapy is a specialist service which provides tailored treatments to help improve the mobility and wellbeing of dogs. It is a great way to ensure your pet is in the best possible health.' },
  { title: 'Hydrotherapy', slug: 'dog-hydrotherapy', excerpt: 'Hydrotherapy for Dogs is a beneficial service that can help to improve the mobility and well-being of our canine companions. It is a great way to provide a natural and holistic approach.' },
  { title: 'Hyperbaric Oxygen Treatment', slug: 'hbot-hyperbaric-oxygen-therapy-animals', excerpt: 'Hyperbaric Oxygen Treatment is a medical procedure used to provide dogs with increased oxygen levels, which can help to improve their overall health and wellbeing.' },
  { title: 'Traditional Chinese Medicine', slug: 'traditional-chinese-veterinary-medicine', excerpt: 'This service provides traditional Chinese veterinary medicine for dogs, offering a holistic approach to pet care. It combines ancient Chinese wisdom with modern veterinary science.' },
  { title: 'Chiropractic for Dogs', slug: 'dog-chiropractic', excerpt: 'Chiropractic treatment is a holistic approach to canine health, providing a non-invasive and drug-free way to improve the well-being of our four-legged friends.' },
  { title: 'Acupuncture', slug: 'dog-acupuncture', excerpt: 'Animal rehabilitation is a specialised field in veterinary medicine that focuses on restoring the health, mobility, and quality of life of pets recovering from injury.' },
]

export default function ServicesPage() {
  return (
    <>
      <PagesHeader
        title="Expert Rehabilitation Services"
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
      />

      <section>
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            {SERVICES.map((service, i) => {
              const colSpan = i % 3 === 0 ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4'
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`${colSpan} group`}
                  data-aos="zoom-in"
                  data-aos-delay={200 + i * 100}
                >
                  <div className={`${SERVICE_COLORS[i % SERVICE_COLORS.length]} p-5 lg:p-8 xl:p-10 rounded-lg space-y-4 h-full flex flex-col hover:shadow-lg transition-shadow duration-300`}>
                    <h3 className="!text-white">{service.title}</h3>
                    <p className="text-white/90 flex-1">{service.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-white font-semibold text-sm group-hover:gap-2 transition-all">
                      Learn More &rarr;
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="!bg-primary_shade">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionHeader className="text-center" subtitle="Get Started" title="Ready to start your pet's recovery?" />
            <p className="text-lg" data-aos="fade-up" data-aos-delay={300}>
              Our team is here to help. Book a rehabilitation consultation today.
            </p>
            <div data-aos="fade-up" data-aos-delay={400}>
              <Button text="Book a Consultation" href="/contact" as="link" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
