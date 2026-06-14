/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0F1C',
        gold: '#F5B301',
        'cloud-blue': '#0078D4',
        'accent-green': '#34D399',
        surface: '#111827',
        'surface-2': '#1F2937',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #F5B301, 0 0 10px #F5B301' },
          '100%': { boxShadow: '0 0 20px #F5B301, 0 0 40px #F5B301, 0 0 80px #F5B301' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0A0F1C 0%, #111827 50%, #0A0F1C 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F5B301 0%, #FFD700 100%)',
        'blue-gradient': 'linear-gradient(135deg, #0078D4 0%, #00BCF2 100%)',
        'green-gradient': 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
      },
    },
  },
  plugins: [],
}
