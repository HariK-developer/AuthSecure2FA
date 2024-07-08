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
      },
      height : {
        300: '300px',
        250: '250px',
        100: '100px',
        50: '50px',
        70: '70px',
        62: '62px',
      },
      width: {
        50: '50px',
        70: '70px',
        300: '300px',
        500: '500px',
        100: '100px',
        200: '200px',
        250: '250px',
        300: '300px',
        400: '400px',
      }
    },
  },
  plugins: [],
}