// @flow strict-local

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

export type Data = { color: 'primary' | 'default' };

export default createSheet('StatusBar', (theme: Theme) => {
  return {
    statusBar: {
      height: 24,
      width: '100%',
      backgroundColor(data: Data) {
        switch (data.color) {
          case 'primary': return theme.primary.dark;
          case 'default': return theme.statusBar;
          default: return null;
        }
      },
      color(data: Data) {
        switch (data.color) {
          case 'primary': return theme.primary.contrastTextColor;
          default: return null;
        }
      },
    },
  };
});
