import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
}).isRequired;

/**
 * The default theme for the divider component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    height: 1,
    backgroundColor: vars.dividerColor,
  };
}
