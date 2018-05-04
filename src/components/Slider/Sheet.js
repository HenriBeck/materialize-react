// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

export type Data = {
  disabled: boolean,
  value: number,
  isActive: boolean,
  thumbTransform: string,
  isFocused: boolean,
};

export default createSheet('Slider', (theme: Theme) => {
  const color = theme.type === 'dark' ? '#5c5c5c' : '#c3c3c3';
  const disabledColor = theme.type === 'dark' ? '#525252' : '#b6b6b6';

  return {
    slider: {
      display: 'inline-block',
      position: 'relative',
      width: '100%',
      height: 3,
      margin: '20px 15px',
      outline: 0,
      pointerEvents: (data: Data) => (data.disabled ? 'none' : 'auto'),
    },

    track: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: (data: Data) => (data.disabled ? disabledColor : color),

      '&::after': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        content: '""',
        transformOrigin: 'left center',
        transition: 'transform 100ms linear',

        backgroundColor: (data: Data) => (data.disabled ? 'transparent' : theme.primary.base),
        transform: (data: Data) => `scaleX(${data.value / 100})`,
      },
    },

    thumb: {
      boxSizing: 'border-box',
      position: 'absolute',
      width: 12,
      height: 12,
      top: -4.5,
      left: -11.5,
      border: 'solid 2px',
      borderRadius: '50%',
      cursor: 'drag',
      transition: 'transform 100ms linear',

      borderColor(data: Data) {
        if (data.disabled) {
          return disabledColor;
        }

        return data.isActive ? theme.primary.base : color;
      },
      backgroundColor(data: Data) {
        if (data.isActive) {
          return data.disabled ? disabledColor : theme.primary.base;
        }

        return 'transparent';
      },
      transform: (data: Data) => data.thumbTransform,

      '&::after': {
        position: 'absolute',
        content: '""',
        top: -10,
        left: -10,
        right: -10,
        bottom: -10,
        transition: 'opacity 140ms linear',
        borderRadius: '50%',
        backgroundColor: (data: Data) => (data.isActive ? theme.primary.base : theme.disabled),
        opacity: (data: Data) => (data.isFocused ? 0.25 : 0),
      },
    },
  };
});
