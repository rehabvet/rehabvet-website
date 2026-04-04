import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | RehabVet',
  description:
    'Answers to common questions about RehabVet\'s veterinary rehabilitation services in Singapore — hydrotherapy, physiotherapy, acupuncture, pricing and more.',
}

type FaqItem = { question: string; answer: string }

const FAQ_DATA: { category: string; items: FaqItem[] }[] = [
  {
    category: 'General Questions',
    items: [
      {
        question: 'What is RehabVet?',
        answer:
          'RehabVet is a specialised veterinary rehabilitation centre established in 2019 by Dr. Sara Lam, offering physiotherapy, hydrotherapy, and holistic treatments for dogs and cats.',
      },
      {
        question: 'Who founded RehabVet?',
        answer:
          'RehabVet was founded by Dr Sara Lam in 2019. She holds a Bachelor of Veterinary Science from the University of Sydney, is a Certified Canine Rehabilitation Therapist (CCRT), and a Certified Veterinary Acupuncturist (CVA).',
      },
      {
        question: 'Where is RehabVet located?',
        answer:
          'Our clinic is located at 513 Serangoon Road, Singapore — a convenient location accessible by car or public transport.',
      },
      {
        question: 'Why choose RehabVet over a regular vet clinic?',
        answer:
          'We focus exclusively on advanced rehabilitation techniques, ensuring personalised care and faster pet recovery.',
      },
      {
        question: 'What animals does RehabVet treat?',
        answer:
          'We primarily treat dogs and cats but also welcome other small animals needing rehabilitation.',
      },
      {
        question: 'Are your hydrotherapists certified?',
        answer:
          'Yes, all our hydrotherapists are certified by Greyfriars, a renowned UK training centre specialising in canine hydrotherapy.',
      },
      {
        question: 'Do you offer on-site diagnostics?',
        answer:
          'We have basic diagnostic tools on-site and work with vet partners for advanced imaging if needed.',
      },
      {
        question: 'What makes RehabVet unique?',
        answer:
          'Our dedicated team, specialised treatments, and evidence-based approaches set us apart in pet rehabilitation.',
      },
      {
        question: 'Does RehabVet handle emergencies?',
        answer:
          'We focus on rehabilitative care and partner with 24/7 emergency clinics for urgent medical situations.',
      },
      {
        question: 'Is there parking or easy access?',
        answer:
          'Yes, we provide ample parking and have pet-friendly facilities for convenient drop-off and pick-up.',
      },
    ],
  },
  {
    category: 'Conditions Treated',
    items: [
      {
        question: 'Which conditions do you treat most often?',
        answer:
          'Commonly: arthritis, hip dysplasia, intervertebral disc disease (IVDD), post-surgery recovery, and general mobility issues.',
      },
      {
        question: 'Do you handle neurological cases?',
        answer:
          'Yes. We help with nerve injuries, spinal conditions, and neurological disorders to improve function and reduce pain.',
      },
      {
        question: 'Can you treat chronic pain and inflammation?',
        answer:
          'Absolutely. Our therapies help manage chronic conditions, reducing inflammation and pain over time.',
      },
      {
        question: 'What about obesity-related mobility problems?',
        answer:
          'We design weight management and exercise programmes to reduce stress on joints and promote healthier movement.',
      },
      {
        question: 'Do you treat sports injuries in dogs?',
        answer:
          'Yes. We offer targeted rehab and conditioning programmes for canine athletes recovering from strains or injuries.',
      },
      {
        question: 'Are there age restrictions for treatments?',
        answer:
          'Pets of all ages can benefit, from puppies with developmental issues to senior pets needing mobility support.',
      },
      {
        question: 'Do you handle post-operative rehabilitation?',
        answer:
          "Yes. We specialise in helping pets recover after surgeries like orthopaedic procedures or ligament repairs.",
      },
      {
        question: 'Can cats receive therapy for arthritis or fractures?',
        answer:
          'Absolutely. Cats also benefit from physiotherapy, hydrotherapy, and gentle exercises to aid recovery.',
      },
      {
        question: 'Do you treat congenital issues like patellar luxation?',
        answer:
          'Yes. We help stabilise joints, reduce pain, and improve function in pets with congenital or inherited conditions.',
      },
      {
        question: 'Can RehabVet help with degenerative myelopathy?',
        answer:
          'Our therapies can slow progression, improve comfort, and maintain mobility for dogs with degenerative myelopathy.',
      },
    ],
  },
  {
    category: 'Services & Therapy',
    items: [
      {
        question: 'What types of rehabilitation services do you offer?',
        answer:
          'We provide physiotherapy, hydrotherapy, acupuncture, laser therapy, shockwave therapy, and more.',
      },
      {
        question: 'How does hydrotherapy help pets?',
        answer:
          'Warm water treadmill or pool exercises reduce joint stress, strengthen muscles, and speed recovery.',
      },
      {
        question: 'What is veterinary physiotherapy exactly?',
        answer:
          "It's a specialised approach using exercises, massage, and modalities like ultrasound to enhance mobility and reduce pain.",
      },
      {
        question: 'Do you offer acupuncture for pain relief?',
        answer:
          'Yes, acupuncture reduces inflammation, promotes healing, and complements traditional veterinary care.',
      },
      {
        question: 'Is laser therapy available for wound healing?',
        answer:
          'Yes, cold laser therapy accelerates tissue repair, reduces inflammation, and alleviates pain.',
      },
      {
        question: 'How does shockwave therapy work?',
        answer:
          'It sends high-energy sound waves to stimulate healing and reduce chronic pain.',
      },
      {
        question: 'What are "therapeutic exercises"?',
        answer:
          'These are prescribed activities designed to build strength, flexibility, and stability.',
      },
      {
        question: 'Do you offer holistic or integrative treatments?',
        answer:
          'Yes, we combine Western and Eastern approaches, including herbs, massage, and nutritional guidance, for comprehensive pet care.',
      },
      {
        question: 'Are rehabilitation services tailored to each pet?',
        answer:
          "Every pet receives a custom plan based on their condition, breed, age, and overall health.",
      },
      {
        question: 'Do you offer maintenance programmes after recovery?',
        answer:
          'Yes, we create ongoing wellness and exercise regimens to help pets maintain mobility and comfort.',
      },
    ],
  },
  {
    category: 'Safety & Efficacy',
    items: [
      {
        question: 'Is pet rehabilitation safe?',
        answer:
          'Yes. Our therapies, performed by certified professionals, are gentle, controlled, and have minimal risk.',
      },
      {
        question: 'Can these therapies replace standard veterinary care?',
        answer:
          "They're complementary. We work alongside your primary vet to enhance, not replace, conventional treatments.",
      },
      {
        question: 'How soon will I see results in my pet?',
        answer:
          'Results vary; some pets show improvement after a few sessions, while others require ongoing therapy.',
      },
      {
        question: 'Is hydrotherapy safe for older or anxious pets?',
        answer:
          'Yes, with proper supervision, water-based exercises are gentle and highly beneficial for seniors or nervous pets.',
      },
      {
        question: 'What if my pet hates water?',
        answer:
          'We use gradual introductions, warm water, and positive reinforcement to ensure a stress-free experience.',
      },
      {
        question: 'Do pets need sedation during acupuncture or therapy?',
        answer:
          'Generally no. Most pets tolerate sessions well, and sedation is rarely required.',
      },
      {
        question: 'Are there side effects to acupuncture or laser therapy?',
        answer:
          'Minor soreness or fatigue may occur, but serious side effects are rare under professional care.',
      },
      {
        question: 'How do you ensure hygiene in the facility?',
        answer:
          'We maintain strict cleanliness protocols, sanitising equipment and therapy areas regularly.',
      },
      {
        question: 'Do you handle any post-therapy complications?',
        answer:
          "Yes, we closely monitor each pet's response and address any concerns promptly.",
      },
      {
        question: 'Are your rehab methods supported by research?',
        answer:
          'Absolutely. We follow evidence-based practices to ensure proven, effective outcomes in veterinary rehabilitation.',
      },
    ],
  },
  {
    category: 'Appointments',
    items: [
      {
        question: 'How do I schedule an appointment at RehabVet?',
        answer:
          "Simply call our clinic or book online via our website. We'll arrange a convenient slot for you and your pet.",
      },
      {
        question: 'Do I need a referral from my regular vet?',
        answer:
          'Not necessarily, though having your pet\'s medical records can be helpful. We welcome direct appointments.',
      },
      {
        question: 'What are your hours of operation?',
        answer:
          "We're open seven days a week with extended hours. Please check our website for the latest schedule.",
      },
      {
        question: 'Can I get a same-day appointment?',
        answer:
          'Availability varies. Call ahead or use our online booking portal to see if same-day slots are available.',
      },
      {
        question: 'What should I bring to the first session?',
        answer:
          "Please bring any relevant medical records, x-rays, medications, and your pet's favourite treats or toys for comfort.",
      },
      {
        question: 'How long is a typical therapy session?',
        answer:
          "Most sessions last 30–60 minutes, depending on the treatment plan and your pet's needs.",
      },
      {
        question: 'Should my pet fast before hydrotherapy?',
        answer:
          'A light meal a few hours prior is usually sufficient; avoid heavy meals to prevent discomfort in the water.',
      },
      {
        question: 'Is there a waitlist for certain services?',
        answer:
          'Occasionally, popular services like hydrotherapy may have a short wait. We strive to schedule appointments promptly.',
      },
      {
        question: 'Can I cancel or reschedule an appointment easily?',
        answer:
          'Yes, just contact us at least 24 hours in advance to adjust your appointment without fees.',
      },
      {
        question: 'Do you offer home visits?',
        answer:
          'In special cases, we provide limited home therapy visits for pets unable to travel, subject to location and availability.',
      },
    ],
  },
  {
    category: 'Pricing & Insurance',
    items: [
      {
        question: 'How much does a rehab session cost at RehabVet?',
        answer:
          "Fees vary by treatment. Please contact us for a detailed cost estimate tailored to your pet's specific needs.",
      },
      {
        question: 'Do you offer package deals or discounts?',
        answer:
          'Yes, we offer multi-session packages and occasional promotions to help manage costs.',
      },
      {
        question: 'Will my pet insurance cover these therapies?',
        answer:
          'Many insurers cover rehab if prescribed by a vet. Check with your provider to confirm coverage.',
      },
      {
        question: 'Can I pay by credit card or other methods?',
        answer:
          'We accept cash, major credit cards, and select digital payment options for your convenience.',
      },
      {
        question: 'Is financial assistance available?',
        answer:
          'We sometimes work with pet welfare groups. Contact us to discuss possible payment options or plans.',
      },
      {
        question: 'Do you provide itemised invoices for insurance claims?',
        answer:
          'Yes, we offer detailed receipts and documentation required by most pet insurance carriers.',
      },
      {
        question: 'Are there consultation fees in addition to therapy costs?',
        answer:
          'A consultation fee is charged for the initial assessment, separate from therapy session fees.',
      },
      {
        question: 'Is there a charge for follow-up assessments?',
        answer:
          'Follow-up fees depend on the complexity of the re-evaluation; please ask for specifics during your first visit.',
      },
      {
        question: 'Do you provide cost estimates before treatment?',
        answer:
          'Yes, we discuss treatment plans and provide estimated costs so you can make an informed decision.',
      },
      {
        question: 'Are refunds possible if I discontinue therapy early?',
        answer:
          'Refunds or credits are assessed on a case-by-case basis, especially for prepaid packages.',
      },
    ],
  },
  {
    category: 'Staff & Qualifications',
    items: [
      {
        question: 'Who will be treating my pet?',
        answer:
          'Our rehab team comprises certified veterinary physiotherapists, hydrotherapists, and experienced support staff.',
      },
      {
        question: 'Are your therapists certified or licensed?',
        answer:
          'Yes, all our therapists hold recognised certifications and undergo ongoing training in veterinary rehabilitation.',
      },
      {
        question: 'Do you have a veterinarian on-site?',
        answer:
          'Yes, a licensed vet oversees all rehabilitation protocols and patient care plans.',
      },
      {
        question: 'Can I meet the therapist before treatment starts?',
        answer:
          "Certainly. We encourage an initial consultation to discuss your pet's history and treatment needs.",
      },
      {
        question: 'What experience do you have with senior pets?',
        answer:
          'We have extensive experience helping older pets regain mobility and manage pain through gentle rehabilitation.',
      },
      {
        question: 'Are your staff trained in pet CPR or emergency care?',
        answer:
          "Yes, our team is trained in basic emergency procedures to ensure your pet's safety.",
      },
      {
        question: 'Can your staff handle large or aggressive dogs?',
        answer:
          'Our team is equipped to handle pets of all sizes and temperaments using safe, gentle techniques.',
      },
      {
        question: 'Do you work with specialised vets for complex cases?',
        answer:
          'Yes, we collaborate with orthopaedic surgeons, neurologists, and other specialists when needed.',
      },
      {
        question: 'How do you stay updated on new rehabilitation techniques?',
        answer:
          'We attend continuing education courses, conferences, and review the latest veterinary research.',
      },
      {
        question: 'What if I have concerns about the treatment?',
        answer:
          'Please share any concerns immediately so we can adjust the approach for the safest and most effective outcome.',
      },
    ],
  },
  {
    category: 'During & After Therapy',
    items: [
      {
        question: "Can I watch my pet's therapy sessions?",
        answer:
          'Yes, we welcome owners to observe sessions and learn techniques for home care.',
      },
      {
        question: 'How do I know my pet is progressing?',
        answer:
          'We monitor improvements in mobility, pain levels, and overall function at each session and keep you updated.',
      },
      {
        question: 'Will my pet need to rest after sessions?',
        answer:
          'Some pets may feel tired; light activity is encouraged if tolerated, but rest is recommended when needed.',
      },
      {
        question: 'Do you provide at-home exercise instructions?',
        answer:
          'Yes, we offer tailored home exercise plans to support progress between sessions.',
      },
      {
        question: 'How can I help my pet recover faster?',
        answer:
          'Following the recommended plan, maintaining a healthy diet, ensuring proper rest, and consistent exercise all help.',
      },
      {
        question: 'Can therapy sessions be done if my pet is on medication?',
        answer:
          'Yes, we coordinate with your vet to align medications with rehabilitation for optimal outcomes.',
      },
      {
        question: 'What if my pet seems sore the next day?',
        answer:
          'Mild soreness is normal; if severe or prolonged, please contact us or your vet for advice.',
      },
      {
        question: 'How soon can my pet resume normal activities?',
        answer:
          "This varies by condition; we'll advise on safe activity levels and timelines after assessing progress.",
      },
      {
        question: 'Do you provide progress reports for my primary vet?',
        answer:
          'Yes, we share regular updates with your primary vet to ensure coordinated care.',
      },
      {
        question: 'Is there a risk of re-injury after rehabilitation?',
        answer:
          'Proper aftercare and a gradual return to activity help minimise re-injury risk, though ongoing vigilance is important.',
      },
    ],
  },
  {
    category: 'Facility & Equipment',
    items: [
      {
        question: 'What facilities are available at RehabVet?',
        answer:
          'Our clinic features an underwater treadmill, therapy pool, exercise gym, laser therapy room, and comfortable treatment areas.',
      },
      {
        question: 'Is your facility climate-controlled?',
        answer:
          'Yes, all our therapy and treatment areas are maintained at optimal temperatures for pet comfort.',
      },
      {
        question: 'Are your pools sanitised regularly?',
        answer:
          'We adhere to strict cleanliness protocols, with pools filtered and sanitised after each session.',
      },
      {
        question: 'Do you have ramps and harnesses for disabled pets?',
        answer:
          'Yes, we are fully equipped with ramps, support slings, and harnesses to assist pets with mobility challenges.',
      },
      {
        question: 'How big are your hydrotherapy pools?',
        answer:
          'Our pools are spacious and designed to accommodate both small and large breeds comfortably during guided sessions.',
      },
      {
        question: 'Do you offer private therapy rooms?',
        answer:
          'Yes, private therapy rooms are available for pets needing a quiet environment or extended one-on-one sessions.',
      },
      {
        question: 'Are the therapy areas accessible for senior owners?',
        answer:
          'We provide barrier-free access with ample seating to accommodate pet owners of all ages and abilities.',
      },
      {
        question: 'Can I tour the facility before starting therapy?',
        answer:
          'Yes, tours can be arranged by appointment so you can view our setup and meet the team.',
      },
      {
        question: 'How do you handle cleaning between sessions?',
        answer:
          'All treatment areas are disinfected and equipment sanitised after each use to prevent cross-contamination.',
      },
      {
        question: 'Is there a separate area for cats?',
        answer:
          'Yes, we have dedicated spaces to reduce stress and provide a calmer environment for feline patients.',
      },
    ],
  },
  {
    category: 'Additional FAQs',
    items: [
      {
        question: 'What if my pet is aggressive or fearful?',
        answer:
          'We employ positive reinforcement and gentle handling; we can also schedule quieter sessions to minimise stress.',
      },
      {
        question: 'Do you offer grooming services?',
        answer:
          'Our focus is rehabilitation; however, we can recommend trusted groomers if needed.',
      },
      {
        question: 'Can rehabilitation delay or prevent surgery?',
        answer:
          'In some cases, rehab can stabilise joints and manage pain, potentially delaying or reducing the need for surgery.',
      },
      {
        question: 'Do you work with exotic pets?',
        answer:
          'We primarily treat cats and dogs, but please contact us to discuss rehabilitation for exotic pets.',
      },
      {
        question: "What if my pet doesn't improve?",
        answer:
          'We reassess and adjust the treatment plan, or refer you to specialists to ensure the best care.',
      },
      {
        question: 'Does rehabilitation help with weight loss?',
        answer:
          'Yes, a combination of controlled exercise and dietary recommendations can aid in healthy weight management.',
      },
      {
        question: "What if I can't attend every session?",
        answer:
          "Consistency is key. We'll work with you to create a realistic schedule and provide home exercises to maintain progress.",
      },
      {
        question: 'Can I bring multiple pets at once?',
        answer:
          'We recommend separate appointments to ensure focused, one-on-one therapy, but we strive to accommodate families when possible.',
      },
      {
        question: 'Do you host educational workshops?',
        answer:
          'Yes, we regularly organise pet wellness and rehabilitation workshops. Please check our website for upcoming events.',
      },
      {
        question: 'How do I stay updated on RehabVet news?',
        answer:
          'Follow us on social media and subscribe to our newsletter for updates, tips, and success stories.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary-300 mb-2">
            <span className="text-primary-400">Home</span> / FAQ
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Frequently Asked Questions</h1>
        </div>
      </section>

      {/* Category tabs */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Category quick links */}
          <nav className="mb-12 flex flex-wrap gap-2">
            {FAQ_DATA.map((section) => (
              <a
                key={section.category}
                href={`#${section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="rounded-full border border-primary-200 px-4 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50 hover:border-primary-400 transition-colors"
              >
                {section.category}
              </a>
            ))}
          </nav>

          {/* FAQ sections */}
          <div className="space-y-14">
            {FAQ_DATA.map((section) => (
              <div
                key={section.category}
                id={section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                  {section.category}
                </h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-xl border border-gray-200 bg-white overflow-hidden"
                    >
                      <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                        <span>{item.question}</span>
                        <svg
                          className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-500 py-14">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mt-3 text-primary-100">
            Our team is happy to help. Get in touch and we&apos;ll answer any questions you have about your pet&apos;s rehabilitation.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  )
}
