import PropTypes from 'prop-types';
import {
  grey500,
  grey300,
  whiteIcons,
} from '../../styles/colors';

export const schema = PropTypes.shape({
  miniSize: PropTypes.number,
  normalSize: PropTypes.number,
  iconSize: PropTypes.number,

  elevation: PropTypes.number,
  focusedElevation: PropTypes.number,
  disabledElevation: PropTypes.number,

  iconColor: PropTypes.string,
  disabledIconColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  disabledBackgroundColor: PropTypes.string,
});

export const defaultTheme = {
  miniSize: 40,
  normalSize: 56,
  iconSize: 24,

  elevation: 1,
  focusedElevation: 4,
  disabledElevation: 0,

  iconColor: whiteIcons,
  disabledIconColor: grey500,
  bgColor: 'var(primaryBase)',
  disabledBgColor: grey300,
};
