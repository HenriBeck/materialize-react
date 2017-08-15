import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  borderRadius: PropTypes.number.isRequired,
  elevation: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
});

/**
 * Default theme for the card component.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    backgroundColor: vars.cardBackgroundColor,
    borderRadius: 2,
    elevation: 2,
    margin: 8,
  };
}
