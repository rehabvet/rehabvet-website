import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { PayloadImage } from '@/components/PayloadImage'
import { RichText } from '@/components/RichText'
import type { Service, Media } from '@/payload-types'
import PagesHeader from '@/components/shared/pages-header'
import SectionHeader from '@/components/shared/section-header'
import Button from '@/components/shared/primary-button'
import type { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

/* ---------- Static fallback data matching WP ---------- */
const STATIC_SERVICES: Record<string, { title: string; excerpt: string; body: ReactNode }> = {
  'veterinary-rehabilitation-consultation': {
    title: 'Veterinary Rehabilitation Consultation',
    excerpt: 'Get your pet back on their feet with RehabVet\'s veterinary rehabilitation consultation. Let us help your pet live a healthier, happier life.',
    body: (
      <>
        <div data-aos="fade-up">
          <p className="text-lg leading-relaxed mb-6">A Veterinary Rehabilitation Consultation is a comprehensive assessment of your pet&apos;s condition by our experienced rehabilitation veterinarian. During the consultation, we will review your pet&apos;s medical history, perform a thorough physical and neurological examination, and develop a personalised rehabilitation plan.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What Happens During Your Consultation</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li><strong>Evaluation:</strong> The rehabilitation veterinarian at RehabVet will evaluate your pet&apos;s medical history, current condition, and any diagnostic tests that have been performed. They will also perform a physical examination to assess your pet&apos;s range of motion, strength, flexibility, and balance.</li>
            <li><strong>Treatment plan:</strong> Based on their evaluation, the veterinarian will develop a customised treatment plan for your pet. This may include exercises, stretches, massage, <Link href="/services/dog-hydrotherapy" className="text-primary hover:underline">hydrotherapy</Link>, laser therapy, and other modalities to improve their mobility and speed up their recovery.</li>
            <li><strong>Education:</strong> The veterinarian will educate you on your pet&apos;s condition and the treatment plan. They may also provide you with exercises to perform at home to complement the in-clinic sessions.</li>
            <li><strong>Follow-up:</strong> You will be scheduled for follow-up appointments to monitor your pet&apos;s progress and adjust the treatment plan as necessary. The veterinarian will also provide you with updates on your pet&apos;s progress and any changes in their condition.</li>
            <li><strong>Support:</strong> The rehabilitation specialist will be available to answer any questions or concerns you may have throughout the rehabilitation process. They will work closely with your veterinarian to ensure your pet receives the best possible care and attention.</li>
          </ol>
        </div>

        <div className="mt-10 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold">Ready to Book a Consultation?</h3>
          <p className="mt-2">Contact us on WhatsApp to schedule your pet&apos;s rehabilitation consultation.</p>
          <div className="mt-4">
            <a href="https://wa.me/6587987554" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition">WhatsApp Us</a>
          </div>
        </div>
      </>
    ),
  },
  'animal-rehabilitation': {
    title: 'Animal Rehabilitation',
    excerpt: 'Restore your pet\'s mobility with expert animal rehabilitation at RehabVet Singapore. Physiotherapy, hydrotherapy & more.',
    body: (
      <>
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What Is Animal Rehabilitation?</h2>
          <p className="text-sm font-medium text-primary mb-3">Also known as veterinary rehabilitation, pet physical therapy, or animal physiotherapy</p>
          <p className="text-gray-700 mb-4">Animal rehabilitation is the use of evidence-based physical therapies to restore movement, reduce pain, and improve function in dogs, cats, and other companion animals. It is the veterinary equivalent of human physical therapy and physiotherapy — applying the same scientific principles, adapted for four-legged patients.</p>
          <p className="text-gray-700 mb-4">At RehabVet, animal rehabilitation encompasses a comprehensive range of modalities: <Link href="/services/dog-hydrotherapy" className="text-primary hover:underline">hydrotherapy</Link> (underwater treadmill), <Link href="/services/dog-physiotherapy" className="text-primary hover:underline">physiotherapy</Link> (manual therapy and therapeutic exercises), <Link href="/services/dog-acupuncture" className="text-primary hover:underline">acupuncture</Link>, Class 4 laser therapy, electrotherapy (TENS &amp; NMES), therapeutic ultrasound, shockwave therapy, and <Link href="/services/hbot-hyperbaric-oxygen-therapy-animals" className="text-primary hover:underline">hyperbaric oxygen therapy</Link>.</p>
          <p className="text-gray-700 mb-4">Unlike human medicine, where rehabilitation after surgery or injury is standard practice, veterinary rehabilitation is still a relatively young field in Singapore. RehabVet was established as Singapore&apos;s first dedicated animal rehabilitation clinic — and remains the most comprehensive facility of its kind, with purpose-built equipment, qualified rehabilitation therapists, and full veterinary oversight for every session.</p>
          <p className="text-gray-700 mb-4">The effectiveness of veterinary rehabilitation is well-supported by clinical research. Studies published in the <em>Veterinary Surgery</em> journal and the <em>Journal of Small Animal Practice</em> demonstrate that pets receiving structured rehabilitation programmes after orthopaedic surgery recover faster, develop better muscle mass, achieve greater joint range of motion, and return to normal activity sooner compared to rest alone.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Our Rehabilitation Services</h2>
          <p className="text-sm font-medium text-primary mb-3">A comprehensive toolkit — not just one treatment</p>
          <p className="text-gray-700 mb-4">Effective animal rehabilitation requires a multimodal approach. At RehabVet, we combine multiple evidence-based therapies into a personalised programme tailored to your pet&apos;s condition.</p>
          <p className="text-gray-700 mb-4">Additional modalities available: therapeutic ultrasound, shockwave therapy (ESWT), <Link href="/services/traditional-chinese-veterinary-medicine" className="text-primary hover:underline">TCVM</Link> Tui-Na, thermotherapy &amp; cryotherapy, and proprioception exercises.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Why Choose RehabVet for Animal Rehabilitation?</h2>
          <p className="text-sm font-medium text-primary mb-3">Singapore&apos;s most comprehensive veterinary rehabilitation facility</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">10 Benefits of Animal Rehabilitation</h2>
          <p className="text-sm font-medium text-primary mb-3">Evidence-based outcomes for surgery recovery, chronic pain, arthritis, and neurological conditions</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Conditions We Treat with Animal Rehabilitation</h2>
          <p className="text-gray-700 mb-4">From post-surgical recovery to age-related mobility decline — our rehabilitation programmes address the full spectrum of musculoskeletal, neurological, and chronic conditions in dogs and cats.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">How Animal Rehabilitation Works at RehabVet</h2>
          <p className="text-sm font-medium text-primary mb-3">A structured, 5-step process from assessment to recovery</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What to Expect at Your Pet&apos;s First Rehabilitation Session</h2>
          <p className="text-sm font-medium text-primary mb-3">First time at an animal rehabilitation clinic? Here&apos;s what happens</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Animal Rehabilitation Pricing in Singapore</h2>
          <p className="text-sm font-medium text-primary mb-3">Transparent pricing — no hidden fees</p>
          <p className="text-gray-700 mb-4">Rehabilitation pricing at RehabVet depends on the modalities required and your pet&apos;s treatment plan. All costs are discussed transparently at your initial consultation.</p>
          <p className="text-gray-700 mb-4">Many pet insurance policies in Singapore now cover rehabilitation therapies. We recommend checking with your insurer before your first appointment. We provide itemised invoices for insurance claims.</p>
          <p className="text-gray-700 mb-4">Pricing varies based on session duration and additional modalities (laser therapy, shockwave, <Link href="/services/dog-acupuncture" className="text-primary hover:underline">acupuncture</Link>, <Link href="/services/hbot-hyperbaric-oxygen-therapy-animals" className="text-primary hover:underline">HBOT</Link>). Your veterinary team will discuss all costs before beginning treatment.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Meet Your Rehabilitation Team</h2>
          <p className="text-gray-700 mb-4">Qualified rehabilitation specialists — dedicated to getting your pet moving again. Led by <strong>Dr. Sara Lam BVSc</strong>.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Rehabilitation Success Stories</h2>
          <p className="text-gray-700 mb-4">195 verified Google reviews</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions About Animal Rehabilitation</h2>
          <p className="text-gray-700 mb-4">Everything pet owners ask before their first rehabilitation session</p>
        </div>

        <div className="mt-10 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold">Ready to Start Rehabilitation?</h3>
          <p className="mt-2">Contact us on WhatsApp to book your pet&apos;s first session.</p>
          <div className="mt-4">
            <a href="https://wa.me/6587987554" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition">WhatsApp Us</a>
          </div>
        </div>
      </>
    ),
  },
  'dog-physiotherapy': {
    title: 'Dog Physiotherapy',
    excerpt: 'RehabVet provides physiotherapy for dogs to help them recover from injury and improve their mobility.',
    body: (
      <>
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Why Choose RehabVet for Dog Physiotherapy in Singapore</h2>
          <p className="text-sm font-medium text-primary mb-3">Singapore&apos;s first dedicated animal rehabilitation clinic</p>
          <p className="text-gray-700 mb-4">As Singapore&apos;s leading provider of physiotherapy for dogs, RehabVet combines veterinary expertise with a comprehensive range of evidence-based rehabilitation techniques. Dog physiotherapy is one of the most effective ways to restore movement, reduce pain, and accelerate recovery — whether your dog is post-surgical, managing arthritis, or recovering from a neurological condition.</p>
          <p className="text-gray-700 mb-4">At RehabVet, our qualified veterinary physiotherapist employs manual therapy, therapeutic exercises, laser therapy, electrotherapy, and other modalities in a purpose-built clinical environment. Every session is supervised by our veterinary team and supported by regular progress measurements, so you always know how your dog is progressing.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What Is Dog Physiotherapy?</h2>
          <p className="text-sm font-medium text-primary mb-3">Also known as canine physiotherapy or veterinary physical therapy</p>
          <p className="text-gray-700 mb-4">Dog physiotherapy — also known as canine physiotherapy or veterinary physical therapy — is a specialised branch of veterinary rehabilitation that uses evidence-based physical techniques to restore movement, reduce pain, and improve function. At RehabVet, our physiotherapy programmes draw on six core modalities:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li><strong>Manual therapy:</strong> joint mobilisation, soft tissue massage, myofascial release, and targeted stretching</li>
            <li><strong>Therapeutic exercises:</strong> balance, proprioception, strengthening, and gait retraining using specialist equipment</li>
            <li><strong>Class 4 laser therapy:</strong> deep tissue photobiomodulation for pain relief and accelerated healing</li>
            <li><strong>Electrotherapy (TENS &amp; NMES):</strong> nerve stimulation for pain management and muscle activation</li>
            <li><strong>Therapeutic ultrasound:</strong> deep tissue heating for chronic conditions and scar tissue</li>
            <li><strong>Shockwave therapy (ESWT):</strong> acoustic wave therapy for tendon/ligament injuries and chronic pain</li>
          </ul>
          <p className="text-gray-700 mb-4">Just as human physiotherapy helps people recover from operations and manage musculoskeletal conditions, canine physiotherapy applies the same scientific principles — adapted specifically for our four-legged patients. The effectiveness of veterinary physiotherapy is well-supported by clinical research, with studies demonstrating faster recovery, better muscle development, and improved functional outcomes.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">How Physiotherapy Sessions Are Conducted at RehabVet</h2>
          <p className="text-gray-700 mb-4">Each session follows a structured clinical protocol tailored to your dog&apos;s condition and progress.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Top 10 Benefits of Physiotherapy for Dogs</h2>
          <p className="text-sm font-medium text-primary mb-3">Evidence-based outcomes across surgery recovery, arthritis, and chronic conditions</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Conditions Treated with Dog Physiotherapy</h2>
          <p className="text-gray-700 mb-4">Our physiotherapy for dogs in Singapore addresses a wide range of conditions, from post-surgical recovery to age-related mobility decline.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What to Expect During Your Dog&apos;s Physiotherapy Session</h2>
          <p className="text-sm font-medium text-primary mb-3">First time at a veterinary physiotherapy clinic? Here&apos;s what happens</p>
          <p className="text-gray-700 mb-4">If this is your first experience with canine physiotherapy, rest assured that our team will guide you through every step.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Dog Physiotherapy Pricing in Singapore</h2>
          <p className="text-sm font-medium text-primary mb-3">Transparent pricing — no hidden fees</p>
          <p className="text-gray-700 mb-4">Physiotherapy session pricing at RehabVet depends on your dog&apos;s condition, the modalities required, and your treatment plan. All pricing is discussed transparently at your initial assessment.</p>
          <p className="text-gray-700 mb-4">Many pet insurance policies in Singapore now cover rehabilitation therapies including physiotherapy.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Our Physiotherapy Modalities</h2>
          <p className="text-sm font-medium text-primary mb-3">A comprehensive toolkit — not just one technique</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Modality</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">What It Does</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Manual Therapy</td>
                  <td className="border border-gray-200 px-4 py-3">Joint mobilisation, soft tissue massage, myofascial release, and targeted stretching performed by hand</td>
                  <td className="border border-gray-200 px-4 py-3">Pain relief, joint stiffness, post-surgical recovery, muscle tension</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Therapeutic Exercises</td>
                  <td className="border border-gray-200 px-4 py-3">Balance work, proprioception drills, strengthening exercises, gait retraining using cavaletti, wobble boards, and physio equipment</td>
                  <td className="border border-gray-200 px-4 py-3">Muscle building, neurological rehab, balance, post-surgical recovery</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Class 4 Laser Therapy</td>
                  <td className="border border-gray-200 px-4 py-3">Deep tissue photobiomodulation that stimulates cellular repair, reduces inflammation, and promotes healing at the cellular level</td>
                  <td className="border border-gray-200 px-4 py-3">Pain management, wound healing, arthritis, tendon injuries</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Electrotherapy (TENS &amp; NMES)</td>
                  <td className="border border-gray-200 px-4 py-3">TENS for pain management via nerve stimulation; NMES for muscle activation and strengthening in weakened or atrophied muscles</td>
                  <td className="border border-gray-200 px-4 py-3">Chronic pain, muscle atrophy, neurological conditions</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Therapeutic Ultrasound</td>
                  <td className="border border-gray-200 px-4 py-3">Deep tissue heating using sound waves to increase blood flow, reduce scar tissue, and promote healing in deep structures</td>
                  <td className="border border-gray-200 px-4 py-3">Chronic tendon injuries, scar tissue, deep muscle tension</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Shockwave Therapy (ESWT)</td>
                  <td className="border border-gray-200 px-4 py-3">Focused acoustic waves that stimulate tissue repair and regeneration in chronic or non-healing conditions</td>
                  <td className="border border-gray-200 px-4 py-3">Tendon/ligament injuries, chronic pain, calcification, non-healing fractures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Meet Your Physiotherapy Team</h2>
          <p className="text-gray-700 mb-4">Qualified rehabilitation specialists — not general practice vets. Led by <strong>Dr. Sara Lam BVSc</strong>.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Physiotherapy Success Stories</h2>
          <p className="text-gray-700 mb-4">195 verified Google reviews</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions About Dog Physiotherapy</h2>
        </div>

        <div className="mt-10 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold">Ready to Start Physiotherapy?</h3>
          <p className="mt-2">Contact us on WhatsApp to book your dog&apos;s first session.</p>
          <div className="mt-4">
            <a href="https://wa.me/6587987554" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition">WhatsApp Us</a>
          </div>
        </div>
      </>
    ),
  },
  'dog-hydrotherapy': {
    title: 'Hydrotherapy for Dogs',
    excerpt: 'RehabVet offers hydrotherapy treatment for dogs to help them recover from injury or surgery.',
    body: (
      <>
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Why Choose RehabVet for Dog Hydrotherapy in Singapore</h2>
          <p className="text-sm font-medium text-primary mb-3">Singapore&apos;s first dedicated animal rehabilitation clinic</p>
          <p className="text-gray-700 mb-4">As Singapore&apos;s leading provider of hydrotherapy for dogs, RehabVet combines veterinary expertise with state-of-the-art underwater treadmill technology to deliver measurable rehabilitation outcomes.</p>
          <p className="text-gray-700 mb-4">At RehabVet, we provide expert hydrotherapy for dogs in Singapore, harnessing the unique therapeutic properties of water — buoyancy, resistance, and warmth — in a purpose-built clinical environment.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What Is Hydrotherapy for Dogs?</h2>
          <p className="text-sm font-medium text-primary mb-3">Also known as dog water therapy or aquatic rehabilitation</p>
          <p className="text-gray-700 mb-4">Hydrotherapy for dogs — also known as dog water therapy or canine aquatic rehabilitation — is a clinically proven therapeutic modality that uses the unique properties of water to support physical recovery and rehabilitation. The three key properties that make water therapeutic are:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li><strong>Buoyancy:</strong> reduces effective body weight by 60–90%, allowing movement without joint stress</li>
            <li><strong>Resistance:</strong> water provides 12–14× more resistance than air, building muscle effectively at low speeds</li>
            <li><strong>Warmth:</strong> warm water (28–32°C) relaxes muscles, reduces stiffness, and increases circulation</li>
          </ul>
          <p className="text-gray-700 mb-4">At RehabVet, we operate both an underwater treadmill — which promotes weight-bearing walking and gait retraining — and a saltwater hydrotherapy pool for swimming-based therapy.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">How Hydrotherapy Sessions Are Conducted at RehabVet</h2>
          <p className="text-gray-700 mb-4">Each session follows a structured clinical protocol tailored to your dog&apos;s condition and progress.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Top 10 Benefits of Hydrotherapy for Dogs</h2>
          <p className="text-sm font-medium text-primary mb-3">Evidence-based outcomes across surgery recovery, arthritis, and chronic conditions</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Conditions Treated with Dog Hydrotherapy</h2>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What to Expect During Your Dog&apos;s Hydrotherapy Session</h2>
          <p className="text-sm font-medium text-primary mb-3">First experience with pet hydrotherapy? Here&apos;s what happens</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Dog Hydrotherapy Pricing in Singapore</h2>
          <p className="text-sm font-medium text-primary mb-3">Transparent pricing — no hidden fees</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Underwater Treadmill vs Swimming Pool Hydrotherapy</h2>
          <p className="text-sm font-medium text-primary mb-3">Why the method matters as much as the water</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Underwater Treadmill (RehabVet)</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Swimming Pool</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Water depth control</td>
                  <td className="border border-gray-200 px-4 py-3">Yes — adjustable to the centimetre</td>
                  <td className="border border-gray-200 px-4 py-3">No — fixed depth</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Speed control</td>
                  <td className="border border-gray-200 px-4 py-3">Yes — variable treadmill speed</td>
                  <td className="border border-gray-200 px-4 py-3">No — depends on the dog</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Suitable for non-swimmers</td>
                  <td className="border border-gray-200 px-4 py-3">Yes</td>
                  <td className="border border-gray-200 px-4 py-3">No</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Weight-bearing exercise</td>
                  <td className="border border-gray-200 px-4 py-3">Yes — promotes natural gait</td>
                  <td className="border border-gray-200 px-4 py-3">Limited — swimming is non-weight-bearing</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Post-surgical rehab</td>
                  <td className="border border-gray-200 px-4 py-3">Excellent — controlled, safe movement</td>
                  <td className="border border-gray-200 px-4 py-3">Risky — hard to control movement</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Gait retraining</td>
                  <td className="border border-gray-200 px-4 py-3">Yes — treadmill encourages normal walking</td>
                  <td className="border border-gray-200 px-4 py-3">No</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Muscle building</td>
                  <td className="border border-gray-200 px-4 py-3">Targeted — resistance + walking gait</td>
                  <td className="border border-gray-200 px-4 py-3">General — swimming uses different muscles</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Best for</td>
                  <td className="border border-gray-200 px-4 py-3">Surgery recovery, arthritis, IVDD, neurological rehab</td>
                  <td className="border border-gray-200 px-4 py-3">General fitness, cardiovascular conditioning</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Meet Your Hydrotherapy Team</h2>
          <p className="text-gray-700 mb-4">Qualified rehabilitation specialists — not general practice vets. Led by <strong>Dr. Sara Lam BVSc</strong>.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Hydrotherapy Success Stories</h2>
          <p className="text-gray-700 mb-4">195 verified Google reviews</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions About Hydrotherapy for Dogs</h2>
        </div>

        <div className="mt-10 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold">Ready to Start Hydrotherapy?</h3>
          <p className="mt-2">Contact us on WhatsApp to book your dog&apos;s first session.</p>
          <div className="mt-4">
            <a href="https://wa.me/6587987554" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition">WhatsApp Us</a>
          </div>
        </div>
      </>
    ),
  },
  'hbot-hyperbaric-oxygen-therapy-animals': {
    title: 'Hyperbaric Oxygen Therapy for Pets',
    excerpt: 'RehabVet offers Hyperbaric Oxygen Treatment for dogs to help them recover from injury or illness.',
    body: (
      <>
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">When Standard Treatment Isn&apos;t Enough</h2>
          <p className="text-gray-700 mb-4">Your dog had surgery weeks ago, but the wound won&apos;t close. The antibiotics aren&apos;t clearing the infection fast enough. Your pet was diagnosed with IVDD and the neurological damage seems to have plateaued. A snake bite left tissue damage that regular treatment can&apos;t reach.</p>
          <p className="text-gray-700 mb-4">The problem isn&apos;t the treatment — it&apos;s the oxygen supply. Damaged, swollen, and infected tissues are oxygen-starved. Red blood cells can&apos;t reach them. Without oxygen, healing stalls, infections persist, and nerve tissue degrades.</p>
          <p className="text-gray-700 mb-4">Hyperbaric oxygen therapy solves this. By dissolving oxygen directly into blood plasma at 10–15× normal levels, HBOT delivers healing oxygen to the exact tissues that need it most — even when blood vessels can&apos;t.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">How Hyperbaric Oxygen Therapy Works</h2>
          <p className="text-sm font-medium text-primary mb-3">The science behind the pressure</p>
          <p className="text-gray-700 mb-4">Under normal conditions, oxygen is carried almost exclusively by red blood cells. But damaged tissues — swollen, bruised, or poorly vascularised — are often unreachable by red blood cells. This creates an oxygen deficit that slows healing, allows infection to thrive, and can lead to tissue death.</p>
          <p className="text-gray-700 mb-4">HBOT changes the equation. By placing your pet in a sealed chamber filled with 100% pure oxygen at 1.5–3.0 atmospheres of pressure (ATA), the laws of physics take over. Henry&apos;s Law dictates that at higher pressure, far more oxygen dissolves directly into the blood plasma — up to 10–15 times normal levels.</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Steel Chamber (RehabVet)</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Soft / Portable Chamber</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Max pressure</td>
                  <td className="border border-gray-200 px-4 py-3">Up to 3.0 ATA</td>
                  <td className="border border-gray-200 px-4 py-3">1.3–1.5 ATA</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Oxygen purity</td>
                  <td className="border border-gray-200 px-4 py-3">100% pure oxygen</td>
                  <td className="border border-gray-200 px-4 py-3">Often concentrated (not 100%)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Evidence-based pressures</td>
                  <td className="border border-gray-200 px-4 py-3">✓ Matches clinical research (1.5–3.0 ATA)</td>
                  <td className="border border-gray-200 px-4 py-3">✗ Below research thresholds</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Construction</td>
                  <td className="border border-gray-200 px-4 py-3">Hospital-grade steel</td>
                  <td className="border border-gray-200 px-4 py-3">Inflatable fabric/PVC</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Safety certification</td>
                  <td className="border border-gray-200 px-4 py-3">✓ HVM veterinary medical device</td>
                  <td className="border border-gray-200 px-4 py-3">Limited evidence at lower pressures</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Clinical efficacy</td>
                  <td className="border border-gray-200 px-4 py-3">✓ Proven at therapeutic pressures</td>
                  <td className="border border-gray-200 px-4 py-3">Limited evidence at lower pressures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What Happens During an HBOT Session</h2>
          <p className="text-sm font-medium text-primary mb-3">From consultation to recovery — here&apos;s what to expect</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Conditions We Treat With HBOT</h2>
          <p className="text-sm font-medium text-primary mb-3">From chronic wounds to neurological emergencies</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">HBOT + Comprehensive Rehabilitation</h2>
          <p className="text-sm font-medium text-primary mb-3">The multimodal advantage — why HBOT works best at a specialist rehab clinic</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">HBOT Cost in Singapore</h2>
          <p className="text-sm font-medium text-primary mb-3">Transparent pricing — medical-grade treatment at fair rates</p>
          <p className="text-gray-700 mb-4">Package rates available for multi-session treatment plans.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Why Choose RehabVet for Hyperbaric Oxygen Treatment?</h2>
          <p className="text-sm font-medium text-primary mb-3">Not all HBOT is created equal</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">How RehabVet HBOT Compares</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">RehabVet</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Other Providers</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Chamber type</td>
                  <td className="border border-gray-200 px-4 py-3">Medical-grade steel (HVM)</td>
                  <td className="border border-gray-200 px-4 py-3">Soft / portable chambers</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Max pressure</td>
                  <td className="border border-gray-200 px-4 py-3">Up to 3.0 ATA</td>
                  <td className="border border-gray-200 px-4 py-3">1.3–1.5 ATA</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Multimodal rehab</td>
                  <td className="border border-gray-200 px-4 py-3">✓ HBOT + <Link href="/services/dog-physiotherapy" className="text-primary hover:underline">physio</Link> + <Link href="/services/dog-hydrotherapy" className="text-primary hover:underline">hydro</Link> + <Link href="/services/dog-acupuncture" className="text-primary hover:underline">acu</Link> + laser</td>
                  <td className="border border-gray-200 px-4 py-3">HBOT only</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Specialist rehab team</td>
                  <td className="border border-gray-200 px-4 py-3">✓ Dedicated rehab staff</td>
                  <td className="border border-gray-200 px-4 py-3">General vet or non-vet</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Google reviews</td>
                  <td className="border border-gray-200 px-4 py-3">195+ (4.9★)</td>
                  <td className="border border-gray-200 px-4 py-3">59–85 reviews</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Media coverage</td>
                  <td className="border border-gray-200 px-4 py-3">✓ ST, CNA, Mothership, TODAY</td>
                  <td className="border border-gray-200 px-4 py-3">Limited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Meet Your HBOT &amp; Rehabilitation Team</h2>
          <p className="text-gray-700 mb-4">Qualified veterinary rehabilitation specialists — led by <strong>Dr. Sara Lam BVSc</strong>.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions About HBOT for Pets</h2>
        </div>

        <div className="mt-10 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold">Ready to Explore HBOT?</h3>
          <p className="mt-2">Contact us on WhatsApp to discuss if HBOT is right for your pet.</p>
          <div className="mt-4">
            <a href="https://wa.me/6587987554" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition">WhatsApp Us</a>
          </div>
        </div>
      </>
    ),
  },
  'traditional-chinese-veterinary-medicine': {
    title: 'Traditional Chinese Veterinary Medicine (TCVM) for Pets',
    excerpt: 'Traditional Chinese Veterinary Medicine blends acupuncture, herbal therapy and holistic care for your pet\'s wellbeing.',
    body: (
      <>
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What Is Traditional Chinese Veterinary Medicine?</h2>
          <p className="text-sm font-medium text-primary mb-3">A 3,000-year-old healing system, refined for modern veterinary practice</p>
          <p className="text-gray-700 mb-4">Traditional Chinese Veterinary Medicine (TCVM) is a comprehensive medical system that has been used to diagnose and treat animals for over three millennia. It encompasses four major branches: <Link href="/services/dog-acupuncture" className="text-primary hover:underline">acupuncture</Link>, Chinese herbal medicine, Tui Na (therapeutic massage), and food therapy (Chinese dietary therapy).</p>
          <p className="text-gray-700 mb-4">At its core, TCVM views the body as an interconnected system where health depends on the balanced flow of Qi (vital energy) through a network of meridians. Disease arises when this balance is disrupted — by injury, environmental factors, emotional stress, or constitutional weakness.</p>
          <p className="text-gray-700 mb-4">Modern veterinary research has validated many of TCVM&apos;s clinical observations. Studies published in <em>Veterinary Surgery</em>, the <em>Journal of Veterinary Internal Medicine</em>, and the <em>American Journal of Traditional Chinese Veterinary Medicine</em> demonstrate that acupuncture produces measurable physiological responses — including endorphin release, modulation of inflammatory pathways, improved blood circulation, and nerve stimulation.</p>
          <p className="text-gray-700 mb-4">At RehabVet, our approach to TCVM is integrative and evidence-based. We don&apos;t view TCVM and Western medicine as competing philosophies — we see them as complementary systems that, together, offer the most comprehensive care possible for your pet.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Why Choose RehabVet for TCVM in Singapore</h2>
          <p className="text-sm font-medium text-primary mb-3">Integrative, evidence-based — not alternative</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Our TCVM Modalities</h2>
          <p className="text-sm font-medium text-primary mb-3">Five treatment approaches, personalised for your pet</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">10 Benefits of TCVM for Dogs and Cats</h2>
          <p className="text-sm font-medium text-primary mb-3">Evidence-based outcomes for chronic pain, neurological conditions, recovery, and holistic wellness</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Conditions We Treat with TCVM</h2>
          <p className="text-gray-700 mb-4">From chronic pain and arthritis to neurological recovery and digestive disorders</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">How TCVM Works at RehabVet</h2>
          <p className="text-sm font-medium text-primary mb-3">A structured, integrative process from assessment to ongoing care</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What to Expect at Your Pet&apos;s First TCVM Session</h2>
          <p className="text-sm font-medium text-primary mb-3">New to TCVM? Here&apos;s what happens</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">TCVM Pricing in Singapore</h2>
          <p className="text-sm font-medium text-primary mb-3">Transparent pricing — no hidden fees</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Acupuncture vs Electroacupuncture</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Dry-Needle Acupuncture</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Electroacupuncture</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Method</td>
                  <td className="border border-gray-200 px-4 py-3">Fine needles inserted at acupuncture points, retained 15–20 minutes</td>
                  <td className="border border-gray-200 px-4 py-3">Needles + mild electrical stimulation via connected wires</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Best for</td>
                  <td className="border border-gray-200 px-4 py-3">Chronic pain, arthritis, anxiety, GI issues, general wellness</td>
                  <td className="border border-gray-200 px-4 py-3">Neurological conditions (IVDD, DM), severe pain, muscle atrophy</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Sensation</td>
                  <td className="border border-gray-200 px-4 py-3">Minimal — most pets relax or sleep</td>
                  <td className="border border-gray-200 px-4 py-3">Mild tingling — still well-tolerated by most pets</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Session length</td>
                  <td className="border border-gray-200 px-4 py-3">20–30 minutes (needle retention)</td>
                  <td className="border border-gray-200 px-4 py-3">20–30 minutes (electrical stimulation)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Evidence</td>
                  <td className="border border-gray-200 px-4 py-3">Extensive — endorphin release, anti-inflammatory effects well-documented</td>
                  <td className="border border-gray-200 px-4 py-3">Strong evidence for nerve regeneration and neuromuscular activation</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Ideal patients</td>
                  <td className="border border-gray-200 px-4 py-3">All species and temperaments</td>
                  <td className="border border-gray-200 px-4 py-3">Paralysis, severe disc disease, post-surgical nerve recovery</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Meet Your TCVM Team</h2>
          <p className="text-gray-700 mb-4">Qualified rehabilitation specialists with TCVM expertise. Led by <strong>Dr. Sara Lam BVSc</strong>.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions About TCVM</h2>
        </div>

        <div className="mt-10 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold">Ready to Explore TCVM?</h3>
          <p className="mt-2">Contact us on WhatsApp to book your pet&apos;s first session.</p>
          <div className="mt-4">
            <a href="https://wa.me/6587987554" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition">WhatsApp Us</a>
          </div>
        </div>
      </>
    ),
  },
  'dog-chiropractic': {
    title: 'Dog Chiropractic in Singapore',
    excerpt: 'RehabVet offers chiropractic treatment for dogs to help improve mobility and reduce pain.',
    body: (
      <>
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What Is Chiropractic Care for Dogs?</h2>
          <p className="text-gray-700 mb-4">Chiropractic care for dogs is a specialised form of manual therapy that focuses on the diagnosis, treatment, and prevention of mechanical disorders of the musculoskeletal system — particularly the spine and joints. A qualified animal chiropractor uses precise, controlled adjustments to restore proper alignment, improve joint mobility, and optimise nervous system function.</p>
          <p className="text-gray-700 mb-4">The science behind veterinary chiropractic is well-established. When spinal vertebrae or other joints become misaligned (a condition known as a subluxation), they can compress nerves, restrict movement, cause pain, and even affect organ function. Chiropractic adjustments correct these subluxations, restoring normal biomechanics and allowing the nervous system to function optimally.</p>
          <p className="text-gray-700 mb-4">At RehabVet in Singapore, our veterinary team integrates chiropractic care into comprehensive rehabilitation programmes. Chiropractic adjustments work synergistically with <Link href="/services/dog-physiotherapy" className="text-primary hover:underline">physiotherapy</Link>, <Link href="/services/dog-acupuncture" className="text-primary hover:underline">acupuncture</Link>, and <Link href="/services/dog-hydrotherapy" className="text-primary hover:underline">hydrotherapy</Link> to deliver superior outcomes for pets with musculoskeletal conditions, neurological issues, and chronic pain.</p>
          <p className="text-gray-700 mb-4">Veterinary chiropractic is suitable for dogs of all breeds, sizes, and ages — from athletic working dogs needing peak performance to senior pets managing age-related stiffness and discomfort. It is gentle, non-invasive, and drug-free, making it an excellent option for pets who may not tolerate medications well or for owners seeking a more holistic approach to their pet&apos;s healthcare.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Benefits of Seeing a Dog Chiropractor</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li><strong>Effective pain relief:</strong> Chiropractic adjustments can provide rapid pain relief by restoring proper joint alignment and relieving nerve compression. Many pet owners report visible improvements in their dog&apos;s comfort and activity levels after just one or two sessions.</li>
            <li><strong>Improved mobility and flexibility:</strong> Restricted joints limit your dog&apos;s range of motion and can alter their gait, leading to compensatory issues elsewhere in the body.</li>
            <li><strong>Enhanced nervous system function:</strong> The spine houses the spinal cord — the superhighway of the nervous system. Spinal misalignments can interfere with nerve signal transmission.</li>
            <li><strong>Faster post-surgical recovery:</strong> Dogs recovering from orthopaedic or spinal surgery often develop compensatory movement patterns that can lead to secondary issues.</li>
            <li><strong>Prevention of future injuries:</strong> Regular chiropractic maintenance can identify and correct minor misalignments before they develop into significant problems.</li>
            <li><strong>Drug-free treatment option:</strong> For pets with sensitivities to medications or owners seeking to minimise pharmaceutical interventions.</li>
          </ol>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Conditions a Dog Chiropractor Can Help With</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Back and neck pain</li>
            <li>Joint problems and arthritis</li>
            <li>Intervertebral disc disease (IVDD)</li>
            <li>Gait abnormalities</li>
            <li>Digestive issues</li>
            <li>Performance and agility issues</li>
            <li>Post-injury rehabilitation</li>
          </ol>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Why Choose RehabVet for Your Dog&apos;s Chiropractic Care in Singapore</h2>
          <p className="text-gray-700 mb-4">At RehabVet, we take a comprehensive, integrative approach to your dog&apos;s chiropractic care. Every chiropractic patient begins with a thorough <Link href="/services/veterinary-rehabilitation-consultation" className="text-primary hover:underline">veterinary rehabilitation consultation</Link> — detailed history, comprehensive physical and neurological examination, gait analysis, and palpation assessment.</p>
          <p className="text-gray-700 mb-4">Our integrative approach means chiropractic care is often combined with other evidence-based modalities for optimal results.</p>
        </div>

        <div className="mt-10 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold">Ready to Book Chiropractic Care?</h3>
          <p className="mt-2">Contact us on WhatsApp to discuss how chiropractic care can help your dog.</p>
          <div className="mt-4">
            <a href="https://wa.me/6587987554" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition">WhatsApp Us</a>
          </div>
        </div>
      </>
    ),
  },
  'dog-acupuncture': {
    title: 'Dog Acupuncture in Singapore',
    excerpt: 'Discover the benefits of acupuncture for pets at RehabVet to explore how this therapy helps dogs and cats find relief and wellness.',
    body: (
      <>
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Your Pet Is in Pain — and You&apos;ve Tried Everything</h2>
          <p className="text-sm font-medium text-primary mb-3">Singapore&apos;s first dedicated veterinary rehabilitation clinic</p>
          <p className="text-gray-700 mb-4">The painkillers help for a few hours, but the stiffness returns. Your dog struggles to get up in the morning, avoids the stairs, or can&apos;t play like they used to. Maybe they&apos;ve been diagnosed with IVDD, arthritis, or hip dysplasia — and surgery isn&apos;t an option, or didn&apos;t solve everything.</p>
          <p className="text-gray-700 mb-4">Long-term medication worries you. The side effects — stomach issues, kidney strain, liver damage — are real risks, especially for older dogs. You want a treatment that addresses the root cause, not just the symptoms.</p>
          <p className="text-gray-700 mb-4">Veterinary acupuncture is that treatment. It&apos;s proven, drug-free, and used by rehabilitation clinics worldwide to manage pain and restore mobility.</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">What Is Veterinary Acupuncture?</h2>
          <p className="text-sm font-medium text-primary mb-3">The science behind the needles</p>
          <p className="text-gray-700 mb-4">Veterinary acupuncture is a therapeutic technique rooted in <Link href="/services/traditional-chinese-veterinary-medicine" className="text-primary hover:underline">Traditional Chinese Veterinary Medicine (TCVM)</Link> that involves inserting fine, sterile needles into specific anatomical points on the body. These acupoints correspond to areas rich in nerve endings, blood vessels, and immune cells.</p>
          <p className="text-gray-700 mb-4">When stimulated, acupuncture triggers a cascade of physiological responses: the release of beta-endorphins (the body&apos;s natural painkillers), increased blood circulation to damaged tissue, reduction of pro-inflammatory cytokines, and modulation of the autonomic nervous system.</p>
          <p className="text-gray-700 mb-4">At RehabVet, we offer four types of veterinary acupuncture: Dry Needle Acupuncture, Electroacupuncture, Aquapuncture (B12 injection at acupoints), and Moxibustion (heat therapy for senior pets).</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">How an Acupuncture Session Works at RehabVet</h2>
          <p className="text-sm font-medium text-primary mb-3">What to expect at your first visit and every session after</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Conditions We Treat With Acupuncture</h2>
          <p className="text-sm font-medium text-primary mb-3">From chronic pain to post-surgery recovery</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Acupuncture vs Other Pain Management Options</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Factor</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Acupuncture</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">NSAIDs / Medication</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Surgery</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Side effects</td>
                  <td className="border border-gray-200 px-4 py-3">Minimal to none</td>
                  <td className="border border-gray-200 px-4 py-3">GI upset, liver/kidney strain</td>
                  <td className="border border-gray-200 px-4 py-3">Anaesthesia risk, long recovery</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Invasiveness</td>
                  <td className="border border-gray-200 px-4 py-3">Non-invasive</td>
                  <td className="border border-gray-200 px-4 py-3">Oral / injectable</td>
                  <td className="border border-gray-200 px-4 py-3">Highly invasive</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Long-term use</td>
                  <td className="border border-gray-200 px-4 py-3">Safe indefinitely</td>
                  <td className="border border-gray-200 px-4 py-3">Risk increases over time</td>
                  <td className="border border-gray-200 px-4 py-3">One-time (usually)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Addresses root cause</td>
                  <td className="border border-gray-200 px-4 py-3">Yes — promotes healing</td>
                  <td className="border border-gray-200 px-4 py-3">No — masks symptoms</td>
                  <td className="border border-gray-200 px-4 py-3">Depends on condition</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Cost per session</td>
                  <td className="border border-gray-200 px-4 py-3">$90–$250</td>
                  <td className="border border-gray-200 px-4 py-3">$30–$80/month</td>
                  <td className="border border-gray-200 px-4 py-3">$3,000–$10,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Dog Acupuncture Pricing in Singapore</h2>
          <p className="text-sm font-medium text-primary mb-3">Transparent pricing — no hidden fees</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Why Choose RehabVet for Dog Acupuncture?</h2>
          <p className="text-sm font-medium text-primary mb-3">Not all veterinary acupuncture is created equal</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">How RehabVet Compares</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">RehabVet</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">General Vet Clinics</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Mobile Acupuncture</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Dedicated rehab facility</td>
                  <td className="border border-gray-200 px-4 py-3">✓ Purpose-built</td>
                  <td className="border border-gray-200 px-4 py-3">✗ General practice</td>
                  <td className="border border-gray-200 px-4 py-3">✗ Home visits</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Multimodal treatment</td>
                  <td className="border border-gray-200 px-4 py-3">✓ Acu + laser + <Link href="/services/dog-hydrotherapy" className="text-primary hover:underline">hydro</Link> + <Link href="/services/dog-physiotherapy" className="text-primary hover:underline">physio</Link></td>
                  <td className="border border-gray-200 px-4 py-3">Limited</td>
                  <td className="border border-gray-200 px-4 py-3">Acupuncture only</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Specialist team</td>
                  <td className="border border-gray-200 px-4 py-3">✓ Full rehab team</td>
                  <td className="border border-gray-200 px-4 py-3">1–2 trained vets</td>
                  <td className="border border-gray-200 px-4 py-3">1 vet</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Google reviews</td>
                  <td className="border border-gray-200 px-4 py-3">195+ (4.9★)</td>
                  <td className="border border-gray-200 px-4 py-3">Varies</td>
                  <td className="border border-gray-200 px-4 py-3">Limited</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Equipment</td>
                  <td className="border border-gray-200 px-4 py-3">✓ Full rehab suite</td>
                  <td className="border border-gray-200 px-4 py-3">Basic</td>
                  <td className="border border-gray-200 px-4 py-3">Portable only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Meet Your Rehabilitation Team</h2>
          <p className="text-gray-700 mb-4">Qualified rehabilitation specialists</p>
        </div>

        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions About Dog Acupuncture</h2>
        </div>

        <div className="mt-10 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold">Ready to Try Acupuncture?</h3>
          <p className="mt-2">Contact us on WhatsApp to book your dog&apos;s first session.</p>
          <div className="mt-4">
            <a href="https://wa.me/6587987554" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition">WhatsApp Us</a>
          </div>
        </div>
      </>
    ),
  },
}

export async function generateStaticParams() {
  const staticSlugs = Object.keys(STATIC_SERVICES).map((slug) => ({ slug }))
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', limit: 100, select: { slug: true } })
    const cmsSlugs = result.docs.map((s) => ({ slug: s.slug }))
    const all = new Map<string, { slug: string }>()
    for (const s of [...staticSlugs, ...cmsSlugs]) all.set(s.slug, s)
    return [...all.values()]
  } catch {
    return staticSlugs
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const staticEntry = STATIC_SERVICES[slug]
  if (staticEntry) {
    return { title: `${staticEntry.title} | RehabVet`, description: staticEntry.excerpt }
  }
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    const service = result.docs[0]
    if (service) {
      return { title: `${service.seo?.metaTitle || service.title} | RehabVet`, description: service.seo?.metaDescription || service.excerpt || '' }
    }
  } catch {}
  return { title: 'Service Not Found' }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  let service: Service | null = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    service = result.docs[0] || null
  } catch {}

  const staticEntry = STATIC_SERVICES[slug]

  if (staticEntry) {
    return (
      <>
        <PagesHeader
          title={staticEntry.title}
          breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: staticEntry.title }]}
        />
        <section>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed mb-6" data-aos="fade-up">{staticEntry.excerpt}</p>
              <div className="prose prose-lg max-w-none">
                {staticEntry.body}
              </div>
              <div className="mt-16 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
                <h3>Interested in {staticEntry.title}?</h3>
                <p className="mt-2">Book a consultation to discuss how we can help your pet.</p>
                <div className="mt-6">
                  <Button text="Book Appointment" href="/contact" as="link" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  if (service) {
    return (
      <>
        <PagesHeader
          title={service.title}
          breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: service.title }]}
        />
        <section>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {service.excerpt && <p className="text-lg leading-relaxed mb-6" data-aos="fade-up">{service.excerpt}</p>}
              <div data-aos="fade-up" data-aos-delay={200}>
                <RichText data={service.description} />
              </div>
              {service.benefits && service.benefits.length > 0 && (
                <div className="mt-12" data-aos="fade-up">
                  <h3>Benefits</h3>
                  <ul className="mt-6 space-y-4">
                    {service.benefits.map((b, i) => (
                      <li key={b.id || i} className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary_shade text-primary">✓</span>
                        <span>{b.benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {service.faq && service.faq.length > 0 && (
                <div className="mt-12" data-aos="fade-up">
                  <h3>Frequently Asked Questions</h3>
                  <div className="mt-6 space-y-3">
                    {service.faq.map((item, i) => (
                      <details key={item.id || i} className="group rounded-xl border border-border_one bg-white">
                        <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-dark">{item.question}</summary>
                        <div className="px-5 pb-5 leading-relaxed border-t border-border_one pt-4">{item.answer}</div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-16 rounded-2xl bg-primary_shade p-8 text-center" data-aos="fade-up">
                <h3>Interested in {service.title}?</h3>
                <p className="mt-2">Book a consultation to discuss how we can help your pet.</p>
                <div className="mt-6">
                  <Button text="Book Appointment" href="/contact" as="link" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  notFound()
}
