/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    
    extend: {
      colors: {
        peach: '#FFE6C9',
        darkPeach: '#73114B',
        CustomGray: '#525252'
      }
    },
  },
  plugins: [],
}