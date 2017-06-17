import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  size: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  iconSize: PropTypes.number.isRequired,
});

/**
 * The default theme for the icon button component.
 *
 * @private
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme() {
  return {
    size: 48,
    margin: 4,
    iconSize: 24,
  };
}
