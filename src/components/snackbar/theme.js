import PropTypes from 'prop-types';

import { whiteText } from '../../styles/colors';

export const schema = PropTypes.shape({
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  verticalPadding: PropTypes.number.isRequired,
  horizontalPadding: PropTypes.number.isRequired,
  mobileLeftButtonMargin: PropTypes.number.isRequired,
  desktopLeftButtonMargin: PropTypes.number.isRequired,
  desktopBorderRadius: PropTypes.number.isRequired,
  desktopMinWidth: PropTypes.number.isRequired,
  desktopMaxWidth: PropTypes.number.isRequired,
});

/**
 * Default theme for the snackbar component.
 *
 * @returns {Object} - Returns the theme.
 */
export function defaultTheme() {
  return {
    color: whiteText,
    backgroundColor: '#323232',
    height: 48,
    verticalPadding: 14,
    horizontalPadding: 24,
    mobileLeftButtonMargin: 24,
    desktopLeftButtonMargin: 48,
    desktopBorderRadius: 2,
    desktopMinWidth: 288,
    desktopMaxWidth: 568,
  };
}
