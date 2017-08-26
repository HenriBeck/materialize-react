import PropTypes from 'prop-types';

import { whiteText } from '../../styles/colors';

export const schema = PropTypes.shape({
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
}).isRequired;

/**
 * The default theme for the badge component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    size: 20,
    color: whiteText,
    backgroundColor: vars.primaryBase,
  };
}
