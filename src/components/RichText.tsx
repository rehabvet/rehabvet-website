import React from 'react'
import { RichText as PayloadRichText, defaultJSXConverters } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type RichTextData = {
  root: {
    type: string
    children: { type: any; version: number; [k: string]: unknown }[]
    direction: ('ltr' | 'rtl') | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
  [k: string]: unknown
}

export function RichText({
  data,
  className = '',
}: {
  data: RichTextData | null | undefined
  className?: string
}) {
  if (!data) return null

  return (
    <div className={`prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-700 ${className}`}>
      <PayloadRichText
        data={data as SerializedEditorState}
        converters={defaultJSXConverters}
      />
    </div>
  )
}
