import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  transitionDuration: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,
  rippleSize: PropTypes.number.isRequired,

  checkedColor: PropTypes.string.isRequired,
  uncheckedColor: PropTypes.string.isRequired,
  disabledColor: PropTypes.string.isRequired,
});

/**
 * Default theme for the radio button component.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    transitionDuration: vars.transitionTime,
    size: 16,
    borderWidth: 2,
    rippleSize: 40,

    checkedColor: vars.primaryBase,
    uncheckedColor: 'rgba(255, 255, 255, 0.7)',
    disabledColor: 'rgba(255, 255, 255, 0.3)',
  };
}
