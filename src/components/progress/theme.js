import PropTypes from 'prop-types';

import {
  grey300,
  grey500,
} from '../../styles/colors';

export const schema = PropTypes.shape({
  barHeight: PropTypes.number.isRequired,
  transitionTime: PropTypes.number.isRequired,
  indeterminateDuration: PropTypes.number.isRequired,
  fullAnimationDuration: PropTypes.number.isRequired,

  backgroundColor: PropTypes.string.isRequired,
  primaryBarColor: PropTypes.string.isRequired,
  secondaryBarColor: PropTypes.string.isRequired,

  primaryDisabledBarColor: PropTypes.string.isRequired,
  secondaryDisabledBarColor: PropTypes.string.isRequired,
}).isRequired;

/**
 * Default theme for the progress component.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    barHeight: 4,
    transitionTime: vars.transitionTime,
    indeterminateDuration: 2 * 1000,
    fullAnimationDuration: 600,

    backgroundColor: grey300,
    primaryBarColor: vars.primaryBase,
    secondaryBarColor: vars.primaryLight,

    primaryDisabledBarColor: grey500,
    secondaryDisabledBarColor: grey300,
  };
}
