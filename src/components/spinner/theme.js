import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  containerRotationDuration: PropTypes.number.isRequired,
  fullCycleDuration: PropTypes.number.isRequired,
  expandContractDuration: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  fadeInOutDuration: PropTypes.number.isRequired,
});

/**
 * Default theme for the spinner.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    containerRotationDuration: 1568,
    fullCycleDuration: 5332,
    expandContractDuration: 1333,
    color: vars.primaryBase,
    strokeWidth: 4,
    size: 56,
    fadeInOutDuration: 1333 / 3,
  };
}
