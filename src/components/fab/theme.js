import { PropTypes } from 'react';
import {
  grey500,
  grey300,
} from 'styles/colors';

export const schema = PropTypes.shape({
  miniSize: PropTypes.number,
  normalSize: PropTypes.number,
  iconSize: PropTypes.number,

  iconColor: PropTypes.string,
  disabledIconColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  disabledBackgroundColor: PropTypes.string,
});

export const defaultTheme = {
  miniSize: 40,
  normalSize: 56,
  iconSize: 24,
  iconColor: 'var(iconColor)',
  disabledIconColor: grey500,
  backgroundColor: 'var(primaryBase)',
  disabledBackgroundColor: grey300,
};
