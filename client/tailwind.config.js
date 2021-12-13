const defaultTheme = require('tailwindcss/defaultTheme');
const windmill = require('@windmill/react-ui/config');

module.exports = windmill({
  purge: ['src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        atrangi: 'Comforter Brush',
        head: 'Orbitron',
        khokla: 'Tourney',
        sadha: 'Fauna One',
        ticker1: 'Allerta Stencil',
        curvy: 'Annie Use Your Telescope',
        handwriting: 'Nanum Pen Script',
        hand: 'Patrick Hand SC',
        ticker2: 'Press Start 2P',
        normal: 'Sawarabi Mincho',
        marker: 'Permanent Marker',
        marker2: 'Rock Salt',
        ticker: 'Black Ops One',
        info: 'PT Sans',
        info2: 'Comfortaa',
      },
      boxShadow: {
        bottom:
          '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
    },
  },
});
