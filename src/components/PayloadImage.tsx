import Image from 'next/image'
import type { Media } from '@/payload-types'

export function PayloadImage({
  media,
  className = '',
  fill = false,
  width,
  height,
  sizes,
  priority = false,
}: {
  media: Media | number | null | undefined
  className?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
}) {
  if (!media || typeof media === 'number' || !media.url) {
    return (
      <div className={`bg-primary-100 flex items-center justify-center ${className}`}>
        <svg className="w-12 h-12 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={media.url}
        alt={media.alt || ''}
        fill
        className={`object-cover ${className}`}
        sizes={sizes || '100vw'}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={media.url}
      alt={media.alt || ''}
      width={width || media.width || 800}
      height={height || media.height || 600}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  )
}
