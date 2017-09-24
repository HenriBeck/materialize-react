import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  borderRadius: PropTypes.number.isRequired,
  elevation: PropTypes.number.isRequired,
  gutter: PropTypes.number.isRequired,
  tabletGutter: PropTypes.number.isRequired,
  desktopGutter: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,

  content: PropTypes.shape({
    horizontalPadding: PropTypes.number.isRequired,
    tabletHorizontalPadding: PropTypes.number.isRequired,
    verticalMargin: PropTypes.number.isRequired,
    bottomMarginForLastChild: PropTypes.number.isRequired,
  }).isRequired,

  header: PropTypes.shape({
    avatarSize: PropTypes.number.isRequired,
    avatarMarginRight: PropTypes.number.isRequired,
    subtitleColor: PropTypes.string.isRequired,
  }).isRequired,
}).isRequired;

/**
 * Default theme for the card component.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    elevation: 4,
    gutter: 8,
    tabletGutter: 16,
    desktopGutter: 24,

    content: {
      horizontalPadding: 16,
      tabletHorizontalPadding: 24,
      verticalMargin: 16,
      bottomMarginForLastChild: 24,
    },

    header: {
      avatarSize: 40,
      avatarMarginRight: 16,
      subtitleColor: vars.secondaryTextColor,
    },
  };
}
