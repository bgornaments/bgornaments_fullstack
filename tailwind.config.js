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
        loader: 'loader 4s infinite linear', // New animation
        'spin-slow': 'spin 20s linear infinite',
        'counter-spin': 'counterspin 20s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        counterspin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        loader: { // New keyframes for the loader animation
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '800px 0' },
        },
      },
      screens: {
        'xs': '300px',
      },
      fontFamily: {
        custom: 'Gabriola',
        // second: ['Manrope', 'serif']
        second: ['sans-serif']
      },
      colors: {
        lightGreen: '#00AA4F', //pallete
        customGreen: '#007F3ACC',
        customRed: '#EB2D2E', //pallete
        lightGolden: '#E0AE2A', //pallete
        darkGolden: '#B2801D', //pallete
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

