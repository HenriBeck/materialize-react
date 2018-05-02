// @flow strict

import {
  shape,
  string,
} from 'prop-types';

import {
  type Elevations,
  schema as elevation,
} from './elevation';
import {
  type Typography,
  schema as typography,
} from './typography';
import {
  type PrimaryColor,
  schema as primary,
} from './primary-colors';
import {
  type AccentColor,
  schema as accent,
} from './accent-colors';
import {
  type ZIndexes,
  schema as zIndexes,
} from './z-indexes';
import {
  type Breakpoints,
  schema as breakpoints,
} from './breakpoints';

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

export default {
  text: shape({
    primary: string.isRequired,
    secondary: string.isRequired,
    hint: string.isRequired,
  }).isRequired,

  icon: string.isRequired,
  disabled: string.isRequired,
  divider: string.isRequired,

  statusBar: string.isRequired,
  appBar: string.isRequired,
  sheet: string.isRequired,
  background: string.isRequired,

  error: string.isRequired,

  typography,
  elevation,
  primary,
  accent,
  zIndexes,
  breakpoints,
};
