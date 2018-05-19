// @flow strict-local

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

export default createSheet('Background', (theme: Theme): { background: {} } => {
  return {
    background: {
      color: theme.text.primary,
      backgroundColor: theme.background,
      ...theme.typography.body1,

      '& *': { WebkitTapHighlightColor: 'transparent' },
    },
  };
});
