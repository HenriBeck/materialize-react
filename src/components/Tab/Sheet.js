// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';

export type Data = {
  style: 'text' | 'icons' | 'text-and-icons',
  color: 'primary' | 'accent',
  isSelected: boolean,
};

export default createSheet('Tab', (theme: Theme) => {
  return {
    tab: {
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      minWidth: 160,
      maxWidth: 264,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      boxSizing: 'border-box',
      height: (data: Data) => (data.style === 'text-and-icons' ? 72 : 48),
      padding: (data: Data) => (data.style === 'text-and-icons' ? '0 16px' : '0 12px'),
    },

    text: {
      textTransform: 'uppercase',
      textAlign: 'center',
      lineHeight: 1,
      padding: (data: Data) => (data.style === 'text-and-icons' ? '10px 0 16px 0' : '0 0 20px 0'),
    },

    icon: {
      height: 24,
      width: 24,
      fontSize: 24,
      padding: (data: Data) => (data.style === 'text-and-icons' ? '0' : '0 0 12px 0'),
      color(data: Data) {
        if (data.style === 'icons') {
          return data.isSelected ? getActiveColor(theme, data.color) : null;
        }

        return data.isSelected ? theme.icon : theme.disabled;
      },
    },

    ripple: { color: (data: Data) => getActiveColor(theme, data.color) },
  };
});
