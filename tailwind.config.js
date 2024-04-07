/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'Jakarta': ['Jakarta', 'sans-serif'],
      },
      gridTemplateColumns:{
        '2': 'minmax(260px, 300px) 1fr',
        '3': 'repeat(3, 280px)',
      },
      gridTemplateRows:{
        '2': '80px 90%' 
      }
    },
  },
  plugins: [],
}

