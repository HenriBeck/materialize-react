import { PropTypes } from 'react';

import { grey800 } from '/src/styles/colors';

export const schema = PropTypes.shape({
  bgColor: PropTypes.string,
  labelValueColor: PropTypes.string,
});

export const defaultTheme = {
  bgColor: grey800,
  labelValueColor: 'var(secondaryTextColor)',
};
