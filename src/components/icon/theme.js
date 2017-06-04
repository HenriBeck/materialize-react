import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  color: PropTypes.string,
  disabledColor: PropTypes.string,
});

export function defaultTheme(vars) {
  return {
    color: vars.iconColor,
    disabledColor: vars.disabledColor,
  };
}
