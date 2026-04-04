import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact Us',
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
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            If you have any questions regarding our services, products or company, please fill up the enquiry form and we will get back to you shortly.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Send Us Your Enquiry</h2>
              <p className="mt-2 text-gray-600">
                Fill in the form below and we&apos;ll get back to you shortly.
              </p>

              <form action="#" method="POST" className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="+65 XXXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
                    Pet&apos;s name
                  </label>
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="Buddy"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    How can we help? <span className="text-accent-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                    placeholder="Tell us about your pet's condition or what you'd like to discuss..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Clinic Info Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Clinic Information</h2>
                <p className="mt-2 text-gray-600">
                  We are conveniently located and offer flexible appointment times.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="mt-1 text-gray-600">{address}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="mt-1 text-primary-600 hover:text-primary-700">
                      {phone}
                    </a>
                  </div>
                </div>

                {whatsapp && (
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp</p>
                      <a
                        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-primary-600 hover:text-primary-700"
                      >
                        {whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href={`mailto:${email}`} className="mt-1 text-primary-600 hover:text-primary-700">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Opening Hours</p>
                    {hours ? (
                      <div className="mt-1 text-gray-600 text-sm whitespace-pre-line">{hours}</div>
                    ) : (
                      <div className="mt-1 space-y-1 text-gray-600 text-sm">
                        <p>Mon &ndash; Wed &amp; Fri: 11am &ndash; 8pm</p>
                        <p>Thursday: 9am &ndash; 6pm</p>
                        <p>Weekends: 10am &ndash; 6pm</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Google Maps Placeholder */}
              <div className="h-64 w-full rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
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

              <div className="rounded-2xl bg-primary-50 p-6">
                <h3 className="font-bold text-gray-900">Referral from your vet?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We accept direct referrals from veterinary practices. Please ask your vet to send
                  through a referral letter with your pet&apos;s history.
                </p>
                <Link
                  href="/services"
                  className="mt-3 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View our services &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-500 to-primary-700 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-4 text-lg text-primary-100">
            Your pet&apos;s rehabilitation journey begins with a single conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
            >
              Call {phone}
            </a>
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-accent-500 px-8 py-3 font-semibold text-white hover:bg-accent-600 transition-colors"
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
