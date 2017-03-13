import { PropTypes } from 'react';

export const schema = PropTypes.shape({
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  rippleColor: PropTypes.string,
});

export const defaultTheme = {
  activeColor: 'var(textColor)',
  inactiveColor: 'var(secondaryTextColor)',
  rippleColor: 'var(primaryBase)',
};
