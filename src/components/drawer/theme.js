import { PropTypes } from 'react';

export const schema = PropTypes.shape({
  drawerWidth: PropTypes.number,
  scrimColor: PropTypes.string,
});

export const defaultTheme = {
  drawerWidth: 256,
  scrimColor: 'rgba(0, 0, 0, 0.5)',
};
