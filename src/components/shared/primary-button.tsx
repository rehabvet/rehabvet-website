'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'

type ButtonProps = {
  text?: string | ReactNode
  href?: string
  type?: 'button' | 'submit' | 'reset'
  as?: 'link' | 'button'
  className?: string
  onClick?: () => void
  variant?: 'normal' | 'inverse'
}

export default function Button({
  text,
  href = '#',
  type = 'button',
  as = 'link',
  className = '',
  onClick,
  variant = 'normal',
}: ButtonProps) {
  const baseClass =
    'font-primary skew-x-0 w-max relative inline-flex items-center justify-center px-6 lg:px-10 py-3 lg:py-4 xl:py-[18px] text-sm lg:text-base xl:text-lg font-semibold capitalize border overflow-hidden leading-[1] cursor-pointer text-center rounded-full transition-all duration-600 relative before:content-[\'\'] before:absolute before:top-full before:bottom-0 before:right-0 before:left-0 before:z-[-1] before:transition-all before:duration-500'

  const normalClass =
    'bg-primary border-primary text-white hover:text-dark hover:border-border_one before:bg-white before:opacity-0 hover:before:top-0 hover:before:left-0 hover:before:opacity-100'

  const inverseClass =
    'bg-transparent border-border_one text-dark hover:text-white hover:border-primary before:bg-primary before:opacity-0 hover:before:top-0 hover:before:left-0 hover:before:opacity-100'

  const combinedClass = `${baseClass} ${variant === 'inverse' ? inverseClass : normalClass} ${className}`

  if (as === 'button') {
    return (
      <button type={type} className={combinedClass} onClick={onClick}>
        {text}
      </button>
    )
  }

  return (
    <Link href={href} className={combinedClass}>
      {text}
    </Link>
  )
}
