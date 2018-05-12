// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

export type Data = { animationName: string | null };

export default createSheet('Backdrop', (theme: Theme) => {
  return {
    '@keyframes Backdrop--animate-out': {
      from: {
        opacity: 1,
        transform: 'scale(1)',
      },

      '99%': { transform: 'scale(1)' },

      to: {
        opacity: 0,
        transform: 'scale(0)',
      },
    },

    '@keyframes Backdrop--animate-in': {
      from: {
        opacity: 0,
        transform: 'scale(1)',
      },

      to: {
        transform: 'scale(1)',
        opacity: 1,
      },
    },

    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.backdrop,
      zIndex: theme.zIndexes.backdrop,
      willChange: 'opacity',
      animationFillMode: 'forwards',
      animationDuration: 200,
      transform: 'scale(0)',
      opacity: 0,
      animationName(data: Data): string | null {
        return data.animationName;
      },
    },
  };
});
