import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  radius: PropTypes.number,
  strokeWidth: PropTypes.number,
  arcsize: PropTypes.number,
  arctime: PropTypes.number,
  arcStartRotate: PropTypes.number,
  color: PropTypes.string,
});

export const defaultTheme = {
  radius: 12.5,
  strokeWidth: 3,
  arcsize: 270,
  arctime: 1333,
  arcStartRotate: 216,
  color: 'var(primaryBase)',
};
