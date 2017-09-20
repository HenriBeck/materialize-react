import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  backgroundColor: PropTypes.string.isRequired,
  backdropColor: PropTypes.string.isRequired,
});

/**
 * The default theme for the dialog component.
 *
 * @private
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme() {
  return {
    backgroundColor: '#ffffff',
    backdropColor: 'rgba(0, 0, 0, 0.4)',
    padding: 24,
    animationDuration: 280,
    zIndex: 2000,
    elevation: 24,
    borderRadius: 2,

    headerBottomPadding: 20,
    contentBottomPadding: 24,
    buttonPadding: 8,
  };
}
