import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  transitionDuration: PropTypes.number.isRequired,

  headers: PropTypes.shape({
    dots: PropTypes.shape({
      inactiveColor: PropTypes.string.isRequired,
      activeColor: PropTypes.string.isRequired,
      dotSize: PropTypes.number.isRequired,
      margin: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  section: PropTypes.shape({
    mobilePadding: PropTypes.number.isRequired,
    tabletPadding: PropTypes.number.isRequired,
  }).isRequired,
}).isRequired;

/**
 * Default theme for the stepper.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    transitionDuration: 250,

    headers: {
      dots: {
        inactiveColor: vars.disabledColor,
        activeColor: vars.primaryBase,
        dotSize: 8,
        margin: 4,
      },
    },

    section: {
      mobilePadding: 16,
      tabletPadding: 24,
    },
  };
}
