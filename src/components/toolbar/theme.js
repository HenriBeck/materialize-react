import { PropTypes } from 'react';

import { grey100 } from '/src/styles/colors';

export const schema = PropTypes.shape({
  height: PropTypes.number,
  bgColor: PropTypes.string,
});

export const defaultTheme = {
  height: 64,
  bgColor: grey100,
};
