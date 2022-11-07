/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'display' : ['Lexend', 'sans-serif'],
        'sans' : ['Roboto Condensed', 'sans-serif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
