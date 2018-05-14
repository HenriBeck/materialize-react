// @flow strict-local

import createSheet from '../../styles/create-sheet';
import { getContrastColor } from '../../styles/utils';
import { type Theme } from '../../theme/types';

export type Data = {
  size: string | number,
  type: 'img',
} | {
  size: string | number,
  type: 'name',
  bgColor: string,
};

export default createSheet('Avatar', (theme: Theme) => {
  return {
    avatar: {
      borderRadius: '50%',
      textAlign: 'center',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: (data: Data) => data.size,
      width: (data: Data) => data.size,
      backgroundColor: (data: Data) => (data.type === 'img' ? theme.disabled : data.bgColor),
      color: (data: Data) => (
        data.type === 'name' ? getContrastColor({
          background: data.bgColor,
          lightColor: '#ffffff',
          darkColor: 'rgba(0, 0, 0, 0.87)',
        }) : null
      ),
    },
  };
});
