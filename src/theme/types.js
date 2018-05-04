// @flow strict

import { type Elevations } from './elevation';
import { type Typography } from './typography';
import { type PrimaryColor } from './primary-colors';
import { type AccentColor } from './accent-colors';
import { type ZIndexes } from './z-indexes';
import { type Breakpoints } from './breakpoints';

export type ThemeType = 'light' | 'dark';
export type Theme = {
  type: ThemeType,

  icon: string,
  disabled: string,
  divider: string,

  statusBar: string,
  appBar: string,
  sheet: string,
  background: string,
  backdrop: string,

  error: string,

  text: {
    primary: string,
    secondary: string,
    hint: string,
  },

  typography: Typography,
  elevation: Elevations,
  primary: PrimaryColor,
  accent: AccentColor,
  zIndexes: ZIndexes,
  breakpoints: Breakpoints,
};
