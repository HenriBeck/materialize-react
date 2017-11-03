import injectSheet from 'react-jss';

/**
 * A component which will add a stylesheet with some basic keyframes.
 *
 * @returns {JSX} - Returns always null. Any children will be lost.
 */
function Animations() {
  return null;
}

Animations.styles = {
  '@keyframes fade-in': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  '@keyframes fade-out': {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },

  '@keyframes fade-in-image': {
    '0%': {
      opacity: 0,
      filter: 'saturate(20%) brightness(125%)',
    },
    '66.7%': { opacity: 1 },
    '83.3%': { filter: 'saturate(87%) brightness(100%)' },
    '100%': {
      filter: 'saturate(100%) brightness(100%)',
      opacity: 1,
    },
  },
};

export default injectSheet(Animations.styles)(Animations);
