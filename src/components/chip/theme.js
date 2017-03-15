import { PropTypes } from 'react';

import { grey300 } from '/src/styles/colors';

export const schema = PropTypes.shape({
  bgColor: PropTypes.string,
  color: PropTypes.string,
  focusedElevation: PropTypes.number,
});

export const defaultTheme = {
  bgColor: grey300,
  color: 'var(textColor)',
  focusedElevation: 2,
  imgColor: 'var(textColor)',
};
