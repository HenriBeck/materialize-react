import PropTypes from 'prop-types';

import { grey100 } from '../../styles/colors';

export const schema = PropTypes.shape({
  height: PropTypes.number,
  bgColor: PropTypes.string,
});

export const defaultTheme = {
  height: 64,
  bgColor: grey100,
};
