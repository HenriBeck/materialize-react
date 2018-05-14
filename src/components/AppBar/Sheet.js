// @flow strict-local

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

export type Data = {
  tall: boolean,
  color: 'primary' | 'default',
};

export default createSheet('AppBar', (theme: Theme) => {
  return {
    appBar: {
      position: 'relative',
      width: '100%',
      padding: '0 16px',
      boxSizing: 'border-box',
      display: 'flex',
      zIndex: theme.zIndexes.appBar,
      height: (data: Data) => (data.tall ? 128 : 56),
      color(data: Data) {
        switch (data.color) {
          case 'primary': return theme.primary.contrastTextColor;
          case 'default': return 'inherit';
          default: return null;
        }
      },
      backgroundColor(data: Data) {
        switch (data.color) {
          case 'primary': return theme.primary.base;
          case 'default': return theme.appBar;
          default: return null;
        }
      },

      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -6,
        left: 0,
        right: 0,
        height: 6,
        boxShadow: 'inset 0 5px 6px -3px rgba(0, 0, 0, 0.4)',
      },
    },
  };
});
