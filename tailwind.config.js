/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#0B0F12',
          900: '#0F1417',
          850: '#131A1E',
          800: '#171D21',
          700: '#1E2629',
          600: '#2A3438',
          500: '#3A4649',
        },
        amber: {
          400: '#F7B84B',
          500: '#F5A623',
          600: '#D98A0F',
        },
        teal: {
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
        },
        mist: {
          100: '#E8EDF0',
          300: '#B7C3CA',
          500: '#8A9BA8',
          700: '#5C6B75',
        },
        danger: '#EF5350',
        success: '#4ADE80',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.6)',
        glow: '0 0 24px -4px rgba(245,166,35,0.35)',
        tealglow: '0 0 24px -4px rgba(45,212,191,0.35)',
      },
      keyframes: {
        pulseline: {
          '0%,100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        flowdash: {
          to: { strokeDashoffset: -40 },
        },
        rise: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseline: 'pulseline 2.2s ease-in-out infinite',
        flowdash: 'flowdash 1.2s linear infinite',
        rise: 'rise 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
