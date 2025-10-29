/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ZWA Blue (Primary)
        'zwa-blue': {
          100: '#E6F2F8',
          400: '#53A7D0',
          500: '#2179B3',
          700: '#14526F',
          800: '#0D3A4E',
        },
        // ZWA Gold (Secondary)
        'zwa-gold': {
          400: '#E7C876',
          500: '#D4A73F',
          600: '#B8923A',
        },
        // Semantic colors
        primary: {
          DEFAULT: '#2179B3',
          light: '#53A7D0',
          dark: '#14526F',
          contrast: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#D4A73F',
          light: '#E7C876',
          dark: '#B8923A',
          contrast: '#0D3A4E',
        },
        green: {
          500: '#489E4A',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          600: '#6B7280',
          900: '#111827',
        },
        // Semantic token aliases
        bg: {
          DEFAULT: '#FFFFFF',
          muted: '#F9FAFB',
          card: '#FFFFFF',
        },
        fg: {
          DEFAULT: '#111827',
          muted: '#6B7280',
        },
        border: {
          DEFAULT: '#E5E7EB',
          muted: '#F3F4F6',
        },
        'header-bg': '#0D3A4E',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        'pill': '999px',
      },
      height: {
        '9': '2.25rem',
        '11': '2.75rem',
        '13': '3.25rem',
      },
    },
  },
  plugins: [],
}

