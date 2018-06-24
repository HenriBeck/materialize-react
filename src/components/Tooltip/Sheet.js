// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

import { type Position } from '.';

export type Data = {
  position: Position,
};

export default createSheet('Tooltip', (theme: Theme) => {
  return {
    container: {
      position: 'relative',
      boxSizing: 'border-box',
    },

    tooltip: {
      position: 'absolute',
      height: 24,
      transform: 'scale, opacity',
      top(data: Data) {
        switch (data.position) {
          case 'top-start': return 24;
          case 'top': return 24;
          case 'top-end': return 24;
          case 'right-start': return 0;
          case 'left-start': return 0;
          default: return null;
        }
      },
      left(data: Data) {
        switch (data.position) {
          case 'left-start': return '100%';
          case 'left': return '100%';
          case 'left-end': return '100%';
          case 'top-start': return 0;
          case 'bottom-start': return 0;
          default: return null;
        }
      },
      right(data: Data) {
        switch (data.position) {
          case 'right-start': return '100%';
          case 'right': return '100%';
          case 'right-end': return '100%';
          case 'top-end': return 0;
          case 'bottom-end': return 0;
          default: return null;
        }
      },
      bottom(data: Data) {
        switch (data.position) {
          case 'bottom-start': return 24;
          case 'bottom': return 24;
          case 'bottom-end': return 24;
          case 'right-end': return 0;
          case 'left-end': return 0;
          default: return null;
        }
      },
      transitionOrigin(data: Data) {
        const position = data.position.split('-')[0];

        switch (position) {
          case 'top': return 'center bottom';
          case 'left': return 'right center';
          case 'right': return 'left center';
          case 'bottom': return 'center top';
          default: return null;
        }
      },
    },
  };
});
