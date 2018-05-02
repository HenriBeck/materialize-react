// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/schema';

import { type Color } from '.';

type Data = {
  color: Color,
  typography: string,
};

function getColor(theme: Theme, color: Color): string {
  switch (color) {
    case 'secondary': return theme.text.secondary;
    case 'disabled': return theme.disabled;
    case 'hint': return theme.text.hint;
    case 'primary': return theme.primary.base;
    case 'accent': return theme.accent.base;
    case 'error': return theme.error;
    case 'text': return theme.text.primary;
    default: return 'inherit';
  }
}

export type { Data };

export default createSheet('Typography', (theme: Theme) => {
  return {
    typography(data: Data) {
      return {
        color: getColor(theme, data.color),
        ...theme.typography[data.typography],
      };
    },
  };
});
