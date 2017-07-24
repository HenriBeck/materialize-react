import PropTypes from 'prop-types';
import color from 'color';

import {
  grey50,
  grey400,
} from '../../styles/colors';

export const schema = PropTypes.shape({
  thumbSize: PropTypes.number.isRequired,
  barWidth: PropTypes.number.isRequired,
  barHeight: PropTypes.number.isRequired,
  rippleSize: PropTypes.number.isRequired,
  transitionDuration: PropTypes.number.isRequired,

  checkedThumbColor: PropTypes.string.isRequired,
  checkedBarColor: PropTypes.string.isRequired,
  checkedRippleColor: PropTypes.string.isRequired,

  uncheckedThumbColor: PropTypes.string.isRequired,
  uncheckedBarColor: PropTypes.string.isRequired,
  uncheckedRippleColor: PropTypes.string.isRequired,

  disabledThumbColor: PropTypes.string.isRequired,
  disabledBarColor: PropTypes.string.isRequired,
});

/**
 * Compute the default theme for the switch component.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the default theme for the switch component.
 */
export function defaultTheme(vars) {
  const primaryBaseRGB = color(vars.primaryBase)
    .rgb()
    .array();

  return {
    thumbSize: 20,
    barWidth: 36,
    barHeight: 14,
    rippleSize: 48,
    transitionDuration: vars.transitionTime,

    checkedThumbColor: vars.primaryBase,
    checkedBarColor: `rgba(${primaryBaseRGB.join(',')}, 0.5)`,
    checkedRippleColor: vars.primaryBase,

    uncheckedThumbColor: grey50,
    uncheckedBarColor: 'rgba(0, 0, 0, 0.38)',
    uncheckedRippleColor: grey50,

    disabledThumbColor: grey400,
    disabledBarColor: 'rgba(0, 0, 0, 0.12)',
  };
}
