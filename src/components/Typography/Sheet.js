// @flow strict-local

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { type Typography as TypographyTheme } from '../../theme/typography';

import { type Color } from '.';

type Data = {
  color: Color,
  typography: $Keys<TypographyTheme>,
  truncate: boolean,
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

const truncate = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

export type { Data };

export default createSheet('Typography', (theme: Theme) => {
  return {
    typography(data: Data) {
      return {
        color: getColor(theme, data.color),
        ...data.truncate ? truncate : {},
        ...theme.typography[data.typography],
      };
    },
  };
});
