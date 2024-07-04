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
          customGreen: '#166767',
          customBeige: '#F5E8D7',
          customBlack: '#00000066'
        },
      },
    },
    plugins: [],
  }