// eslint-disable-next-line no-unused-vars
const windmill = require('@windmill/react-ui/config')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        atrangi: 'Comforter Brush',
        head: 'Orbitron',
        khokla: 'Tourney',
        sadha: 'Fauna One',
        ticker1: 'Allerta Stencil',
        curvy: 'Annie Use Your Telescope',
        handwriting: 'Nanum Pen Script',
        ticker2: 'Press Start 2P',
        normal: 'Sawarabi Mincho',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
