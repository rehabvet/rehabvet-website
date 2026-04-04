import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about RehabVet, Singapore\'s leading veterinary rehabilitation clinic and our dedicated team.',
}

const teamMembers = [
  { name: 'Dr. Sarah Chen', role: 'Lead Veterinary Surgeon', emoji: '👩‍⚕️' },
  { name: 'Dr. James Tan', role: 'Rehabilitation Specialist', emoji: '👨‍⚕️' },
  { name: 'Emily Lim', role: 'Veterinary Physiotherapist', emoji: '👩‍⚕️' },
  { name: 'David Wong', role: 'Hydrotherapy Technician', emoji: '👨‍⚕️' },
]

const values = [
  { title: 'Compassion', desc: 'Every pet is treated with the same care and attention we would give our own.', icon: '❤️' },
  { title: 'Excellence', desc: 'We use evidence-based methods and the latest rehabilitation technology.', icon: '⭐' },
  { title: 'Partnership', desc: 'We work closely with pet owners and referring veterinarians.', icon: '🤝' },
  { title: 'Innovation', desc: 'Continuously advancing our techniques and equipment for better outcomes.', icon: '💡' },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">About RehabVet</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Pioneering veterinary rehabilitation in Singapore since our founding, we are dedicated to improving the lives of pets through specialised rehabilitation care.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                RehabVet was founded with a simple mission: to give every pet the best possible chance at recovery and a pain-free life. We combine veterinary expertise with rehabilitation science to create treatment plans that truly make a difference.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Our state-of-the-art facility features underwater treadmills, hyperbaric oxygen chambers, and a range of therapeutic equipment. We work alongside your primary veterinarian to deliver comprehensive, coordinated care.
              </p>
            </div>
            <div className="rounded-2xl bg-primary-50 h-80 flex items-center justify-center">
              <span className="text-8xl">🏥</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <span className="text-4xl">{value.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto h-40 w-40 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-5xl">{member.emoji}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-500 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Join Our Growing Team</h2>
          <p className="mt-4 text-primary-100 text-lg">We are always looking for passionate professionals to join our mission.</p>
          <Link href="/contact" className="mt-8 inline-block rounded-full bg-accent-400 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
