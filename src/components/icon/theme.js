import { PropTypes } from 'react';

export const schema = PropTypes.shape({
  color: PropTypes.string,
  disabledColor: PropTypes.string,
});

export const defaultTheme = {
  color: 'var(iconColor)',
  disabledColor: 'var(disabledColor)',
};
