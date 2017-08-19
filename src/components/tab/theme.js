import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  unselectedOpacity: PropTypes.number.isRequired,
  selectedOpacity: PropTypes.number.isRequired,
  focusedOpacity: PropTypes.number.isRequired,
  rippleColor: PropTypes.string.isRequired,
}).isRequired;

/**
 * Default theme for the tab.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    unselectedOpacity: 0.8,
    selectedOpacity: 1,
    focusedOpacity: 1,
    rippleColor: vars.primaryBase,
  };
}
