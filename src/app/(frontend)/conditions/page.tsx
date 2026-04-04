import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Rehabilitation Medical Conditions | RehabVet Clinic',
  description:
    'RehabVet treats a wide range of conditions including developmental, degenerative, inflammatory, neurological, and orthopaedic conditions in animals.',
}

type ConditionItem = { name: string; description: string }

const CONDITIONS: { category: string; color: { badge: string; border: string }; items: ConditionItem[] }[] = [
  {
    category: 'Developmental Disorders',
    color: { badge: 'bg-blue-100 text-blue-800', border: 'border-l-blue-500' },
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
    color: { badge: 'bg-amber-100 text-amber-800', border: 'border-l-amber-500' },
    items: [
      { name: 'Intervertebral Disc Disease (IVDD)', description: 'A degenerative condition affecting the spinal discs, potentially leading to nerve damage, pain, and paralysis.' },
      { name: 'Vestibular Disease', description: 'Affecting the balance system, usually caused by inflammation or damage to the inner ear or the vestibular nerve, leading to symptoms such as dizziness, loss of balance, and abnormal eye movements.' },
      { name: 'Degenerative Myelopathy', description: 'A progressive, non-painful neurological disorder affecting the spinal cord, causing gradual loss of coordination, weakness, and eventually paralysis of the hind limbs.' },
      { name: 'Osteoarthritis', description: 'A degenerative joint disease caused by wear and tear, injury, or other factors, leading to pain, stiffness, and reduced mobility.' },
      { name: 'Spondylosis', description: 'A degenerative condition where the vertebrae develop bony spurs, potentially leading to spinal pain and reduced mobility.' },
      { name: 'Lumbosacral Disease', description: 'A degenerative condition affecting the lower back and sacrum, leading to pain, nerve damage, and mobility issues.' },
      { name: 'Atlantoaxial Instability', description: 'A congenital condition where the first two cervical vertebrae are unstable, potentially causing spinal cord compression and neurological issues.' },
    ],
  },
  {
    category: 'Inflammatory Conditions',
    color: { badge: 'bg-orange-100 text-orange-800', border: 'border-l-orange-500' },
    items: [
      { name: 'Panosteitis', description: 'An inflammatory bone disease, often occurring in young, large-breed dogs, causing lameness and pain.' },
      { name: 'Hypertrophic Osteodystrophy (HOD)', description: 'A bone disease occurring in young, rapidly growing dogs, causing swelling, pain, and fever due to inflammation in the growth plates.' },
      { name: 'Polyarthritis', description: 'Inflammation of multiple joints, often due to an immune-mediated response, causing pain, swelling, and reduced mobility.' },
      { name: 'Bicipital Tenosynovitis', description: 'Inflammation of the tendon sheath surrounding the biceps tendon, causing pain and lameness in the shoulder joint.' },
      { name: 'Septic Arthritis', description: 'Infection in a joint, typically caused by bacteria, leading to inflammation, pain, and potentially irreversible joint damage if left untreated.' },
      { name: 'Osteomyelitis', description: 'Inflammation and infection of the bone and bone marrow, are often caused by bacteria, resulting in pain, lameness, and potential bone destruction.' },
      { name: 'Discospondylitis', description: 'Inflammation and infection of the intervertebral discs and adjacent vertebrae, causing pain, weakness, and potential neurological complications.' },
    ],
  },
  {
    category: 'Injuries',
    color: { badge: 'bg-red-100 text-red-800', border: 'border-l-red-500' },
    items: [
      { name: 'Cruciate Ligament Injuries', description: 'Injuries to the cruciate ligaments in the knee joint, often require surgery to repair and prevent further damage.' },
      { name: 'Bone Fractures', description: 'Breaks in bones caused by trauma or injury, which can vary in severity and require different treatments depending on the location and type.' },
      { name: 'Growth Plate Injuries', description: 'Injuries to the growth plates in young, growing dogs, which can affect bone development and cause pain and lameness.' },
      { name: 'Carpal Hyperextension Injury', description: 'An injury where the wrist joint (carpus) is overextended, leading to pain, lameness, and potential ligament damage.' },
      { name: 'Medial Shoulder Syndrome', description: 'A group of shoulder joint injuries, including ligament and tendon damage, that cause lameness and pain in the affected limb.' },
    ],
  },
  {
    category: 'Neurological Disorders',
    color: { badge: 'bg-purple-100 text-purple-800', border: 'border-l-purple-500' },
    items: [
      { name: 'Canine Wobbler Syndrome', description: 'A neurological disorder caused by compression of the spinal cord in the neck, leading to weakness, instability, and pain.' },
      { name: 'Myasthenia Gravis', description: 'An autoimmune neuromuscular disorder causing muscle weakness, which can affect the limbs and lead to orthopedic issues.' },
      { name: 'Fibrocartilaginous Embolism (FCE)', description: 'A blockage of blood vessels in the spinal cord due to fibrocartilage material, leading to sudden weakness, pain, and possible paralysis.' },
    ],
  },
  {
    category: 'Tumors',
    color: { badge: 'bg-gray-100 text-gray-800', border: 'border-l-gray-500' },
    items: [
      { name: 'Osteochondromatosis', description: 'A blockage of blood vessels in the spinal cord due to fibrocartilage material, leading to sudden weakness, pain, and possible paralysis.' },
      { name: 'Osteosarcoma', description: 'Inflammation and infection of the bone and bone marrow, often caused by bacteria, resulting in pain, lameness, and potential bone destruction.' },
    ],
  },
  {
    category: 'Other',
    color: { badge: 'bg-teal-100 text-teal-800', border: 'border-l-teal-500' },
    items: [
      { name: 'Calcinosis Circumscripta', description: 'A rare condition where calcium deposits form nodules in the skin, joints, or tendons, causing pain and reduced mobility.' },
    ],
  },
]

export default function ConditionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary-300 mb-2">
            <span className="text-primary-400">Home</span> / Conditions
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Rehabilitation Medical Conditions</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Our experienced team treats a broad range of conditions across all life stages. Browse by category to learn how rehabilitation can help your pet.
          </p>
        </div>
      </section>

      {/* Category quick links */}
      <section className="border-b bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-2 py-4">
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
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {CONDITIONS.map((group) => (
            <div
              key={group.category}
              id={group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-900">{group.category}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${group.color.badge}`}
                >
                  {group.items.length} condition{group.items.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((condition) => (
                  <div
                    key={condition.name}
                    className={`rounded-xl border border-gray-100 border-l-4 ${group.color.border} bg-white p-6 shadow-sm`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {condition.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{condition.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Not sure if we can help?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Contact our team and we&apos;ll discuss whether rehabilitation is right for your pet.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
