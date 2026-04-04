import type { Metadata } from 'next'
import Link from 'next/link'
import PagesHeader from '@/components/shared/pages-header'
import SectionHeader from '@/components/shared/section-header'
import Button from '@/components/shared/primary-button'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Rehabilitation Medical Conditions | RehabVet Clinic',
  description: 'RehabVet treats a wide range of conditions including developmental, degenerative, inflammatory, neurological, and orthopaedic conditions in animals.',
}

type ConditionItem = { name: string; description: string }

const CONDITIONS: { category: string; color: { badge: string; border: string; bg: string }; items: ConditionItem[] }[] = [
  {
    category: 'Developmental Disorders',
    color: { badge: 'bg-blue-100 text-blue-800', border: 'border-l-blue-500', bg: 'bg-blue-500' },
    items: [
      { name: 'Hip Dysplasia', description: "A hereditary condition where the hip joint doesn't develop properly, leading to arthritis and pain." },
      { name: 'Elbow Dysplasia', description: 'A group of developmental abnormalities in the elbow joint that can lead to arthritis and pain.' },
      { name: 'Patellar Luxation', description: 'A condition in which the kneecap (patella) dislocates or moves out of its normal position, causing pain and lameness.' },
      { name: 'Osteochondritis Dissecans (OCD)', description: 'A condition where the cartilage in a joint becomes damaged and separates from the underlying bone, causing pain and inflammation.' },
      { name: 'Legg-Calvé-Perthes Disease', description: 'A degenerative hip joint disorder where the head of the femur bone begins to break down and die, causing pain and lameness.' },
      { name: 'Achondroplasia', description: 'A minimally invasive surgical procedure used to diagnose and treat joint problems, often used for elbow and shoulder dysplasia.' },
      { name: 'Shoulder Osteochondrosis', description: 'A developmental disorder affecting the shoulder joint, causing pain and lameness due to abnormal cartilage growth.' },
      { name: 'Tarsal Osteochondrosis', description: 'A developmental disorder affecting the ankle joint (tarsus), causing pain and lameness due to abnormal cartilage growth.' },
    ],
  },
  {
    category: 'Degenerative Conditions',
    color: { badge: 'bg-amber-100 text-amber-800', border: 'border-l-amber-500', bg: 'bg-amber-500' },
    items: [
      { name: 'Intervertebral Disc Disease (IVDD)', description: 'A degenerative condition affecting the spinal discs, potentially leading to nerve damage, pain, and paralysis.' },
      { name: 'Vestibular Disease', description: 'Affecting the balance system, usually caused by inflammation or damage to the inner ear or the vestibular nerve.' },
      { name: 'Degenerative Myelopathy', description: 'A progressive, non-painful neurological disorder affecting the spinal cord, causing gradual loss of coordination and weakness.' },
      { name: 'Osteoarthritis', description: 'A degenerative joint disease caused by wear and tear, injury, or other factors, leading to pain, stiffness, and reduced mobility.' },
      { name: 'Spondylosis', description: 'A degenerative condition where the vertebrae develop bony spurs, potentially leading to spinal pain and reduced mobility.' },
      { name: 'Lumbosacral Disease', description: 'A degenerative condition affecting the lower back and sacrum, leading to pain, nerve damage, and mobility issues.' },
      { name: 'Atlantoaxial Instability', description: 'A congenital condition where the first two cervical vertebrae are unstable, potentially causing spinal cord compression.' },
    ],
  },
  {
    category: 'Inflammatory Conditions',
    color: { badge: 'bg-orange-100 text-orange-800', border: 'border-l-orange-500', bg: 'bg-orange-500' },
    items: [
      { name: 'Panosteitis', description: 'An inflammatory bone disease, often occurring in young, large-breed dogs, causing lameness and pain.' },
      { name: 'Hypertrophic Osteodystrophy (HOD)', description: 'A bone disease occurring in young, rapidly growing dogs, causing swelling, pain, and fever.' },
      { name: 'Polyarthritis', description: 'Inflammation of multiple joints, often due to an immune-mediated response, causing pain, swelling, and reduced mobility.' },
      { name: 'Bicipital Tenosynovitis', description: 'Inflammation of the tendon sheath surrounding the biceps tendon, causing pain and lameness in the shoulder joint.' },
      { name: 'Septic Arthritis', description: 'Infection in a joint, typically caused by bacteria, leading to inflammation, pain, and potentially irreversible joint damage.' },
      { name: 'Osteomyelitis', description: 'Inflammation and infection of the bone and bone marrow, often caused by bacteria, resulting in pain and lameness.' },
      { name: 'Discospondylitis', description: 'Inflammation and infection of the intervertebral discs and adjacent vertebrae, causing pain, weakness, and neurological complications.' },
    ],
  },
  {
    category: 'Injuries',
    color: { badge: 'bg-red-100 text-red-800', border: 'border-l-red-500', bg: 'bg-red-500' },
    items: [
      { name: 'Cruciate Ligament Injuries', description: 'Injuries to the cruciate ligaments in the knee joint, often require surgery to repair and prevent further damage.' },
      { name: 'Bone Fractures', description: 'Breaks in bones caused by trauma or injury, which can vary in severity and require different treatments.' },
      { name: 'Growth Plate Injuries', description: 'Injuries to the growth plates in young, growing dogs, which can affect bone development.' },
      { name: 'Carpal Hyperextension Injury', description: 'An injury where the wrist joint (carpus) is overextended, leading to pain, lameness, and potential ligament damage.' },
      { name: 'Medial Shoulder Syndrome', description: 'A group of shoulder joint injuries, including ligament and tendon damage, that cause lameness and pain.' },
    ],
  },
  {
    category: 'Neurological Disorders',
    color: { badge: 'bg-purple-100 text-purple-800', border: 'border-l-purple-500', bg: 'bg-purple-500' },
    items: [
      { name: 'Canine Wobbler Syndrome', description: 'A neurological disorder caused by compression of the spinal cord in the neck, leading to weakness and instability.' },
      { name: 'Myasthenia Gravis', description: 'An autoimmune neuromuscular disorder causing muscle weakness, which can affect the limbs.' },
      { name: 'Fibrocartilaginous Embolism (FCE)', description: 'A blockage of blood vessels in the spinal cord, leading to sudden weakness, pain, and possible paralysis.' },
    ],
  },
  {
    category: 'Tumors',
    color: { badge: 'bg-gray-100 text-gray-800', border: 'border-l-gray-500', bg: 'bg-gray-500' },
    items: [
      { name: 'Osteochondromatosis', description: 'A condition involving the growth of benign tumors on bones, which can affect mobility and cause pain.' },
      { name: 'Osteosarcoma', description: 'A malignant bone tumor, the most common bone cancer in dogs, resulting in pain, lameness, and potential bone destruction.' },
    ],
  },
  {
    category: 'Other',
    color: { badge: 'bg-teal-100 text-teal-800', border: 'border-l-teal-500', bg: 'bg-teal-500' },
    items: [
      { name: 'Calcinosis Circumscripta', description: 'A rare condition where calcium deposits form nodules in the skin, joints, or tendons, causing pain and reduced mobility.' },
    ],
  },
]

export default function ConditionsPage() {
  return (
    <>
      <PagesHeader
        title="Rehabilitation Medical Conditions"
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Conditions' }]}
      />

      {/* Category quick links */}
      <section className="!py-4 border-b border-border_one !bg-white sticky top-[76px] z-10">
        <div className="container">
          <nav className="flex flex-wrap gap-2">
            {CONDITIONS.map((group) => (
              <a
                key={group.category}
                href={`#${group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors hover:opacity-80 ${group.color.badge}`}
              >
                {group.category} ({group.items.length})
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Conditions by Category */}
      <section>
        <div className="container space-y-16">
          {CONDITIONS.map((group, gi) => (
            <div
              key={group.category}
              id={group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            >
              <div className="flex items-center gap-4 mb-8" data-aos="fade-up">
                <h3>{group.category}</h3>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${group.color.badge}`}>
                  {group.items.length} condition{group.items.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((condition, i) => (
                  <div
                    key={condition.name}
                    className={`rounded-xl border border-border_one border-l-4 ${group.color.border} bg-white p-6`}
                    data-aos="fade-up"
                    data-aos-delay={100 + i * 50}
                  >
                    <h5 className="!font-bold !text-lg">{condition.name}</h5>
                    <p className="mt-2 text-sm">{condition.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="!bg-primary_shade">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionHeader className="text-center" subtitle="Get Help" title="Not sure if we can help?" />
            <p className="text-lg" data-aos="fade-up" data-aos-delay={300}>
              Contact our team and we&apos;ll discuss whether rehabilitation is right for your pet.
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
