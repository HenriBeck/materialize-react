// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/schema';

type Data = { color: 'primary' | 'default' };

export default createSheet('StatusBar', (theme: Theme): { statusBar: {} } => {
  return {
    statusBar: {
      height: 24,
      width: '100%',
      backgroundColor(data: Data): string | null {
        switch (data.color) {
          case 'primary': return theme.primary.dark;
          case 'default': return theme.statusBar;
          default: return null;
        }
      },
      color(data: Data): string | null {
        switch (data.color) {
          case 'primary': return theme.primary.contrastTextColor;
          default: return null;
        }
      },
    },
  };
});
