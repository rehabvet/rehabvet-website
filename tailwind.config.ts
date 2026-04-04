import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        md: '720px',
        lg: '960px',
        xl: '1296px',
      },
    },
    extend: {
      colors: {
        // Primary: Teal green — medical/rehab feel
        primary: {
          DEFAULT: '#2B8C7E',
          50: '#E6F5F2',
          100: '#CCEBE5',
          200: '#99D7CB',
          300: '#66C3B1',
          400: '#33AF97',
          500: '#2B8C7E',
          600: '#237065',
          700: '#1B544C',
          800: '#133833',
          900: '#0B1C19',
        },
        // Accent: Pink #EC6496
        accent: {
          DEFAULT: '#EC6496',
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
        // Template semantic colors (adapted for teal)
        dark: '#190E0F',
        primary_shade: '#E6F5F2',
        text_color: '#3C3C3C',
        off_white: '#F8FFFE',
        light_gray: '#F2FAF8',
        primary_bg: '#F8FFFE',
        border_one: '#BFD9D4',
        // Gold accent
        gold: {
          DEFAULT: '#FDC61C',
          50: '#fffdf0',
          100: '#fef9cc',
          200: '#fef2a0',
          300: '#fee975',
          400: '#fdda48',
          500: '#FDC61C',
        },
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
        primary: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '90': ['5.625rem', { lineHeight: '1.05' }],
        '40': ['2.5rem', { lineHeight: '1.1' }],
      },
      transitionDuration: {
        '600': '600ms',
      },
      spacing: {
        '15': '3.75rem',
        '25': '6.25rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
