import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  checkedBorderColor: PropTypes.string.isRequired,
  checkedBackgroundColor: PropTypes.string.isRequired,

  uncheckedBorderColor: PropTypes.string.isRequired,
  uncheckedBackgroundColor: PropTypes.string.isRequired,

  disabledBorderColor: PropTypes.string.isRequired,
  disabledBackgroundColor: PropTypes.string.isRequired,
  disabledCheckedBackgroundColor: PropTypes.string.isRequired,

  padding: PropTypes.number.isRequired,
  rippleSize: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,

  animationDuration: PropTypes.number.isRequired,
});

/**
 * The default theme for the checkbox component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    checkedBorderColor: vars.primaryBase,
    checkedBgColor: vars.primaryBase,

    uncheckedBorderColor: 'rgba(255, 255, 255, 0.7)',
    uncheckedBgColor: 'transparent',

    disabledBorderColor: 'rgba(255, 255, 255, 0.3)',
    disabledBgColor: 'transparent',
    disabledCheckedBgColor: 'rgba(255, 255, 255, 0.3)',

    padding: 4,
    rippleSize: 48,
    size: 20,
    borderWidth: 2,

    animationDuration: vars.transitionTime,
  };
}
