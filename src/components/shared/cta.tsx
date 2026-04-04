'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SectionHeader from './section-header'
import Button from './primary-button'
import ctaImg from '@/assets/images/cta_img.jpg'

type CTAProps = {
  className?: string
  title?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
}

export default function CTA({
  className = '',
  title = 'Book a visit today and let us help your pet recover.',
  subtitle = 'Your Pet Deserves Expert Care',
  buttonText = 'Schedule a Consultation',
  buttonHref = '/contact',
}: CTAProps) {
  const [isScaled, setIsScaled] = useState(false)
  const ctaRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => setIsScaled(entry.isIntersecting),
        { threshold: 0.5 },
      )
      if (ctaRef.current) observer.observe(ctaRef.current)
      return () => {
        if (ctaRef.current) observer.unobserve(ctaRef.current)
      }
    }
  }, [])

  return (
    <section ref={ctaRef} className={className}>
      <div className="container">
        <div className="bg-primary_shade rounded-lg">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 md:col-span-5 lg:col-span-6">
              <div className="rounded-tl-lg rounded-tr-lg md:rounded-tr-none rounded-bl-none md:rounded-bl-lg rounded-br-none overflow-hidden w-full h-full">
                <Image
                  src={ctaImg}
                  width={ctaImg.width}
                  height={ctaImg.height}
                  className={`rounded-tl-lg rounded-tr-lg md:rounded-tr-none rounded-bl-none md:rounded-bl-lg rounded-br-none transition-transform duration-700 ease-out w-full h-full object-cover ${isScaled ? 'scale-110' : 'scale-100'}`}
                  alt="RehabVet Clinic"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 lg:col-span-6 text-center inline-flex items-center justify-center">
              <div className="px-5 md:px-8 py-10 lg:py-15 lg:px-15 space-y-4 md:space-y-6">
                <SectionHeader
                  className="text-center"
                  title=""
                  subtitle={subtitle}
                  subtitleClass="justify-start md:justify-center"
                />
                <h3 data-aos="fade-up">{title}</h3>
                <div>
                  <Button text={buttonText} href={buttonHref} as="link" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
