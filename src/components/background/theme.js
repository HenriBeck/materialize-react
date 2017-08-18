import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
}).isRequired;

/**
 * Default theme for the background component.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    color: vars.textColor,
    backgroundColor: vars.backgroundColor,
  };
}
