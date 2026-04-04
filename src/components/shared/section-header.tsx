import React from 'react'
import { FaPaw } from 'react-icons/fa'

type SectionHeaderProps = {
  className?: string
  title: string
  subtitle: string
  subtitleClass?: string
  titleClass?: string
}

export default function SectionHeader({
  className,
  title,
  subtitle,
  subtitleClass,
  titleClass,
}: SectionHeaderProps) {
  return (
    <div className={`space-y-3 xl:space-y-6 ${className ?? ''}`}>
      <div
        className={`flex items-center justify-center gap-2 ${subtitleClass ?? ''}`}
        data-aos="fade-up"
        data-aos-delay={400}
      >
        <FaPaw className="text-primary text-lg" />
        <h6>{subtitle}</h6>
      </div>
      <h2
        className={titleClass ?? ''}
        data-aos="fade-up"
        data-aos-delay={500}
      >
        {title}
      </h2>
    </div>
  )
}
