// @flow strict-local

import { type Theme } from './types';

export function getActiveColor(theme: Theme, color: 'primary' | 'accent'): string {
  switch (color) {
    case 'primary': return theme.primary.base;
    case 'accent': return theme.accent.base;
    default: return '';
  }
}
