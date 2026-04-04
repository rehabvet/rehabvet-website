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
        // Primary: RehabVet pink from logo
        primary: {
          DEFAULT: '#E84E8A',
          50: '#FEF0F6',
          100: '#FDD6E9',
          200: '#FBB0D2',
          300: '#F880B4',
          400: '#F26FA5',
          500: '#E84E8A',
          600: '#D43B76',
          700: '#BB2E68',
          800: '#941E51',
          900: '#6D1039',
        },
        // Accent: Gold from logo
        accent: {
          DEFAULT: '#FDC61C',
          50: '#FFF9E6',
          100: '#FFF0BF',
          200: '#FFE080',
          300: '#FFD040',
          400: '#FDC61C',
          500: '#E5B018',
          600: '#CC9A14',
          700: '#997310',
          800: '#664D0B',
          900: '#332607',
        },
        // Template semantic colors (adapted for pink)
        dark: '#190E0F',
        primary_shade: '#FEF0F6',
        text_color: '#3C3C3C',
        off_white: '#FFF8F8',
        light_gray: '#FAF2EF',
        primary_bg: '#FFF8F8',
        border_one: '#DFBDBF',
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
