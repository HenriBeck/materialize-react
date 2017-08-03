import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  drawerWidth: PropTypes.number.isRequired,
  backdropActiveOpacity: PropTypes.number,
  backdropBgColor: PropTypes.string,
  transitionDuration: PropTypes.number,
});

/**
 * The default theme for the drawer component.
 *
 * @private
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme() {
  return {
    drawerWidth: 256,
    backdropActiveOpacity: 0.5,
    backdropBgColor: '#000000',
    transitionDuration: 250,
  };
}
