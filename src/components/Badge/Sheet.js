// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';

export type Data = { color: 'primary' | 'accent' };

export default createSheet('Badge', (theme: Theme): { badge: {} } => {
  return {
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
      backgroundColor(data: Data): string {
        return getActiveColor(theme, data.color);
      },
      color(data: Data): string {
        switch (data.color) {
          case 'primary': return theme.primary.contrastTextColor;
          case 'accent': return theme.accent.contrastTextColor;
          default: return '';
        }
      },
    },
  };
});
