/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs':'300px'
      },
      fontFamily: {
        secondary:['Inknut Antiqua', 'serif'],
      },
      colors: {
        customGreen: '#1b7575',
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