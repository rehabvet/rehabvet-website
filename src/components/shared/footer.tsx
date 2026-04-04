'use client'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <div>
      <footer className="bg-dark pt-10 md:pt-20 xl:pt-25 relative z-0">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Stay Connected */}
            <div className="col-span-12 md:col-span-6 space-y-5 xl:space-y-8">
              <h2 className="text-primary_shade">Stay Connected with RehabVet</h2>
              <p className="d2c_footer_text !capitalize-none">
                Singapore&apos;s first full-fledged animal rehabilitation clinic offering the widest range of rehabilitation modalities.
              </p>
              <div className="flex gap-5">
                <a href="https://www.facebook.com/SGrehabvet/" target="_blank" rel="noopener noreferrer" className="d2c_social_media">
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/rehabvet_sg/" target="_blank" rel="noopener noreferrer" className="d2c_social_media">
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-12 md:col-span-3 space-y-5 xl:space-y-8 lg:pl-10 2xl:pl-15">
              <h3 className="text-primary">Quick Links</h3>
              <div className="flex flex-col space-y-4">
                <Link href="/" className="d2c_footer_link">Home</Link>
                <Link href="/about" className="d2c_footer_link">About</Link>
                <Link href="/services" className="d2c_footer_link">Services</Link>
                <Link href="/modalities" className="d2c_footer_link">Modalities</Link>
                <Link href="/conditions" className="d2c_footer_link">Conditions</Link>
                <Link href="/blog" className="d2c_footer_link">Blog</Link>
                <Link href="/faq" className="d2c_footer_link">FAQ</Link>
                <Link href="/contact" className="d2c_footer_link">Contact</Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-span-12 md:col-span-3 space-y-5 xl:space-y-8 pl-0 lg:pl-8 xl:pl-15">
              <h3 className="text-primary">Contact Info</h3>
              <div className="flex flex-col space-y-4">
                <a href="mailto:hello@rehabvet.com" className="d2c_footer_link lowercase">hello@rehabvet.com</a>
                <a href="tel:+6562916881" className="d2c_footer_link">+65 6291 6881</a>
                <a href="https://wa.me/6587987554" target="_blank" rel="noopener noreferrer" className="d2c_footer_link">
                  +65 8798 7554 (WhatsApp)
                </a>
                <p className="d2c_footer_text">513 Serangoon Road, #01-01, Singapore 218154</p>
                <div className="d2c_footer_text space-y-1">
                  <p>Mon – Wed &amp; Fri: 11am – 8pm</p>
                  <p>Thursday: 9am – 6pm</p>
                  <p>Weekends: 10am – 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="grid md:grid-cols-12 md:gap-6 py-6 mt-10 md:mt-16 lg:mt-20 border-t border-t-primary/20 space-y-3 md:space-y-0">
            <div className="col-span-12 md:col-span-7 lg:col-span-6">
              <p className="d2c_footer_text">
                Copyright &copy; {currentYear} RehabVet. All Rights Reserved
              </p>
            </div>
            <div className="col-span-12 md:col-span-5 lg:col-span-6">
              <ul className="flex items-center justify-center md:justify-end gap-8 lg:gap-10 xl:gap-14">
                <li>
                  <Link href="/terms" className="d2c_footer_link text-xs md:text-sm lg:text-lg">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="d2c_footer_link text-xs md:text-sm lg:text-lg">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
