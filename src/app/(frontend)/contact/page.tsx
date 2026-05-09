import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import PagesHeader from '@/components/shared/pages-header'
import Button from '@/components/shared/primary-button'
import SectionHeader from '@/components/shared/section-header'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact Us | RehabVet',
  description: 'Get in touch with the RehabVet team to book a consultation or ask about our veterinary rehabilitation services.',
}

export default async function ContactPage() {
  let address = '513 Serangoon Road, #01-01, Singapore 218154'
  let phone = '+65 6291 6881'
  let whatsapp = '+65 8798 7554'
  let email = 'hello@rehabvet.com'
  let hours = ''

  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    if (settings.contactInfo?.address) address = settings.contactInfo.address
    if (settings.contactInfo?.phone) phone = settings.contactInfo.phone
    if (settings.contactInfo?.email) email = settings.contactInfo.email
    if (settings.contactInfo?.hours) hours = settings.contactInfo.hours
    if (settings.contactInfo?.whatsapp) whatsapp = settings.contactInfo.whatsapp
  } catch {}

  return (
    <>
      <PagesHeader
        title="Contact Us"
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Contact' }]}
      />

      {/* ── Main contact section ── */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-border_one p-8 md:p-10 space-y-6" data-aos="fade-right">
              <SectionHeader
                className="text-left"
                subtitle="Send a Message"
                title="Get in Touch"
                subtitleClass="!justify-start"
              />
              <form
                action="https://formsubmit.co/hello@rehabvet.com"
                method="POST"
                className="space-y-5"
              >
                <input type="hidden" name="_subject" value="New enquiry from RehabVet website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://rehabvet-website.vercel.app/contact?success=1" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="d2c_form_label block mb-1.5">Your Name</label>
                    <input
                      id="name" name="name" type="text" required placeholder="John Smith"
                      className="w-full border border-border_one rounded-xl px-4 py-3 text-dark placeholder-text_color/40 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="d2c_form_label block mb-1.5">Email Address</label>
                    <input
                      id="email" name="email" type="email" required placeholder="you@example.com"
                      className="w-full border border-border_one rounded-xl px-4 py-3 text-dark placeholder-text_color/40 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="d2c_form_label block mb-1.5">Phone Number</label>
                  <input
                    id="phone" name="phone" type="tel" placeholder="+65 9123 4567"
                    className="w-full border border-border_one rounded-xl px-4 py-3 text-dark placeholder-text_color/40 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="pet" className="d2c_form_label block mb-1.5">Pet Name &amp; Type</label>
                  <input
                    id="pet" name="pet" type="text" placeholder="e.g. Max (Golden Retriever)"
                    className="w-full border border-border_one rounded-xl px-4 py-3 text-dark placeholder-text_color/40 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="d2c_form_label block mb-1.5">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message" name="message" rows={5} required
                    className="w-full border border-border_one rounded-xl px-4 py-3 text-dark placeholder-text_color/40 focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your pet's condition or what you'd like to discuss..."
                  />
                </div>

                <Button text="Send Message" as="button" type="submit" className="w-full justify-center" />
              </form>
            </div>

            {/* Clinic Info */}
            <div className="space-y-8" data-aos="fade-left">
              <SectionHeader
                className="text-left"
                subtitle="Find Us"
                title="Clinic Information"
                subtitleClass="!justify-start"
              />

              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary_shade text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Address</p>
                    <p className="mt-0.5 text-text_color">{address}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary_shade text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Phone</p>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="mt-0.5 text-primary hover:text-primary-700 transition-colors">{phone}</a>
                  </div>
                </div>

                {whatsapp && (
                  <div className="flex gap-4 items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary_shade text-primary">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-dark">WhatsApp</p>
                      <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="mt-0.5 text-primary hover:text-primary-700 transition-colors">{whatsapp}</a>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary_shade text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Email</p>
                    <a href={`mailto:${email}`} className="mt-0.5 text-primary hover:text-primary-700 transition-colors lowercase">{email}</a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary_shade text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Opening Hours</p>
                    {hours ? (
                      <div className="mt-0.5 text-text_color text-sm whitespace-pre-line">{hours}</div>
                    ) : (
                      <div className="mt-0.5 space-y-0.5 text-text_color text-sm">
                        <p>Mon &ndash; Wed &amp; Fri: 11am &ndash; 8pm</p>
                        <p>Thursday: 9am &ndash; 6pm</p>
                        <p>Weekends: 10am &ndash; 6pm</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-64 w-full rounded-2xl overflow-hidden border border-border_one">
                <iframe
                  title="RehabVet Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=513+Serangoon+Road+Singapore+218154&output=embed"
                />
              </div>

              <div className="rounded-2xl bg-primary_shade border border-border_one p-6">
                <h6 className="!font-bold text-dark">Referral from your vet?</h6>
                <p className="mt-2 text-sm text-text_color">
                  We accept direct referrals from veterinary practices. Please ask your vet to send through a referral letter with your pet&apos;s history.
                </p>
                <Link href="/services" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-700 transition-colors">
                  View our services &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="!bg-primary">
        <div className="container text-center">
          <h2 className="!text-white" data-aos="fade-up">Ready to get started?</h2>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay={200}>
            Your pet&apos;s rehabilitation journey begins with a single conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay={400}>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="inline-flex items-center rounded-full bg-white px-8 py-3 font-semibold text-primary hover:bg-primary_shade transition-colors"
            >
              Call {phone}
            </a>
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-accent px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors"
              >
                WhatsApp Us
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
