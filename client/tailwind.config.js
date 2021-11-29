module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true
      },
      zIndex: {
        '-1': '-1',
      },
      fontSize: {
        'xxs': '.65rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
