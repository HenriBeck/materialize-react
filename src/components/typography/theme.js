import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  color: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
});

/**
 * Default theme for the typograpgy component.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    color: vars.textColor,
    secondaryColor: vars.secondaryTextColor,
  };
}
