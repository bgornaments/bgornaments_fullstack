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
      screens:{
        'xs':'300px'
      },
      fontFamily: {
        secondary:['Inknut Antiqua', 'serif'],
      },
      colors: {
        customGreen: '#166767',
        customBeige: '#F5E8D7',
        customBlack: '#00000066'
        
      },
      boxShadow: {
        'green': '-3px 3px 15px 0px rgba(22, 103, 103, 0.5)',
      }
    },
  },
  plugins: [],
}