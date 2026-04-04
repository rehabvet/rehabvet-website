import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'FAQ | RehabVet',
  description:
    'Answers to common questions about RehabVet\'s veterinary rehabilitation services in Singapore — hydrotherapy, physiotherapy, acupuncture, post-surgery rehab, pricing and more.',
}

type FaqItem = { question: string; answer: string }

const FAQ_DATA: { category: string; items: FaqItem[] }[] = [
  {
    category: 'General',
    items: [
      {
        question: 'How can pet rehabilitation and physiotherapy help my pet?',
        answer:
          'Pet rehabilitation and physiotherapy help animals recover from injury, surgery, or chronic conditions by restoring strength, mobility, and function. Using evidence-based techniques such as therapeutic exercises, hydrotherapy, manual therapy, and electrotherapy, our team creates personalised treatment plans that reduce pain, improve range of motion, and enhance your pet\'s quality of life.',
      },
      {
        question: 'What is hydrotherapy and how does it work?',
        answer:
          'Hydrotherapy uses the natural properties of water — buoyancy, resistance, and warmth — to support exercise with reduced stress on joints and muscles. Your pet exercises in warm water, which reduces the impact of their body weight, allowing them to build strength and improve mobility more comfortably than on land. RehabVet offers both underwater treadmill therapy and pool hydrotherapy.',
      },
      {
        question: 'Does my pet need to know how to swim for hydrotherapy?',
        answer:
          'No. Most hydrotherapy for dogs and cats uses a controlled, shallow environment such as an underwater treadmill where your pet walks rather than swims. Our therapists are always present, and we introduce water gradually so your pet can grow comfortable at their own pace.',
      },
      {
        question: 'Is RehabVet a certified and licensed vet clinic?',
        answer:
          'Yes. RehabVet is a fully licensed veterinary clinic in Singapore, registered with the National Parks Board (NParks). Our founder, Dr Sara Lam, holds a BVSc degree and multiple specialist certifications including MANZCVS (Small Animal Surgery), CCRT (Certified Canine Rehabilitation Therapist), and CVA (Certified Veterinary Acupuncturist).',
      },
      {
        question: 'Are your therapists certified?',
        answer:
          'Yes. Our animal rehabilitation therapists hold recognised certifications in canine rehabilitation and related disciplines. We invest in ongoing continuing education to ensure our team remains current with the latest evidence-based practices in veterinary rehabilitation.',
      },
      {
        question: 'How do I book an appointment?',
        answer:
          'You can book an appointment by calling us at +65 6291 6881, sending a WhatsApp message to +65 8798 7554, or filling in the enquiry form on our Contact page. We will get back to you promptly to schedule a consultation.',
      },
      {
        question: 'How long is each treatment session?',
        answer:
          'An initial consultation typically takes 60–90 minutes so we can conduct a thorough assessment and create a personalised treatment plan. Follow-up sessions are generally 45–60 minutes depending on the modalities involved. We will advise you on expected session duration when you book.',
      },
      {
        question: 'Is your facility clean and well-maintained?',
        answer:
          'Absolutely. We maintain the highest standards of hygiene throughout our clinic and pool areas. All equipment is cleaned and disinfected between patients, and water quality in our hydrotherapy pool and treadmill is regularly tested and maintained. The health and safety of your pet is our top priority.',
      },
    ],
  },
  {
    category: 'Dog Rehabilitation',
    items: [
      {
        question: 'What is dog rehabilitation?',
        answer:
          'Dog rehabilitation (also called canine rehabilitation or canine physiotherapy) is a specialised branch of veterinary medicine focused on restoring and improving a dog\'s physical function, reducing pain, and enhancing quality of life. It adapts techniques from human physiotherapy and sports medicine specifically for dogs.',
      },
      {
        question: 'When should I consider dog rehabilitation for my pet?',
        answer:
          'You should consider rehabilitation if your dog has had orthopaedic or neurological surgery, has been diagnosed with a condition like hip dysplasia, arthritis, or IVDD, is recovering from an injury, shows signs of pain or reduced mobility, or is an older dog experiencing age-related stiffness. Rehabilitation can also benefit athletic dogs and those with chronic conditions.',
      },
      {
        question: 'What conditions can be treated with dog rehabilitation?',
        answer:
          'We treat a wide range of conditions including cruciate ligament injuries (TPLO/TTA surgery recovery), hip and elbow dysplasia, intervertebral disc disease (IVDD), degenerative myelopathy, osteoarthritis, fracture recovery, post-amputation rehabilitation, neurological disorders, and general conditioning after illness or prolonged rest.',
      },
      {
        question: 'What types of therapies are used in dog rehabilitation?',
        answer:
          'Our rehabilitation programmes may include hydrotherapy (underwater treadmill and pool), physiotherapy exercises, manual therapy (massage and joint mobilisation), acupuncture, therapeutic laser, electrical stimulation (NMES/TENS), ultrasound therapy, and structured home exercise programmes. Each plan is tailored to your dog\'s specific needs.',
      },
      {
        question: 'How long does dog rehabilitation typically last?',
        answer:
          'Duration varies greatly depending on the condition and your dog\'s individual progress. Post-surgical cases may require 8–16 weeks of active rehabilitation. Chronic conditions like arthritis may benefit from ongoing maintenance sessions. We review progress at each visit and adjust the plan accordingly.',
      },
      {
        question: 'Is dog rehabilitation painful for my pet?',
        answer:
          'Rehabilitation is designed to reduce pain, not cause it. Techniques are applied gently and progressively, always within your dog\'s comfort level. Many dogs actually enjoy their sessions — especially hydrotherapy! We closely monitor for any signs of discomfort and will modify treatment immediately if needed.',
      },
      {
        question: 'Can I be involved in my dog\'s rehabilitation process?',
        answer:
          'We strongly encourage your involvement. Understanding your dog\'s condition and learning home exercises is a vital part of the recovery process. We will teach you specific exercises and techniques to continue between clinic visits, making you an active partner in your dog\'s rehabilitation.',
      },
      {
        question: 'Are there specific breeds that benefit more from rehabilitation?',
        answer:
          'All dogs can benefit from rehabilitation, but some breeds are predisposed to conditions that frequently require it. Dachshunds and French Bulldogs (IVDD), German Shepherds (degenerative myelopathy, hip dysplasia), Labradors and Golden Retrievers (cruciate injuries, hip and elbow dysplasia), and large breeds prone to osteoarthritis are commonly seen at our clinic.',
      },
      {
        question: 'What role does nutrition play in dog rehabilitation?',
        answer:
          'Nutrition plays an important supporting role in recovery. Maintaining a healthy body weight reduces stress on joints, while adequate protein supports muscle building during rehabilitation. We can advise on appropriate dietary strategies to complement your dog\'s rehabilitation programme, and will refer you to a veterinary nutritionist if needed.',
      },
      {
        question: 'How do I choose the right rehabilitation centre for my dog?',
        answer:
          'Look for a centre staffed by qualified professionals — ideally with veterinary oversight and certified rehabilitation therapists. RehabVet is led by Dr Sara Lam, who holds recognised certifications including CCRT and CVA, ensuring your pet receives the highest standard of evidence-based care. We also maintain a full range of specialised equipment, which allows us to offer the most comprehensive treatment available in Singapore.',
      },
    ],
  },
  {
    category: 'Hydrotherapy',
    items: [
      {
        question: 'What is hydrotherapy for dogs?',
        answer:
          'Hydrotherapy for dogs uses warm water to facilitate therapeutic exercise. The buoyancy of water reduces the effective weight your dog bears through their joints, allowing movement and muscle building with significantly less pain and impact than land-based exercise. RehabVet offers underwater treadmill therapy and aquatic pool sessions.',
      },
      {
        question: 'How does hydrotherapy benefit dogs?',
        answer:
          'Hydrotherapy helps strengthen muscles, improve joint range of motion, promote cardiovascular fitness, reduce swelling and pain, and accelerate recovery from surgery or injury. The warmth of the water also relaxes muscles and increases circulation, which is particularly beneficial for dogs with arthritis or stiffness.',
      },
      {
        question: 'Is hydrotherapy safe for all dogs?',
        answer:
          'Hydrotherapy is generally very safe, but it is not suitable for all dogs in all circumstances. Dogs with open wounds, certain skin infections, uncontrolled cardiac or respiratory conditions, or who are acutely unwell may not be appropriate candidates. We conduct a thorough assessment before starting any hydrotherapy programme to ensure it is safe and suitable for your dog.',
      },
      {
        question: 'How long is a typical hydrotherapy session?',
        answer:
          'A typical hydrotherapy session lasts 20–45 minutes depending on your dog\'s fitness level, condition, and tolerance. Initial sessions are shorter to allow your dog to acclimatise to the water. Our therapists gradually increase duration and intensity as your dog\'s fitness improves.',
      },
      {
        question: 'How often should my dog have hydrotherapy?',
        answer:
          'Frequency depends on your dog\'s condition and treatment goals. Post-surgical dogs may benefit from sessions two to three times per week initially, while dogs being treated for chronic arthritis may do well with weekly maintenance sessions. We will recommend a schedule as part of your dog\'s individualised treatment plan.',
      },
      {
        question: 'Can hydrotherapy help with my dog\'s arthritis?',
        answer:
          'Yes. Hydrotherapy is one of the most effective therapies for dogs with arthritis (osteoarthritis). The warm water reduces joint pain and stiffness, the buoyancy enables movement that would be difficult on land, and the resistance of water gently builds supporting muscle mass. Many arthritic dogs show significant improvement in mobility and comfort after a course of hydrotherapy.',
      },
      {
        question: 'What should I bring to my dog\'s hydrotherapy session?',
        answer:
          'Please bring a towel for drying your dog after the session, any relevant medical records or referral letters on your first visit, and your dog\'s regular harness or collar. We provide all necessary equipment at the clinic. We recommend bringing treats to help reward and motivate your dog during sessions.',
      },
      {
        question: 'How do I know if my dog needs hydrotherapy?',
        answer:
          'Signs that your dog might benefit from hydrotherapy include reluctance to exercise, limping or favouring a limb, difficulty rising or lying down, post-surgical recovery needs, reduced muscle mass (especially in the hindquarters), diagnosed orthopaedic or neurological conditions, or a recommendation from your regular vet. If in doubt, contact us for a consultation.',
      },
    ],
  },
  {
    category: 'Physiotherapy',
    items: [
      {
        question: 'What is dog physiotherapy?',
        answer:
          'Dog physiotherapy (canine physiotherapy) applies physical therapy techniques to improve a dog\'s movement, reduce pain, and restore function. It includes therapeutic exercises, manual therapy such as massage and joint mobilisation, electrotherapy, and home exercise programmes. It is closely aligned with human physiotherapy but adapted specifically for the canine anatomy and behaviour.',
      },
      {
        question: 'How does dog physiotherapy differ from regular veterinary care?',
        answer:
          'Regular veterinary care focuses on diagnosis and medical or surgical treatment of disease and injury. Physiotherapy focuses on physical recovery and rehabilitation following those events. It is a complementary discipline that works alongside your primary vet to optimise physical outcomes. At RehabVet, our team includes a veterinarian who oversees all rehabilitation care.',
      },
      {
        question: 'When should I consider physiotherapy for my dog?',
        answer:
          'Physiotherapy is beneficial after orthopaedic or neurological surgery, for managing chronic conditions like arthritis or hip dysplasia, following injury or prolonged illness, for improving athletic performance, or simply for maintaining fitness and mobility in senior dogs. If your vet has noted muscle wasting, reduced range of motion, or gait abnormalities, physiotherapy can help.',
      },
      {
        question: 'What techniques are used in dog physiotherapy?',
        answer:
          'Physiotherapy techniques include therapeutic exercise programmes, massage and soft tissue therapy, passive and active joint mobilisation, balance and proprioception training, neuromuscular electrical stimulation (NMES), transcutaneous electrical nerve stimulation (TENS), therapeutic ultrasound, therapeutic laser therapy, and hydrotherapy.',
      },
      {
        question: 'Is dog physiotherapy safe?',
        answer:
          'Yes. Physiotherapy is a very safe modality when performed by qualified professionals. Our team conducts a thorough assessment before commencing any treatment and continuously monitors your dog\'s response. Techniques are always adapted to your dog\'s comfort level, and we work closely with your primary vet to ensure physiotherapy is appropriate for your dog\'s specific condition.',
      },
      {
        question: 'How long does a typical physiotherapy session last?',
        answer:
          'A typical physiotherapy session lasts 45–60 minutes. The initial consultation is longer (60–90 minutes) as it includes a comprehensive physical assessment, review of medical history, and development of a treatment plan. Subsequent sessions focus on treatment and progress assessment.',
      },
      {
        question: 'How often should my dog have physiotherapy sessions?',
        answer:
          'Frequency depends on your dog\'s condition and stage of recovery. Acute post-surgical cases often benefit from more frequent sessions (two to three times per week) initially, tapering as recovery progresses. Chronic conditions may be managed with weekly sessions. We develop a personalised schedule for each patient.',
      },
      {
        question: 'Can physiotherapy help with my dog\'s chronic pain?',
        answer:
          'Yes. Physiotherapy is a cornerstone of chronic pain management in dogs. Through targeted exercise, manual therapy, and modalities like laser therapy and TENS, we can significantly reduce pain and improve function in dogs with conditions like osteoarthritis, spondylosis, and degenerative joint disease — often reducing or eliminating the need for long-term pain medication.',
      },
      {
        question: 'What should I expect during the first physiotherapy visit?',
        answer:
          'Your first visit will include a detailed discussion of your dog\'s history, symptoms, and previous treatments. Our therapist will perform a comprehensive physical assessment including observation of movement and posture, palpation of muscles and joints, and neurological evaluation where appropriate. We will then explain our findings and propose a personalised treatment plan.',
      },
      {
        question: 'Can I do physiotherapy exercises with my dog at home?',
        answer:
          'Absolutely — and we encourage it! Home exercises are a critical component of most rehabilitation programmes. We will demonstrate specific exercises tailored to your dog\'s condition and create a home programme you can follow between clinic visits. Consistency at home significantly accelerates recovery and improves outcomes.',
      },
    ],
  },
  {
    category: 'Acupuncture',
    items: [
      {
        question: 'What is acupuncture for dogs?',
        answer:
          'Veterinary acupuncture involves inserting fine, sterile needles at specific points on the body to stimulate healing and relieve pain. It is based on both traditional Chinese veterinary medicine principles and modern neuroanatomical understanding of acupuncture points. At RehabVet, acupuncture is performed by Dr Sara Lam, a Certified Veterinary Acupuncturist (CVA).',
      },
      {
        question: 'How does acupuncture work for dogs?',
        answer:
          'Acupuncture stimulates nerve fibres, which triggers the release of endorphins and other neurotransmitters that modulate pain and inflammation. It also promotes local blood flow, which supports tissue healing. Modern research has demonstrated measurable physiological effects of acupuncture, making it an evidence-supported adjunct therapy for pain management and rehabilitation.',
      },
      {
        question: 'Is acupuncture safe for dogs?',
        answer:
          'Yes. Veterinary acupuncture is very safe when performed by a qualified practitioner. The needles used are extremely fine and most dogs tolerate the procedure well, often becoming relaxed during treatment. Our acupuncturist, Dr Sara Lam, holds recognised certification (CVA) and has extensive clinical experience.',
      },
      {
        question: 'What conditions can be treated with acupuncture in dogs?',
        answer:
          'Acupuncture is used to manage pain associated with osteoarthritis, intervertebral disc disease (IVDD), hip dysplasia, post-surgical recovery, musculoskeletal injuries, and neurological conditions. It can also help with nausea, gastrointestinal issues, and general wellbeing. We often use it as part of a multimodal treatment approach.',
      },
      {
        question: 'How long does an acupuncture session last?',
        answer:
          'A typical acupuncture session lasts 30–45 minutes. The needles are generally left in place for 15–20 minutes, and most dogs rest comfortably — many fall asleep during treatment. The initial session includes an assessment and is slightly longer.',
      },
      {
        question: 'How often should my dog receive acupuncture?',
        answer:
          'For acute conditions, sessions are often scheduled weekly. For chronic conditions like arthritis, an initial course of weekly sessions followed by monthly maintenance is common. The ideal frequency depends on your dog\'s specific condition and response to treatment, and we will tailor the schedule accordingly.',
      },
      {
        question: 'What should I expect during my dog\'s first acupuncture session?',
        answer:
          'Dr Sara will take a thorough history and perform a physical and traditional Chinese medicine examination. She will then place fine needles at selected acupuncture points. Most dogs relax as the needles are placed and many become drowsy. After the session, your dog may be more tired than usual — this is normal and typically a sign the treatment is working.',
      },
      {
        question: 'Are there any side effects of acupuncture?',
        answer:
          'Side effects are rare and generally mild. Some dogs experience temporary tiredness or mild soreness at needle sites after their first few sessions. Serious adverse effects are extremely uncommon when treatment is performed by a qualified veterinary acupuncturist. We monitor all patients carefully and will discuss any concerns with you.',
      },
      {
        question: 'Can acupuncture be combined with other treatments?',
        answer:
          'Yes — in fact, acupuncture often works best as part of a multimodal approach. At RehabVet, we frequently combine acupuncture with physiotherapy, hydrotherapy, and laser therapy for enhanced outcomes. This integrated approach allows us to address pain, inflammation, and functional deficits simultaneously.',
      },
      {
        question: 'How do I find a qualified acupuncturist for my dog?',
        answer:
          'Always ensure your pet\'s acupuncture is performed by a licensed veterinarian with recognised acupuncture certification. At RehabVet, Dr Sara Lam holds the CVA (Certified Veterinary Acupuncturist) credential and the CVMMP certification in veterinary musculoskeletal manipulation. Contact us to find out if acupuncture is appropriate for your pet.',
      },
    ],
  },
  {
    category: 'Post-Surgery',
    items: [
      {
        question: 'What is post-surgery rehabilitation for dogs?',
        answer:
          'Post-surgery rehabilitation is a structured programme of physical therapy designed to optimise recovery after orthopaedic or neurological surgery. It helps restore muscle mass, joint mobility, and normal movement patterns, while managing pain and preventing complications such as scar tissue formation and muscle atrophy.',
      },
      {
        question: 'Why is post-surgery rehabilitation important?',
        answer:
          'Surgery corrects the structural problem, but rehabilitation is what restores full function. Without it, dogs may compensate with abnormal movement patterns, lose muscle mass, develop scar tissue that limits mobility, or suffer chronic pain. Evidence shows that dogs who undergo structured rehabilitation after orthopaedic surgery recover faster and achieve better long-term outcomes than those who rest alone.',
      },
      {
        question: 'When should post-surgery rehabilitation begin?',
        answer:
          'Ideally, rehabilitation begins within the first few days after surgery, starting with gentle passive range of motion exercises and gradually progressing. We work closely with your surgeon to align the rehabilitation programme with your dog\'s post-operative restrictions. Early intervention significantly improves outcomes.',
      },
      {
        question: 'What types of surgeries require rehabilitation?',
        answer:
          'Common surgeries that benefit from post-operative rehabilitation include TPLO and TTA (cruciate ligament repair), tibial plateau levelling procedures, fracture repairs, femoral head and neck ostectomy (FHO), total hip replacement, spinal surgeries for IVDD, and surgeries for joint conditions like OCD. We can assess any post-surgical patient on a case-by-case basis.',
      },
      {
        question: 'What does a typical post-surgery rehabilitation plan include?',
        answer:
          'A typical plan includes initial passive range of motion exercises, progressive weight-bearing exercises, hydrotherapy (once surgical wounds have healed), therapeutic modalities such as laser therapy and electrical stimulation to manage pain and promote healing, balance and proprioception training, and a structured home exercise programme. The plan evolves as your dog\'s recovery progresses.',
      },
      {
        question: 'How long does post-surgery rehabilitation last?',
        answer:
          'Most post-surgical rehabilitation programmes run for 8–16 weeks, though this varies depending on the type of surgery, your dog\'s age and health, and their individual progress. We assess outcomes regularly and discharge patients when functional goals are met, providing guidance on maintaining fitness long-term.',
      },
      {
        question: 'Is post-surgery rehabilitation painful for my dog?',
        answer:
          'No. Our rehabilitation protocols are designed to manage pain, not cause it. We work within your dog\'s comfort limits at all times, and we use pain-relieving modalities such as laser therapy, massage, and acupuncture alongside exercise to keep your dog comfortable throughout recovery.',
      },
      {
        question: 'Can I do rehabilitation exercises at home?',
        answer:
          'Yes, and we strongly encourage it. Home exercises form a critical part of the rehabilitation programme. We will demonstrate all exercises clearly and provide written instructions and, where helpful, video resources. Consistent home care between clinic visits significantly accelerates recovery.',
      },
      {
        question: 'How do I know if my dog is making progress?',
        answer:
          'We use objective outcome measures at each visit, including range of motion measurements, muscle circumference measurements, and gait assessment to track progress. You will also notice improvements such as increased weight-bearing, willingness to exercise, improved energy, and reduction in signs of pain. We communicate progress clearly at every session.',
      },
      {
        question: 'What should I watch for during my dog\'s recovery?',
        answer:
          'Watch for signs of infection at the surgical site (swelling, discharge, redness, odour), sudden changes in weight-bearing or mobility, excessive licking at the wound, signs of pain (vocalisation, reluctance to move, changes in behaviour), or general signs of illness such as lethargy or reduced appetite. Contact your surgeon or our team immediately if you notice any of these.',
      },
    ],
  },
  {
    category: 'Pricing & Insurance',
    items: [
      {
        question: 'What is the cost of veterinary rehabilitation?',
        answer:
          'The cost of rehabilitation depends on the type of treatment, number of sessions, and modalities involved. We provide transparent pricing and will give you a detailed cost estimate following your initial consultation. Please contact us directly for our current fee schedule.',
      },
      {
        question: 'Does pet insurance cover veterinary rehabilitation?',
        answer:
          'Many pet insurance policies in Singapore cover veterinary rehabilitation when it is deemed medically necessary by a veterinarian. Coverage varies widely between insurers and policies, so we recommend reviewing your policy details or contacting your insurer to confirm what is included. We provide detailed invoices and clinical notes to support insurance claims.',
      },
      {
        question: 'Are there any package deals or discounts available?',
        answer:
          'We offer treatment packages for certain programmes, which can offer better value than individual sessions. Please ask our team about available packages during your consultation. We aim to ensure that rehabilitation is as accessible as possible for all pets and their owners.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept major credit and debit cards, PayNow, and cash. Please contact us if you have questions about payment prior to your appointment.',
      },
      {
        question: 'Is a consultation fee required before starting treatment?',
        answer:
          'Yes. An initial consultation is required before commencing any rehabilitation programme. This allows our team to thoroughly assess your pet, review their medical history, and develop an appropriate treatment plan. The consultation fee is charged separately from treatment session fees.',
      },
      {
        question: 'Can I get a cost estimate before starting treatment?',
        answer:
          'Yes. Following your initial consultation, we will provide you with a treatment plan and associated cost estimate. We are committed to transparent pricing and will ensure you understand the expected costs before treatment begins.',
      },
      {
        question: 'What happens if I need to cancel or reschedule an appointment?',
        answer:
          'We appreciate advance notice of cancellations or rescheduling where possible, ideally at least 24 hours before your appointment. This allows us to offer the slot to other patients. Please contact us as soon as possible if your plans change.',
      },
      {
        question: 'Are there any additional costs I should be aware of?',
        answer:
          'Our fees cover the therapy sessions themselves. If additional diagnostic tests or medications are required, these would be charged separately. We will always discuss any additional costs with you before they are incurred.',
      },
      {
        question: 'Do you offer any financial assistance for pet owners?',
        answer:
          'We understand that rehabilitation can represent a significant financial commitment. Please speak with our team to discuss your situation — we aim to work with pet owners wherever we can to ensure pets have access to the care they need.',
      },
      {
        question: 'How can I maximise my pet insurance benefits for rehabilitation?',
        answer:
          'To maximise your insurance benefits, ensure your insurance is active before starting treatment, obtain a referral or written recommendation from your primary vet if required by your policy, keep all invoices and clinical records, and notify your insurer promptly. Our team is happy to provide documentation to support your claims.',
      },
    ],
  },
]

export default function FaqPage() {
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
          {FAQ_DATA.map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
                {category}
              </h2>
              <div className="space-y-4">
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
          ))}
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
