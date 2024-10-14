/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      'spotifytitle': ['spotifytitle'],
    },
    colors: {
      'navbar-gray': '#1f1f1f',
    },
  },
  plugins: [],
}

