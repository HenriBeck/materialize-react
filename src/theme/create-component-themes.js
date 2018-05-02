// @flow strict

import { type Theme } from './schema';

export default function createComponentThemes(theme: Theme) {
  return {
    slider: {
      color: theme.type === 'dark' ? '#5c5c5c' : '#c3c3c3',
      disabledColor: theme.type === 'dark' ? '#525252' : '#b6b6b6',
    },
  };
}
