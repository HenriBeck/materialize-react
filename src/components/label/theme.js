import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  typo: PropTypes.string,
  color: PropTypes.string,
  disabledColor: PropTypes.string,
});

export const defaultTheme = {
  typo: 'body1',
  color: 'var(textColor)',
  disabledColor: 'var(secondaryTextColor)',
};
