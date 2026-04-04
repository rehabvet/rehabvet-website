import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

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
  {
    name: 'Xan',
    role: 'Animal Rehabilitation Therapist',
    credentials: '',
    bio: 'Xan is a dedicated animal rehabilitation therapist with a genuine passion for helping pets recover and thrive.',
    photo: '/images/team-xan.jpg',
  },
  {
    name: 'Sean',
    role: 'Animal Rehabilitation Therapist',
    credentials: '',
    bio: 'Sean is a compassionate and skilled animal rehabilitation therapist.',
    photo: '/images/team-sean.jpg',
  },
  {
    name: 'Joyce',
    role: 'Animal Rehabilitation Therapist',
    credentials: '',
    bio: '',
    photo: '/images/team-joyce.jpg',
  },
  {
    name: 'Noelle',
    role: 'Animal Rehabilitation Therapist',
    credentials: '',
    bio: '',
    photo: '/images/team-noelle.jpg',
  },
  {
    name: 'Claire',
    role: 'Client Relations',
    credentials: '',
    bio: '',
    photo: '/images/team-claire.jpg',
  },
  {
    name: 'Hazel',
    role: 'Animal Rehabilitation Therapist',
    credentials: '',
    bio: '',
    photo: '/images/team-hazel.jpg',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">About RehabVet</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            We aim to provide your pets with complementary support therapies that enable them to
            live a pain free and good quality of life.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Purpose</h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-primary-600">About Us</p>
            <div className="mt-4 h-1 w-16 bg-primary-500 mx-auto rounded-full" />
            <p className="mt-8 text-lg text-gray-700 leading-relaxed">
              <strong>REHABVET CLINIC</strong> is Singapore&apos;s first full-fledged animal
              rehabilitation centre. With our team of well-trained and experienced practitioners,
              and comprehensive facilities offering the widest range of physical therapy, we aim to
              provide your pets with complementary support therapies that enable them to live a pain
              free and good quality of life.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Mission</h2>
            <div className="mt-4 h-1 w-16 bg-primary-500 mx-auto rounded-full" />
            <p className="mt-8 text-lg text-gray-700 leading-relaxed">
              To provide all animals and pets a second chance at living without pain, minimal
              medication and living well.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20" id="team">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Meet Our Team</h2>
            <div className="mt-4 h-1 w-16 bg-primary-500 mx-auto rounded-full" />
          </div>

          {/* Dr. Sara Lam — featured */}
          <div className="mb-12 rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-72 md:h-auto overflow-hidden bg-primary-50">
                <Image
                  src={teamMembers[0].photo}
                  alt={teamMembers[0].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900">{teamMembers[0].name}</h3>
                <p className="mt-1 text-lg font-medium text-primary-600">{teamMembers[0].role}</p>
                {teamMembers[0].credentials && (
                  <p className="mt-1 text-sm text-gray-500 italic">{teamMembers[0].credentials}</p>
                )}
                {teamMembers[0].bio && (
                  <p className="mt-4 text-gray-600 leading-relaxed">{teamMembers[0].bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Rest of team */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.slice(1).map((member) => (
              <div
                key={member.name}
                className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden bg-primary-50">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary-600">{member.role}</p>
                  {member.credentials && (
                    <p className="mt-1 text-xs text-gray-500 italic">{member.credentials}</p>
                  )}
                  {member.bio && (
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-500 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Start Your Pet&apos;s Recovery Today</h2>
          <p className="mt-4 text-primary-100 text-lg">
            Our team is ready to help your pet recover, move, and thrive.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-accent-400 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  )
}
