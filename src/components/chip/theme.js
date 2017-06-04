import PropTypes from 'prop-types';

import { grey300 } from '../../styles/colors';

export const schema = PropTypes.shape({
  bgColor: PropTypes.string,
  color: PropTypes.string,
  focusedElevation: PropTypes.number,
});

export function defaultTheme(vars) {
  return {
    bgColor: grey300,
    height: 32,
    color: vars.textColor,
    focusedElevation: 2,
    imgColor: vars.textColor,

    transitionTime: vars.transitionTime,

    deleteIconSize: 24,
    deleteIconFontSize: 12,
  };
}
