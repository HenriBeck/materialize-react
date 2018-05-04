// @flow strict

import createSheet from '../../styles/create-sheet';
import { getActiveColor } from '../../theme/utils';
import { type Theme } from '../../theme/types';

export type Data = {
  transform: string | null,
  color: 'primary' | 'accent',
};

export default createSheet('Tabs', (theme: Theme): {} => {
  return {
    tabs: {
      display: 'inline-flex',
      position: 'relative',
      outline: 0,
    },

    bar: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 2,
      transformOrigin: 'left center',
      transition: 'transform 300ms',
      backgroundColor: (data: Data) => getActiveColor(theme, data.color),
      transform: (data: Data) => data.transform,
    },
  };
});
