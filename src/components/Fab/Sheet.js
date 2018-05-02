// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/schema';
import { getActiveColor } from '../../theme/utils';

export type Data = { color: 'accent' | 'primary' };

export default createSheet('FAB', (theme: Theme) => {
  return {
    fab: {
      zIndex: theme.zIndexes.fab,
      boxShadow: theme.elevation['6'],
      transition: 'box-shadow 140ms linear',
      backgroundColor: (data: Data) => getActiveColor(theme, data.color),
      color(data: Data) {
        switch (data.color) {
          case 'primary': return theme.primary.contrastIconColor;
          case 'accent': return theme.accent.contrastIconColor;
          default: return '';
        }
      },

      '&:hover': { boxShadow: theme.elevation['12'] },
    },

    icon: { color: 'inherit' },
  };
});
