// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { themes } from '../../theme';

export type Data = {
  size: string | number,
  disabled: boolean,
  color: 'light' | 'dark' | null,
};

export default createSheet('Icon', (theme: Theme) => {
  return {
    icon: {
      lineHeight: 1,
      fontSize: (data: Data) => data.size,
      color(data: Data) {
        const type = data.color ? data.color : theme.type;

        return data.disabled ? themes[type].disabled : themes[type].icon;
      },
    },
  };
});
