import type { Metadata } from 'next'
import Link from 'next/link'
import PagesHeader from '@/components/shared/pages-header'
import SectionHeader from '@/components/shared/section-header'
import Button from '@/components/shared/primary-button'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Rehabilitation Modalities for Pets | RehabVet SG',
  description: 'Discover the wide range of evidence-based treatment modalities we use at RehabVet to help your pet recover — from manual therapy to underwater treadmills.',
}

const MODALITY_COLORS = [
  'bg-primary', 'bg-emerald-600', 'bg-accent', 'bg-blue-600',
  'bg-amber-500', 'bg-purple-600', 'bg-teal-600', 'bg-rose-500', 'bg-indigo-600',
]

const MODALITIES = [
  { title: 'Manual Therapy', slug: 'manual-therapy-dog-cat', excerpt: 'Manual therapy is a type of physical therapy that uses hands-on techniques to help improve the mobility and function of dogs and cats.' },
  { title: 'Physical Therapy', slug: 'physical-therapy-dogs-cats', excerpt: 'Physical therapy for dogs is a service that provides rehabilitative care to help improve mobility and reduce pain.' },
  { title: 'Class 4 Therapeutic Laser', slug: 'class-4-theraputic-laser-for-dogs-and-cats', excerpt: 'This class 4 therapeutic laser is designed to provide relief to dogs and cats suffering from a variety of ailments.' },
  { title: 'Electrical Therapy', slug: 'electrical-therapy-tens-nmes-for-dogs-and-cats', excerpt: 'This service provides electrical therapy, such as TENS and NMES, for both cats and dogs. It is a great way to help improve the health.' },
  { title: 'Ultrasound Therapy', slug: 'ultrasound-therapy-for-dogs-and-cats', excerpt: 'Ultrasound Therapy is a non-invasive treatment for dogs and cats which uses sound waves to reduce pain and inflammation.' },
  { title: 'Extracorporeal shockwave', slug: 'extracorporeal-shockwave-therapy-eswt-for-animals', excerpt: 'Extracorporeal Shockwave Therapy (ESWT) is a non-invasive treatment for dogs which uses sound waves to help reduce pain.' },
  { title: 'TCVM Tui Na', slug: 'tcvm-tui-na-for-dogs-and-cats', excerpt: 'Tui-Na is a traditional Chinese massage therapy specifically tailored for dogs, providing a holistic approach to their wellbeing.' },
  { title: 'Underwater Treadmill', slug: 'underwater-treadmill', excerpt: 'This service provides a unique way to exercise dogs, allowing them to run on a treadmill submerged in water.' },
  { title: 'Proprioception Exercises', slug: 'canine-rehabilitation-proprioception-exercises', excerpt: 'We offer canine proprioception exercises to help dogs with nerve damage improve their mobility. Our service is tailored to the individual needs.' },
]

export default function ModalitiesPage() {
  return (
    <>
      <PagesHeader
        title="Rehabilitation Modalities"
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Modalities' }]}
      />

      <section>
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            {MODALITIES.map((mod, i) => {
              const colSpan = i % 3 === 1 ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4'
              return (
                <Link
                  key={mod.slug}
                  href={`/modalities/${mod.slug}`}
                  className={`${colSpan} group`}
                  data-aos="zoom-in"
                  data-aos-delay={200 + i * 100}
                >
                  <div className={`${MODALITY_COLORS[i % MODALITY_COLORS.length]} p-5 lg:p-8 xl:p-10 rounded-lg space-y-4 h-full flex flex-col hover:shadow-lg transition-shadow duration-300`}>
                    <h3 className="!text-white">{mod.title}</h3>
                    <p className="text-white/90 flex-1">{mod.excerpt}</p>
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

      <section className="!bg-primary_shade">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionHeader className="text-center" subtitle="Get Started" title="Not sure which modality is right?" />
            <p className="text-lg" data-aos="fade-up" data-aos-delay={300}>
              Our team will assess your pet and recommend the best treatment plan.
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
