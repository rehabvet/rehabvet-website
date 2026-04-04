import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PagesHeader from '@/components/shared/pages-header'
import SectionHeader from '@/components/shared/section-header'
import Button from '@/components/shared/primary-button'
import { FaHeart, FaGraduationCap, FaHandHoldingHeart } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Us | RehabVet',
  description:
    "Learn about RehabVet, Singapore's first full-fledged animal rehabilitation clinic and our dedicated team of veterinarians and therapists.",
}

const teamMembers = [
  {
    name: 'Dr. Sara Lam',
    role: 'Founder & Veterinarian',
    credentials: 'BVSc (Sydney), CCRT, CVA',
    bio: 'Dr Sara founded RehabVet in 2019 with a vision to provide Singapore\'s pets with comprehensive rehabilitation care. She holds a Bachelor of Veterinary Science from the University of Sydney, is a Certified Canine Rehabilitation Therapist (CCRT), and a Certified Veterinary Acupuncturist (CVA). With her experience and passion for helping animals recover, Dr Sara has built RehabVet into Singapore\'s leading animal rehabilitation clinic.',
    photo: '/images/team-sara.jpg',
  },
  { name: 'Xan', role: 'Animal Rehabilitation Therapist', credentials: '', bio: 'Xan is a dedicated animal rehabilitation therapist with a genuine passion for helping pets recover and thrive.', photo: '/images/team-xan.jpg' },
  { name: 'Sean', role: 'Animal Rehabilitation Therapist', credentials: '', bio: 'Sean is a compassionate and skilled animal rehabilitation therapist.', photo: '/images/team-sean.jpg' },
  { name: 'Joyce', role: 'Animal Rehabilitation Therapist', credentials: '', bio: '', photo: '/images/team-joyce.jpg' },
  { name: 'Noelle', role: 'Animal Rehabilitation Therapist', credentials: '', bio: '', photo: '/images/team-noelle.jpg' },
  { name: 'Claire', role: 'Client Relations', credentials: '', bio: '', photo: '/images/team-claire.jpg' },
  { name: 'Hazel', role: 'Animal Rehabilitation Therapist', credentials: '', bio: '', photo: '/images/team-hazel.jpg' },
]

const coreValues = [
  { icon: FaHeart, title: 'Compassion', desc: 'We treat every animal with the same love and care we would give our own pets.' },
  { icon: FaGraduationCap, title: 'Expertise', desc: 'Our team holds internationally recognised certifications and stays current with the latest research.' },
  { icon: FaHandHoldingHeart, title: 'Integrity', desc: 'We are transparent and honest in all our recommendations and treatment plans.' },
]

export default function AboutPage() {
  return (
    <>
      <PagesHeader
        title="About RehabVet"
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'About' }]}
      />

      {/* Mission */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6" data-aos="fade-right">
              <SectionHeader
                className="text-left"
                subtitle="About Us"
                title="Our Purpose"
                subtitleClass="!justify-start"
              />
              <p className="text-lg leading-relaxed">
                <strong>REHABVET CLINIC</strong> is Singapore&apos;s first full-fledged animal
                rehabilitation centre. With our team of well-trained and experienced practitioners,
                and comprehensive facilities offering the widest range of physical therapy, we aim to
                provide your pets with complementary support therapies that enable them to live a pain
                free and good quality of life.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[350px]" data-aos="fade-left">
              <Image src="/images/hero-bg.webp" alt="RehabVet clinic" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="!bg-primary_shade">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionHeader className="text-center" subtitle="Our Mission" title="Why We Exist" />
            <p className="text-lg leading-relaxed" data-aos="fade-up" data-aos-delay={300}>
              To provide all animals and pets a second chance at living without pain, minimal
              medication and living well.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team">
        <div className="container">
          <SectionHeader className="text-center mb-10 lg:mb-16" subtitle="Our People" title="Meet Our Team" />

          {/* Dr. Sara Lam — featured */}
          <div className="mb-12 rounded-2xl bg-white border border-border_one overflow-hidden" data-aos="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-72 md:h-auto overflow-hidden bg-primary_shade">
                <Image src={teamMembers[0].photo} alt={teamMembers[0].name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-3">
                <h3>{teamMembers[0].name}</h3>
                <p className="text-lg font-medium text-primary">{teamMembers[0].role}</p>
                {teamMembers[0].credentials && <p className="text-sm text-gray-500 italic">{teamMembers[0].credentials}</p>}
                {teamMembers[0].bio && <p className="leading-relaxed">{teamMembers[0].bio}</p>}
              </div>
            </div>
          </div>

          {/* Rest of team */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.slice(1).map((member, i) => (
              <div
                key={member.name}
                className="d2c_team_card rounded-2xl bg-white border border-border_one overflow-hidden"
                data-aos="zoom-in"
                data-aos-delay={200 + i * 100}
              >
                <div className="relative h-56 overflow-hidden bg-primary_shade">
                  <Image src={member.photo} alt={member.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-top" />
                </div>
                <div className="p-6 space-y-1">
                  <h5 className="!font-bold">{member.name}</h5>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  {member.credentials && <p className="text-xs text-gray-500 italic">{member.credentials}</p>}
                  {member.bio && <p className="mt-3 text-sm leading-relaxed">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="!bg-white">
        <div className="container">
          <SectionHeader className="text-center mb-10 lg:mb-16" subtitle="What We Stand For" title="Core Values" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((val, i) => (
              <div
                key={val.title}
                className="text-center space-y-4 p-8 lg:p-10 rounded-2xl bg-primary_shade"
                data-aos="zoom-in"
                data-aos-delay={200 + i * 150}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center text-primary text-2xl">
                  <val.icon />
                </div>
                <h5 className="!font-bold">{val.title}</h5>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="!bg-primary">
        <div className="container text-center">
          <h2 className="!text-white" data-aos="fade-up">Start Your Pet&apos;s Recovery Today</h2>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay={200}>
            Our team is ready to help your pet recover, move, and thrive.
          </p>
          <div className="mt-8" data-aos="fade-up" data-aos-delay={400}>
            <Button text="Book an Appointment" href="/contact" as="link" className="!bg-white !border-white !text-primary hover:!bg-primary_shade" />
          </div>
        </div>
      </section>
    </>
  )
}
