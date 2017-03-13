import { PropTypes } from 'react';

export const schema = PropTypes.shape({
  barHeight: PropTypes.number,
  backgroundColor: PropTypes.string,
  barColor: PropTypes.string,
});

export const defaultTheme = {
  barHeight: 4,
  bgColor: 'var(primaryLight)',
  barColor: 'var(primaryBase)',
};
