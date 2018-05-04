// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

export type Data = {
  raised: boolean,
  disabled: boolean,
};

export default createSheet('Button', (theme: Theme): { button: {} } => {
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
      borderRadius: 2,
      margin: '0 8px',
      height: 36,
      minWidth: 88,
      padding: '0 8px',

      color(data: Data): string | null {
        return data.raised && !data.disabled ? theme.primary.contrastTextColor : null;
      },
      cursor(data: Data): string {
        return data.disabled ? 'disabled' : 'pointer';
      },
      pointerEvents(data: Data): string {
        return data.disabled ? 'none' : 'auto';
      },
      boxShadow(data: Data): string {
        return data.raised && !data.disabled ? theme.elevation['2'] : 'none';
      },
      backgroundColor(data: Data): string {
        if (data.disabled && data.raised) {
          return theme.divider;
        }

        return data.raised ? theme.primary.base : 'transparent';
      },
    },
  };
});
