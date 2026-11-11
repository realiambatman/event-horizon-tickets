/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Midnight: page, surfaces and hairlines.
        ink: {
          950: '#06061a',
          900: '#0b0c26',
          800: '#13153a',
          700: '#1d2050',
          600: '#2c3070',
          500: '#474b96',
        },
        // Ticket stock and primary text.
        paper: {
          DEFAULT: '#f5eedc',
          dim: '#ddd5c0',
          deep: '#c9c0a8',
        },
        mute: '#a8abd2',
        coral: { DEFAULT: '#ff5a4e', deep: '#e13d32' },
        magenta: '#f23a93',
        volt: { DEFAULT: '#ffe81a', deep: '#e6cf00' },
      },
      fontFamily: {
        sans: ['"Instrument Sans Variable"', 'system-ui', 'sans-serif'],
        display: ['"Big Shoulders Display Variable"', 'Impact', '"Arial Narrow"', 'sans-serif'],
      },
      fontSize: {
        // Poster scale: tight leading, sized for the condensed display face.
        'poster-sm': ['2.25rem', { lineHeight: '0.92' }],
        'poster-md': ['3.5rem', { lineHeight: '0.9' }],
        'poster-lg': ['5.5rem', { lineHeight: '0.86' }],
        'poster-xl': ['8.5rem', { lineHeight: '0.82' }],
      },
      borderRadius: {
        stock: '3px',
      },
      boxShadow: {
        // Hard offset, like a misregistered second print pass.
        print: '5px 5px 0 0 #06061a',
        'print-coral': '5px 5px 0 0 #ff5a4e',
        lift: '0 24px 48px -20px rgba(0, 0, 0, 0.7)',
      },
      transitionTimingFunction: {
        snap: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      keyframes: {
        'poster-drop': {
          from: { opacity: '0', transform: 'translateY(-40px) rotate(-6deg)' },
          to: { opacity: '1', transform: 'translateY(0) rotate(3deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'poster-drop': 'poster-drop 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both',
        marquee: 'marquee 36s linear infinite',
      },
    },
  },
  plugins: [],
};
