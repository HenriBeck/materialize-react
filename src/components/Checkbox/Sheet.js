// @flow strict-local

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';

export type Data = {
  disabled: boolean,
  checked: boolean,
  color: 'primary' | 'accent',
};

export default createSheet('Checkbox', (theme: Theme) => {
  return {
    checkbox: {
      display: 'inline-block',
      position: 'relative',
      borderRadius: '50%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      height: 48,
      width: 48,
      outline: 0,
      padding: 8,
      backgroundColor: 'inherit',
      cursor: (data: Data) => (data.disabled ? 'disabled' : 'pointer'),
      pointerEvents: (data: Data) => (data.disabled ? 'none' : 'auto'),
      color: (data: Data) => (
        data.checked
          ? getActiveColor(theme, data.color)
          : theme.text.secondary
      ),
    },

    icon: {
      position: 'absolute',
      top: 12,
      left: 12,
      right: 12,
      bottom: 12,
      color(data: Data) {
        if (data.disabled) {
          return theme.disabled;
        }

        return data.checked ? getActiveColor(theme, data.color) : theme.text.secondary;
      },
    },
  };
});
