import React from 'react'
import Link from 'next/link'

interface PagesHeaderProps {
  title: string
  breadcrumb?: { name: string; href?: string }[]
}

export default function PagesHeader({ title, breadcrumb }: PagesHeaderProps) {
  return (
    <div className="bg-primary_bg py-8 md:py-10 xl:py-16 z-10 relative">
      <div className="container">
        <div className="py-10 md:py-15 xl:py-25 2xl:py-30 bg-primary_shade rounded-[30px] text-center space-y-2 lg:space-y-5 xl:space-y-7">
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
