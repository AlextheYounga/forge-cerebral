/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'gold': '#F2D024',
            'burgandy': '#800020',
          },
    },
},
  plugins: [],
}