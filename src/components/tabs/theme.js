import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  barColor: PropTypes.string.isRequired,
  transitionDuration: PropTypes.number.isRequired,
}).isRequired;

/**
 * Default theme for the tabs.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    barColor: vars.primaryBase,
    transitionDuration: vars.transitionTime * 2,
  };
}
