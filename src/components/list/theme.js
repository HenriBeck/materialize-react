import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  verticalPadding: PropTypes.number.isRequired,
  insetWidth: PropTypes.number.isRequired,

  item: PropTypes.shape({
    horizontalPadding: PropTypes.number.isRequired,
    oneLineVerticalPadding: PropTypes.number.isRequired,
    contentFontSize: PropTypes.number.isRequired,
    secondaryContentColor: PropTypes.string.isRequired,
    secondaryContentFontSize: PropTypes.number.isRequired,
    rightItemWidth: PropTypes.number.isRequired,
    multiLineVerticalPadding: PropTypes.number.isRequired,
  }).isRequired,

  subheader: PropTypes.shape({
    color: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
  }).isRequired,
}).isRequired;

/**
 * The default theme for the list component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme(vars) {
  return {
    verticalPadding: 8,
    insetWidth: 72,

    item: {
      horizontalPadding: 16,
      oneLineVerticalPadding: 16,
      contentFontSize: 16,
      secondaryContentColor: vars.secondaryTextColor,
      secondaryContentFontSize: 14,
      rightItemWidth: 24,
      multiLineVerticalPadding: 20,
    },

    subheader: {
      color: vars.secondaryTextColor,
      fontSize: 14,
    },
  };
}
