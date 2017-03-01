import { PropTypes } from 'react';

export const schema = PropTypes.shape({
  bgColor: PropTypes.string,
  color: PropTypes.string,
});

export const defaultTheme = {
  bgColor: 'rgba(255, 255, 255, 0.15)',
  color: 'var(textColor)',
};
