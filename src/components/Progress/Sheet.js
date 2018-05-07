// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

export type Data = {
  indeterminate: boolean,
  progress: number,
  active: boolean,
};

export default createSheet('Progress', (theme: Theme): {} => {
  return {
    '@keyframes Progress--bar': {
      '0%': { transform: 'scaleX(1) translateX(-100%)' },
      '50%': { transform: 'scaleX(1) translateX(0%)' },
      '75%': {
        transform: 'scaleX(1) translateX(0%)',
        animationTimingFunction: 'cubic-bezier(.28, .62, .37, .91)',
      },
      '100%': { transform: 'scaleX(0) translateX(0%)' },
    },

    '@keyframes Progress--splitter': {
      '0%': { transform: 'scaleX(.75) translateX(-125%)' },
      '30%': {
        transform: 'scaleX(.75) translateX(-125%)',
        animationTimingFunction: 'cubic-bezier(.42, 0, .6, .8)',
      },
      '90%': { transform: 'scaleX(.75) translateX(125%)' },
      '100%': { transform: 'scaleX(.75) translateX(125%)' },
    },

    progress: {
      display: 'block',
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      height: 4,
      backgroundColor: theme.primary.light,
    },

    bar: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transition: 'transform 200ms',
      backgroundColor: theme.primary.base,
      animationIterationCount: 'infinite',
      zIndex: 1,
      animationDuration: 2 * 1000,

      transformOrigin: (data: Data) => (data.indeterminate ? 'right center' : 'left center'),
      transform: (data: Data) => `scaleX(${data.progress / 100})`,
      animationName: (data: Data) => (data.indeterminate && data.active ? 'Progress--bar' : null),

      '&::after': {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        content: '""',
        transformOrigin: 'center center',
        animationIterationCount: 'infinite',
        backgroundColor: theme.primary.light,
        animationDuration: 2 * 1000,

        height: (data: Data) => (data.indeterminate ? 4 : 0),
        animationName: (data: Data) => (
          data.indeterminate && data.active
            ? 'Progress--splitter'
            : null
        ),
      },
    },
  };
});
