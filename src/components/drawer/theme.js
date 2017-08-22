import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  drawerWidth: PropTypes.number.isRequired,
  backdropActiveOpacity: PropTypes.number.isRequired,
  backdropBgColor: PropTypes.string.isRequired,
  transitionDuration: PropTypes.number.isRequired,
  drawerBgColor: PropTypes.string.isRequired,
}).isRequired;

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
    drawerBgColor: '#ffffff',
    drawerZIndex: 3000,
    backdropZIndex: 1000,
  };
}
