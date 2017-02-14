import { PropTypes } from 'react';

export const schema = PropTypes.shape({
  radius: PropTypes.number,
  strokeWidth: PropTypes.number,
  arcsize: PropTypes.number,
  arctime: PropTypes.number,
  arcStartRotate: PropTypes.number,
  layer1: PropTypes.string,
  layer2: PropTypes.string,
  layer3: PropTypes.string,
  layer4: PropTypes.string,
});

export const defaultTheme = {
  radius: 12.5,
  strokeWidth: 3,
  arcsize: 270,
  arctime: 1333,
  arcStartRotate: 216,
  layer1: 'var(primaryBase)',
  layer2: 'var(primaryBase)',
  layer3: 'var(primaryBase)',
  layer4: 'var(primaryBase)',
};
