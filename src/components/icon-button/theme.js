import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  size: PropTypes.number,
  margin: PropTypes.number,
  iconSize: PropTypes.number,
});

export const defaultTheme = {
  size: 48,
  margin: 4,
  iconSize: 24,
};
