import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  elevation: PropTypes.number.isRequired,
  pressedElevation: PropTypes.number.isRequired,

  height: PropTypes.number.isRequired,
  minWidth: PropTypes.number.isRequired,
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  horizontalPadding: PropTypes.string,

  bgColor: PropTypes.string.isRequired,
  raisedBgColor: PropTypes.string.isRequired,
  raisedAndPressedBgColor: PropTypes.string.isRequired,
  disabledBgColor: PropTypes.string.isRequired,
  raisedAndDisabledBgColor: PropTypes.string.isRequired,

  color: PropTypes.string.isRequired,
  disabledColor: PropTypes.string.isRequired,
}).isRequired;

/**
 * The default theme for the button component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    elevation: 3,
    pressedElevation: 6,

    height: 36,
    minWidth: 88,
    margin: '0 8px',
    padding: '0 8px',

    bgColor: 'transparent',
    raisedBgColor: 'transparent',
    disabledBgColor: 'transparent',
    raisedAndDisabledBgColor: 'rgba(0, 0, 0, 0.12)',
    raisedAndPressedBgColor: 'transparent',

    color: vars.textColor,
    disabledColor: 'rgba(0, 0, 0, 0.30)',
  };
}
