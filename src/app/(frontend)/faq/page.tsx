import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers to common questions about RehabVet\'s veterinary rehabilitation services, appointments, pricing, and what to expect.',
}

const FAQ_CATEGORIES = ['General', 'Appointments', 'Pricing', 'Services', 'Recovery'] as const

const defaultFaqs: Record<string, { question: string; answer: string }[]> = {
  General: [
    {
      question: 'What is veterinary rehabilitation?',
      answer:
        'Veterinary rehabilitation (also called veterinary physiotherapy) uses evidence-based techniques to help animals recover from injury or surgery, manage chronic conditions, and maintain quality of life. It draws on techniques adapted from human physiotherapy including therapeutic exercises, hydrotherapy, manual therapy, and electrotherapy.',
    },
    {
      question: 'Do I need a referral from my vet?',
      answer:
        'A referral is not strictly required, but we do work closely with your primary vet. We recommend letting your vet know you are seeking rehabilitation so we can coordinate your pet\'s care. If your pet has had recent surgery or a complex medical history, a referral letter with relevant records is very helpful.',
    },
    {
      question: 'What species do you treat?',
      answer:
        'We primarily treat dogs and cats, but we also see rabbits, guinea pigs, and other small animals. Please contact us to discuss your specific pet and we will advise whether rehabilitation is suitable.',
    },
  ],
  Appointments: [
    {
      question: 'How do I book an appointment?',
      answer:
        'You can book by calling us directly, sending an email, or using the contact form on our website. We will arrange an initial consultation to assess your pet and discuss treatment options before commencing any programme.',
    },
    {
      question: 'How long does an appointment take?',
      answer:
        'An initial consultation typically takes 60–90 minutes as we conduct a thorough assessment and discuss your pet\'s history and goals. Follow-up treatment sessions are usually 45–60 minutes depending on the modalities being used.',
    },
    {
      question: 'Can I stay with my pet during treatment?',
      answer:
        'Yes, owners are welcome and encouraged to stay during treatment sessions. Your presence can be reassuring for your pet, and it also helps you understand the exercises and techniques so you can support their recovery at home.',
    },
    {
      question: 'What should I bring to the first appointment?',
      answer:
        'Please bring any relevant medical records, radiographs or MRI reports, medications your pet is currently taking, and your referral letter if you have one. If your pet is on a leash, please bring a comfortable harness or collar.',
    },
  ],
  Pricing: [
    {
      question: 'How much do rehabilitation sessions cost?',
      answer:
        'Pricing varies depending on the type and duration of treatment. Our initial consultation fee covers a comprehensive assessment and treatment plan. Subsequent sessions vary by modality. Please contact us for a current fee schedule — we are committed to transparent pricing.',
    },
    {
      question: 'Is veterinary rehabilitation covered by pet insurance?',
      answer:
        'Many pet insurance policies cover veterinary rehabilitation when it is deemed medically necessary. We recommend checking your policy details and asking your insurer. We provide detailed invoices and clinical notes to support insurance claims.',
    },
    {
      question: 'Do you offer payment plans?',
      answer:
        'We understand that rehabilitation can represent a significant commitment. Please speak with our team about payment options — we aim to work with families to ensure pets can access the care they need.',
    },
  ],
  Services: [
    {
      question: 'What is hydrotherapy and how does it help?',
      answer:
        'Hydrotherapy uses the properties of water — buoyancy, resistance, and warmth — to facilitate exercise with reduced load on joints. Our underwater treadmill allows pets to walk and build muscle strength without the full impact of weight bearing, making it ideal for post-surgical recovery and arthritis management.',
    },
    {
      question: 'What conditions benefit most from rehabilitation?',
      answer:
        'Common conditions we treat include cruciate ligament injuries, hip and elbow dysplasia, intervertebral disc disease (IVDD), osteoarthritis, post-amputation recovery, neurological conditions such as FCE, and post-surgical rehabilitation following orthopaedic procedures. See our Conditions page for the full list.',
    },
    {
      question: 'How is a rehabilitation programme structured?',
      answer:
        'Every programme is tailored to the individual patient. After the initial assessment, we create a treatment plan outlining frequency of clinic sessions, home exercises, and goals. We review progress regularly and adjust the programme as your pet improves.',
    },
  ],
  Recovery: [
    {
      question: 'How quickly will I see results?',
      answer:
        'This varies greatly depending on the condition, severity, age, and overall health of your pet. Some animals show improvement within a few sessions; others require weeks or months of consistent rehabilitation. We set realistic goals at the outset and track progress throughout.',
    },
    {
      question: 'What can I do at home to support my pet\'s recovery?',
      answer:
        'Home care is a vital part of rehabilitation success. We provide detailed home exercise programmes, activity restrictions, and advice on environmental modifications (such as ramps, non-slip mats, and raised food bowls) to support your pet between clinic visits.',
    },
    {
      question: 'When is rehabilitation no longer needed?',
      answer:
        'For acute conditions, rehabilitation typically concludes when functional goals are met. For chronic conditions like osteoarthritis or degenerative myelopathy, ongoing maintenance sessions may be beneficial. We will guide you through discharge planning and advise when ongoing care is in your pet\'s best interest.',
    },
  ],
}

export default async function FaqPage() {
  let faqs: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'faqs', limit: 100, sort: 'category' })
    faqs = result.docs
  } catch {
    // DB not available yet
  }

  const groupedFaqs: Record<string, { question: string; answer: string }[]> =
    faqs.length > 0
      ? FAQ_CATEGORIES.reduce(
          (acc, cat) => {
            acc[cat] = faqs
              .filter((f: any) => f.category === cat)
              .map((f: any) => ({ question: f.question, answer: f.answer }))
            return acc
          },
          {} as Record<string, { question: string; answer: string }[]>,
        )
      : defaultFaqs

  const allCategories = FAQ_CATEGORIES.filter((cat) => (groupedFaqs[cat] || []).length > 0)

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            Everything you need to know about veterinary rehabilitation at RehabVet. Can&apos;t find
            what you&apos;re looking for? Contact us directly.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
          {allCategories.map((category) => {
            const items = groupedFaqs[category] || []
            if (items.length === 0) return null
            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
                  {category}
                </h2>
                <div className="space-y-6">
                  {items.map((faq, i) => (
                    <details
                      key={i}
                      className="group rounded-2xl border border-gray-100 bg-white shadow-sm open:shadow-md transition-shadow"
                    >
                      <summary className="flex cursor-pointer items-start justify-between gap-4 px-6 py-5 font-semibold text-gray-900 marker:content-none list-none">
                        <span>{faq.question}</span>
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-primary-500 transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-primary-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Still have questions?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our friendly team is happy to help. Give us a call or send us a message.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-accent-400 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-primary-500 px-8 py-3 font-semibold text-primary-500 hover:bg-primary-50 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
