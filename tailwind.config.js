/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar-gray': '#1f1f1f',
      }
    },
    fontFamily:{
      'spotifytitle': ['spotifytitle'],
    },
   
  },
  plugins: [],
}

