/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'linear-gradient': 'linear-gradient(var(--color-background-first), var(--color-background-second))',
      },
      colors: {
        background: 'var(--color-background)',
        primary: 'var(--color-primary)',
        secondary: {
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
        },
        textLight: 'var(--color-text-light)',
        textDark: 'var(--color-text-dark)',
        warn: '#fc8c03',
        success: '#036ffc',
      },
    },
  },
  plugins: [],
}
