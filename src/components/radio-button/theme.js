import { PropTypes } from 'react';

export const schema = PropTypes.shape({
  rippleSize: PropTypes.number,
  circleSize: PropTypes.number,
  borderDistance: PropTypes.number,
  borderWidth: PropTypes.number,
  padding: PropTypes.number,

  onColor: PropTypes.string,
  offColor: PropTypes.string,
  disabledColor: PropTypes.string,
});

export const defaultTheme = {
  rippleSize: 40,
  circleSize: 8,
  borderDistance: 2,
  borderWidth: 2,
  padding: 4,

  onColor: 'var(primaryBase)',
  offColor: 'var(secondaryTextColor)',
  disabledColor: 'var(disabledColor)',
};
