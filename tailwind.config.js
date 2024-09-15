/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      screens: {
        'xs': '300px'
      },
      fontFamily: {
        custom: ['gabriola', 'sans-serif'],
        second: ['Manrope', 'serif']
      },
      colors: {
        lightGreen: '#00AA4F',
        customGreen: '#007F3ACC',
        customRed: '#EB2D2E',
        lightGolden: '#E0AE2A',
        darkGolden: '#B2801D',
        navbar: '#B2801D30',
        customBlack: '#0d0d0d'

      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgba(178,128,29,1) 0%, rgba(178,128,29,0.7) 100%)', // Add the gradient
      },
      boxShadow: {
        'green': '-3px 3px 15px 0px rgba(22, 103, 103, 0.5)',
      }
    },
  },
  plugins: [],
}