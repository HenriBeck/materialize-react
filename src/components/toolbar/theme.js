import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  backgroundColor: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  mobileHeight: PropTypes.number.isRequired,
}).isRequired;

/**
 * Default theme for the toolbar.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    backgroundColor: vars.appBar,
    height: 64,
    mobileHeight: 56,
  };
}
