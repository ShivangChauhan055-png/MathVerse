/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  safelist: [
    { pattern: /bg-(indigo|cyan|violet|emerald|amber|red|rose)-(400|500)\/(10|15|20|25)/ },
    { pattern: /text-(indigo|cyan|violet|emerald|amber|red|rose)-(300|400|500)/ },
    { pattern: /border-(indigo|cyan|violet|emerald|amber|red|rose)-(300|400|500)\/(30|50)/ },
  ],
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        space: {
          950: '#06070c',
          900: '#0f1422',
          800: '#182231',
          700: '#233142',
          600: '#2d3a4b',
        },
        ink: {
          950: '#071018',
          900: '#152132',
          800: '#24354A',
          700: '#304357',
        },
        paper: {
          50: '#fcfaf4',
          100: '#f4f0e6',
          200: '#e5d7bb',
        },
        teal: {
          400: '#5fb8a7',
          500: '#2e988e',
          600: '#237a71',
        },
        amber: {
          400: '#e5b76f',
          500: '#c88b2f',
          600: '#a86f21',
        },
        plum: {
          400: '#9d8dd5',
          500: '#6d5ab5',
          600: '#53448f',
        },
        sage: {
          400: '#8ba68f',
          500: '#69886f',
          600: '#516d57',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 10s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'equation-float': 'equationFloat 6s ease-in-out infinite',
        'grid-pulse': 'gridPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(8px,-10px,0)' },
        },
        equationFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.06' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(20 32 47 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
        'hero-gradient':
          'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(46, 152, 142, 0.16), transparent)',
        'card-gradient':
          'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
