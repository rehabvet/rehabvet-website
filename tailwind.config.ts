import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Exclude (payload) route group — Payload has its own styles
  // Tailwind content scanning already excludes it via the paths above

  theme: {
    extend: {
      colors: {
        // Primary: Gold/Yellow #FDC61C
        primary: {
          50: '#fffdf0',
          100: '#fef9cc',
          200: '#fef2a0',
          300: '#fee975',
          400: '#fdda48',
          500: '#FDC61C',
          600: '#e6ac00',
          700: '#b38500',
          800: '#7a5c00',
          900: '#523d00',
        },
        // Accent: Pink #EC6496
        accent: {
          50: '#fef0f6',
          100: '#fdd6e9',
          200: '#fbb0d2',
          300: '#f880b4',
          400: '#f26fa5',
          500: '#EC6496',
          600: '#d44780',
          700: '#bb2e68',
          800: '#941e51',
          900: '#6d1039',
        },
        // Green: Bright green #19BC00 (service-related elements)
        green: {
          50: '#e8fde5',
          100: '#c5f9bc',
          200: '#96f387',
          300: '#64ec53',
          400: '#38e220',
          500: '#19BC00',
          600: '#139600',
          700: '#0d7100',
          800: '#084d00',
          900: '#042b00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
