import PropTypes from 'prop-types';
import color from 'color';

import {
  grey400,
  grey800,
} from '../../styles/colors';

export const schema = PropTypes.shape({
  thumbSize: PropTypes.number.isRequired,
  barWidth: PropTypes.number.isRequired,
  barHeight: PropTypes.number.isRequired,
  rippleSize: PropTypes.number.isRequired,
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

    uncheckedThumbColor: grey400,
    uncheckedBarColor: 'rgba(255, 255, 255, 0.3)',

    disabledThumbColor: grey800,
    disabledBarColor: 'rgba(255, 255, 255, 0.1)',
  };
}
