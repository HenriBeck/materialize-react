import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  size: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  iconSize: PropTypes.number.isRequired,
  rippleColor: PropTypes.string.isRequired,
}).isRequired;

/**
 * The default theme for the icon button component.
 *
 * @private
 * @param {Object} vars - The variables for the theme.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    size: 48,
    margin: 4,
    iconSize: 24,
    rippleColor: vars.iconColor,
  };
}
