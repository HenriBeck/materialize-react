import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
});

export const defaultTheme = {
  height: 1,
  backgroundColor: 'var(dividerColor)',
};
