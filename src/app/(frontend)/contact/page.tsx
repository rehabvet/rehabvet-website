import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the RehabVet team to book a consultation or ask about our veterinary rehabilitation services.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">
            We&apos;d love to hear from you. Book a consultation, ask a question, or find out how we
            can help your pet.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
              <p className="mt-2 text-gray-600">
                Fill in the form below and we&apos;ll get back to you within one business day.
              </p>

              <form action="#" method="POST" className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name <span className="text-coral-400">*</span>
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
                      Last name <span className="text-coral-400">*</span>
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
                    Email address <span className="text-coral-400">*</span>
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
                    placeholder="+61 4XX XXX XXX"
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
                    How can we help? <span className="text-coral-400">*</span>
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
                  className="w-full rounded-full bg-coral-400 px-8 py-3 font-semibold text-white hover:bg-coral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-coral-400 focus:ring-offset-2"
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="mt-1 text-gray-600">
                      123 Rehabilitation Drive<br />
                      Suburb, State 1234<br />
                      Australia
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href="tel:+61200000000" className="mt-1 text-primary-500 hover:text-primary-700">
                      +61 2 0000 0000
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:info@rehabvet.com.au" className="mt-1 text-primary-500 hover:text-primary-700">
                      info@rehabvet.com.au
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Opening Hours</p>
                    <div className="mt-1 space-y-1 text-gray-600 text-sm">
                      <p>Monday &ndash; Friday: 8:00am &ndash; 6:00pm</p>
                      <p>Saturday: 9:00am &ndash; 2:00pm</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Placeholder */}
              <div className="h-64 w-full rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-400">
                  <svg className="mx-auto h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                  </svg>
                  <p className="text-sm">Map loading&hellip;</p>
                  <p className="text-xs mt-1">Google Maps integration coming soon</p>
                </div>
              </div>

              <div className="rounded-2xl bg-primary-50 p-6">
                <h3 className="font-bold text-gray-900">Referral from your vet?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We accept direct referrals from veterinary practices. Please ask your vet to send
                  through a referral letter with your pet&apos;s history.
                </p>
                <Link
                  href="/services"
                  className="mt-3 inline-block text-sm font-medium text-primary-500 hover:text-primary-700"
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
          <a
            href="tel:+61200000000"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
          >
            Call Us Now
          </a>
        </div>
      </section>
    </>
  )
}
