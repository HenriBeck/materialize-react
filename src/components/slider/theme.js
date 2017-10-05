import PropTypes from 'prop-types';

import { grey500, grey400 } from '../../styles/colors';

export const schema = PropTypes.shape({
  thumbActiveColor: PropTypes.string.isRequired,
  trackActiveColor: PropTypes.string.isRequired,

  thumbBorderColor: PropTypes.string.isRequired,
  trackColor: PropTypes.string.isRequired,

  focusedThumbBorderColor: PropTypes.string.isRequired,
  focusedTrackColor: PropTypes.string.isRequired,

  disabledThumbColor: PropTypes.string.isRequired,
  disabledTrackColor: PropTypes.string.isRequired,
}).isRequired;

/**
 * Default theme for the spinner.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    thumbActiveColor: vars.primaryBase,
    trackActiveColor: vars.primaryBase,

    thumbBorderColor: grey400,
    trackColor: grey400,

    focusedThumbBorderColor: grey500,
    focusedTrackColor: grey500,

    disabledThumbColor: grey400,
    disabledTrackColor: grey400,
  };
}
