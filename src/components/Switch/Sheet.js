// @flow strict

import { rgba } from 'polished';

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';
import { getColor } from '../../styles/colors';

export type Data = {
  disabled: boolean,
  toggled: boolean,
  color: 'primary' | 'accent',
};

export default createSheet('Switch', (theme: Theme) => {
  return {
    switch: {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'inline-block',
      height: 14,
      width: 36,
      margin: 17,
      outline: 0,
      cursor: (data: Data) => (data.disabled ? 'disabled' : 'pointer'),
      pointerEvents: (data: Data) => (data.disabled ? 'none' : 'auto'),
    },

    thumb: {
      position: 'absolute',
      left: 0,
      borderRadius: '50%',
      transitionProperty: 'transform, background-color',
      boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.6)',
      transitionDuration: 150,
      top: -3,
      height: 20,
      width: 20,
      transform: (data: Data) => `translateX(${data.toggled ? 16 : 0}px)`,
      color: (data: Data) => (data.toggled ? getActiveColor(theme, data.color) : null),
      backgroundColor(data: Data) {
        if (data.disabled) {
          return theme.type === 'dark' ? getColor('grey', '800') : getColor('grey', '400');
        } else if (data.toggled) {
          return getActiveColor(theme, data.color);
        }

        return theme.type === 'dark' ? getColor('grey', '400') : getColor('grey', '50');
      },
    },

    track: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      transitionProperty: 'background-color',
      transitionDuration: 150,
      borderRadius: 7,
      backgroundColor(data: Data) {
        if (data.disabled) {
          return theme.divider;
        }

        return data.toggled ? rgba(getActiveColor(theme, data.color), 0.5) : theme.disabled;
      },
    },

    ripple: {
      top: -14,
      left: -14,
      right: -14,
      bottom: -14,
    },
  };
});
