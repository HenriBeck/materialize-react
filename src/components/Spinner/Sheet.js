// @flow strict-local

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';

type Data = {
  animationName: string | null,
  color: 'primary' | 'accent',
};

const CONTAINER_ROTATION_DURATION = 1568;
const FULL_CYCLE_DURATION = 5332;
const EXPAND_CONTRACT_DURATION = 1333;

export type { Data };

export default createSheet('Spinner', (theme: Theme) => {
  return {
    '@keyframes Spinner--fade-in': {
      from: {
        opacity: 0,
        animationPlayState: 'running',
      },

      to: { opacity: 1 },
    },

    '@keyframes Spinner--fade-out': {
      from: { opacity: 1 },

      to: {
        opacity: 0,
        animationPlayState: 'paused',
      },
    },

    '@keyframes Spinner--container-rotate': { to: { transform: 'rotate(360deg)' } },

    '@keyframes Spinner--fill-unfill-rotate': {
      '12.5%': { transform: 'rotate(135deg)' },
      '25%': { transform: 'rotate(270deg)' },
      '37.5%': { transform: 'rotate(405deg)' },
      '50%': { transform: 'rotate(540deg)' },
      '62.5%': { transform: 'rotate(675deg)' },
      '75%': { transform: 'rotate(810deg)' },
      '87.5%': { transform: 'rotate(945deg)' },
      '100%': { transform: 'rotate(1080deg)' },
    },

    '@keyframes Spinner--left-spin': {
      '0%': { transform: 'rotate(130deg)' },
      '50%': { transform: 'rotate(-5deg)' },
      '100%': { transform: 'rotate(130deg)' },
    },

    '@keyframes Spinner--right-spin': {
      '0%': { transform: 'rotate(-130deg)' },
      '50%': { transform: 'rotate(5deg)' },
      '100%': { transform: 'rotate(-130deg)' },
    },

    spinner: {
      display: 'inline-block',
      position: 'relative',
      width: 64,
      height: 64,
      padding: 8,
      boxSizing: 'border-box',
      animationFillMode: 'forwards',
      animationDuration: 140,
      opacity: 0,
      animationName: (data: Data) => data.animationName,
    },

    container: {
      width: '100%',
      height: '100%',
      direction: 'ltr',
      animationDuration: CONTAINER_ROTATION_DURATION,
      animationIterationCount: 'infinite',
      animationName: 'Spinner--container-rotate',
      animationPlayState: 'inherit',
    },

    layer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      whiteSpace: 'nowrap',
      animationTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      animationIterationCount: 'infinite',
      animationDuration: FULL_CYCLE_DURATION,
      animationName: 'Spinner--fill-unfill-rotate',
      borderColor: (data: Data) => getActiveColor(theme, data.color),

      '&::after': {
        content: '""',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        borderColor: 'inherit',
        borderRadius: '50%',
        left: '45%',
        width: '10%',
        borderTopStyle: 'solid',
        borderWidth: 4,
      },
    },

    clipper: {
      display: 'inline-block',
      position: 'relative',
      width: '50%',
      height: '100%',
      overflow: 'hidden',
      borderColor: 'inherit',

      '&::after': {
        content: '""',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        borderColor: 'inherit',
        borderRadius: '50%',
        bottom: 0,
        width: '200%',
        borderStyle: 'solid',
        borderBottomColor: 'transparent',
        animationTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        animationIterationCount: 'infinite',
        borderWidth: 4,
        animationDuration: EXPAND_CONTRACT_DURATION,
      },
    },

    clipperLeft: {
      composes: '$clipper',

      '&::after': {
        left: 0,
        borderRightColor: 'transparent',
        transform: 'rotate(129deg)',
        animationName: 'Spinner--left-spin',
      },
    },

    clipperRight: {
      composes: '$clipper',

      '&::after': {
        left: '-100%',
        borderLeftColor: 'transparent',
        transform: 'rotate(-129deg)',
        animationName: 'Spinner--right-spin',
      },
    },
  };
});
