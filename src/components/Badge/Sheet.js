// @flow strict-local

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';

export type Data = { color: 'primary' | 'accent' };

export default createSheet('Badge', (theme: Theme) => {
  return {
    container: {
      position: 'relative',
      display: 'inline',
      boxSizing: 'border-box',
    },

    badge: {
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 20,
      height: 20,
      top: -10,
      right: -10,
      borderRadius: '50%',
      lineHeight: 1,
      fontSize: 11,
      userSelect: 'none',
      backgroundColor: (data: Data) => getActiveColor(theme, data.color),
      color(data: Data) {
        switch (data.color) {
          case 'primary': return theme.primary.contrastTextColor;
          case 'accent': return theme.accent.contrastTextColor;
          default: return '';
        }
      },
    },
  };
});
