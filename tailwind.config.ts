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
        primary: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#2E7D32',
          600: '#2E7D32',
          700: '#1b5e20',
          800: '#155a1f',
          900: '#0d3d14',
        },
        coral: {
          50: '#fff0f0',
          100: '#ffd6d6',
          200: '#ffb3b3',
          300: '#ff8f8f',
          400: '#FF6B6B',
          500: '#FF6B6B',
          600: '#e55a5a',
          700: '#cc4a4a',
          800: '#b33a3a',
          900: '#992a2a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
