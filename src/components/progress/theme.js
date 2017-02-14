import { PropTypes } from 'react';

import {
  grey300,
  grey500,
} from 'styles/colors';

export const schema = PropTypes.shape({
  barHeight: PropTypes.number,
  backgroundColor: PropTypes.string,
  barColor: PropTypes.string,
  disabledBarColor: PropTypes.string,
});

export const defaultTheme = {
  barHeight: 4,
  backgroundColor: grey300,
  barColor: 'var(primaryBase)',
  disabledBarColor: grey500,
};
