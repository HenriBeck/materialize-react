// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/schema';
import { getActiveColor } from '../../theme/utils';

export type Data = {
  selected: boolean,
  disabled: boolean,
  color: 'primary' | 'accent',
};

export default createSheet('RadioButton', (theme: Theme): {} => {
  return {
    radioButton: {
      position: 'relative',
      boxSizing: 'border-box',
      margin: '20px 16px',
      height: 16,
      width: 16,
      outline: 0,
      cursor: (data: Data) => (data.disabled ? 'default' : 'pointer'),
      pointerEvents: (data: Data) => (data.disabled ? 'none' : 'auto'),
      color: (data: Data) => (
        data.selected
          ? getActiveColor(theme, data.color)
          : theme.text.secondary
      ),
    },

    border: {
      position: 'absolute',
      borderRadius: '50%',
      borderStyle: 'solid',
      boxSizing: 'border-box',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderWidth: 2,
      transition: 'border-color 200ms',

      borderColor(data: Data) {
        if (data.disabled) {
          return theme.disabled;
        }

        return data.selected ? getActiveColor(theme, data.color) : theme.text.secondary;
      },
    },

    circle: {
      position: 'absolute',
      borderRadius: '50%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transition: 'transform 200ms',
      backgroundColor: (data: Data) => getActiveColor(theme, data.color),
      transform: (data: Data) => `scale(${data.selected ? 0.5 : 0})`,
      borderColor: (data: Data) => (
        data.disabled
          ? theme.disabled
          : getActiveColor(theme, data.color)
      ),
    },

    ripple: {
      top: -16,
      left: -16,
      right: -16,
      bottom: -16,
    },
  };
});
