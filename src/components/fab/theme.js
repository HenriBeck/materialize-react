import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  miniSize: PropTypes.number.isRequired,
  normalSize: PropTypes.number.isRequired,
  iconSize: PropTypes.number.isRequired,

  elevation: PropTypes.number.isRequired,
  focusedElevation: PropTypes.number.isRequired,
  disabledElevation: PropTypes.number.isRequired,

  backgroundColor: PropTypes.string.isRequired,
  disabledBackgroundColor: PropTypes.string.isRequired,

  transitionTime: PropTypes.number.isRequired,
});

/**
 * The default theme for the FAB   component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    miniSize: 40,
    normalSize: 56,
    iconSize: 24,

    elevation: 1,
    focusedElevation: 4,
    disabledElevation: 0,

    backgroundColor: vars.primaryBase,
    disabledBackgroundColor: 'rgba(255, 255, 255, 0.1)',

    transitionTime: vars.transitionTime,
  };
}
