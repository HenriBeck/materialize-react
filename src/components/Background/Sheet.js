// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/schema';

export default createSheet('Background', (theme: Theme): { background: {} } => {
  return {
    background: {
      color: theme.text.primary,
      backgroundColor: theme.background,
      ...theme.typography.body,

      '& *': { WebkitTapHighlightColor: 'transparent' },
    },
  };
});
