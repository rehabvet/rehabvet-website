import Image from 'next/image'
import SectionHeader from '@/components/shared/section-header'

export const TEAM_MEMBERS = [
  {
    name: 'Dr. Sara Lam',
    role: 'Founder & Veterinarian',
    credentials: 'BVSc (Sydney), CCRT, CVA',
    bio: "Dr Sara founded RehabVet in 2019 with a vision to provide Singapore's pets with comprehensive rehabilitation care. She holds a Bachelor of Veterinary Science from the University of Sydney, is a Certified Canine Rehabilitation Therapist (CCRT), and a Certified Veterinary Acupuncturist (CVA). With her experience and passion for helping animals recover, Dr Sara has built RehabVet into Singapore's leading animal rehabilitation clinic.",
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

export default function TeamSection() {
  return (
    <section className="!bg-primary_shade">
      <div className="container">
        <SectionHeader
          className="text-center mb-10 lg:mb-16"
          subtitle="Our People"
          title="Meet Our Team"
        />

        {/* Dr. Sara Lam — featured */}
        <div
          className="mb-10 rounded-2xl bg-white border border-border_one overflow-hidden"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative h-72 md:h-auto min-h-[320px] overflow-hidden bg-primary_shade">
              <Image
                src={TEAM_MEMBERS[0].photo}
                alt={TEAM_MEMBERS[0].name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center space-y-3">
              <span className="inline-block rounded-full bg-primary_shade px-3 py-0.5 text-xs font-bold text-primary self-start">
                Founder
              </span>
              <h3>{TEAM_MEMBERS[0].name}</h3>
              <p className="text-lg font-semibold text-primary">{TEAM_MEMBERS[0].role}</p>
              {TEAM_MEMBERS[0].credentials && (
                <p className="text-sm text-text_color/60 italic">{TEAM_MEMBERS[0].credentials}</p>
              )}
              {TEAM_MEMBERS[0].bio && (
                <p className="leading-relaxed text-text_color">{TEAM_MEMBERS[0].bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Rest of team */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.slice(1).map((member, i) => (
            <div
              key={member.name}
              className="d2c_team_card rounded-2xl bg-white border border-border_one overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={100 + (i % 3) * 100}
            >
              <div className="relative h-72 overflow-hidden bg-primary_shade">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-[center_15%]"
                />
              </div>
              <div className="p-6 space-y-1">
                <h5 className="!font-bold">{member.name}</h5>
                <p className="text-sm font-semibold text-primary">{member.role}</p>
                {member.credentials && (
                  <p className="text-xs text-text_color/60 italic">{member.credentials}</p>
                )}
                {member.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-text_color">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
