import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  color: PropTypes.string,
  disabledColor: PropTypes.string,
});

/**
 * The default theme for the icon component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    color: vars.iconColor,
    disabledColor: vars.disabledColor,
  };
}
