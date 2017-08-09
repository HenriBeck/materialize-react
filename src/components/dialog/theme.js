import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  backgroundColor: PropTypes.string.isRequired,
  backdropColor: PropTypes.string.isRequired,
});

/**
 * The default theme for the modal component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    backgroundColor: '#ffffff',
    backdropColor: 'rgba(0, 0, 0, 0.4)',
    padding: 24,
    transitionDuration: vars.transitionTime,
    zIndex: 500,
    elevation: 6,
  };
}
