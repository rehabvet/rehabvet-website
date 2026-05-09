import React from 'react'
import Link from 'next/link'

interface PagesHeaderProps {
  title: string
  breadcrumb?: { name: string; href?: string }[]
}

export default function PagesHeader({ title, breadcrumb }: PagesHeaderProps) {
  return (
    <div className="bg-primary_bg py-6 md:py-8 xl:py-12 z-10 relative">
      <div className="container">
        <div className="py-10 md:py-14 xl:py-20 bg-primary_shade rounded-[30px] text-center space-y-2 lg:space-y-4 xl:space-y-6">
          <h1 className="animateText">{title}</h1>
          {breadcrumb && (
            <div className="capitalize font-primary md:font-semibold text-dark text-lg">
              {breadcrumb.map((item, index) => (
                <span key={index}>
                  {item.href ? (
                    <Link href={item.href}>{item.name}</Link>
                  ) : (
                    <span className="text-primary">{item.name}</span>
                  )}
                  {index < breadcrumb.length - 1 && (
                    <span className="mx-1">&gt;</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
