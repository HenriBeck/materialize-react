// @flow strict-local

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

export type Data = {
  raised: boolean,
  disabled: boolean,
};

export default createSheet('Button', (theme: Theme) => {
  return {
    button: {
      userSelect: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxSizing: 'border-box',
      outline: 0,
      border: 0,
      borderRadius: 4,
      margin: '0 8px',
      height: 36,
      minWidth: 64,
      padding: '0 8px',
      color: (data: Data) => (
        data.raised && !data.disabled
          ? theme.primary.contrastTextColor
          : null
      ),
      cursor: (data: Data) => (data.disabled ? 'disabled' : 'pointer'),
      pointerEvents: (data: Data) => (data.disabled ? 'none' : 'auto'),
      boxShadow: (data: Data) => theme.elevation[data.raised && !data.disabled ? '2' : '0'],
      backgroundColor(data: Data) {
        if (data.disabled && data.raised) {
          return theme.divider;
        }

        return data.raised ? theme.primary.base : 'transparent';
      },
    },
  };
});
