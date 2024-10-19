/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
       '78.1vh' : '78.1vh'
      },
      colors: {
        'navbar-gray': '#1f1f1f',
        'background-gray' : '#121212',
      }
    },
    fontFamily:{
      'spotifytitle': ['spotifytitle'],
    },
  
  },
  plugins: [],
}

