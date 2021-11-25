module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')], // eslint-disable-line global-require
    },
  },
}
