// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';

export type Data = { color: 'accent' | 'primary' };

export default createSheet('Fab', (theme: Theme) => {
  return {
    fab: {
      zIndex: theme.zIndexes.fab,
      boxShadow: theme.elevation['6'],
      backgroundColor: (data: Data) => getActiveColor(theme, data.color),
      color(data: Data) {
        switch (data.color) {
          case 'primary': return theme.primary.contrastIconColor;
          case 'accent': return theme.accent.contrastIconColor;
          default: return '';
        }
      },
    },

    icon: { color: 'inherit' },
  };
});
