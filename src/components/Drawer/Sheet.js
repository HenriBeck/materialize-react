// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

export type Data = {
  width: number,
  position: 'left' | 'right',
  isNarrow: boolean,
  isOpen: boolean,
};

export default createSheet('Drawer', (theme: Theme) => {
  return {
    drawer: {
      position: 'relative',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    },

    drawerContent: {
      height: '100%',
      display: 'inline',
      position: 'absolute',
      backgroundColor: theme.sheet,
      top: 0,
      bottom: 0,
      transition: 'transform 160ms',
      zIndex: theme.zIndexes.drawer,
      width: (data: Data) => data.width,
      left: (data: Data) => (data.position === 'left' ? -data.width : 'auto'),
      right: (data: Data) => (data.position === 'left' ? 'auto' : -data.width),
      boxShadow: (data: Data) => (data.isNarrow && data.isOpen ? theme.elevation['16'] : 'none'),
      transform(data: Data) {
        if (!data.isNarrow || data.isOpen) {
          return `translateX(${data.position === 'left' ? 100 : -100}%)`;
        }

        return 'translateX(0)';
      },
    },

    mainContent: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      padding(data: Data) {
        if (data.isNarrow) {
          return 0;
        }

        switch (data.position) {
          case 'left': return `0 0 0 ${data.width}px`;
          case 'right': return `0 ${data.width}px 0 0`;
          default: return 0;
        }
      },
    },
  };
});
