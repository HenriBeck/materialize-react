// @flow strict

import { type Theme } from './schema';

export function getActiveColor(theme: Theme, color: 'primary' | 'accent'): string {
  switch (color) {
    case 'primary': return theme.primary.base;
    case 'accent': return theme.accent.base;
    default: return '';
  }
}
