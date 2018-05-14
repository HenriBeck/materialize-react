// @flow strict-local

// Styles
import createSheet from './styles/create-sheet';
import { colors } from './styles/colors';
import * as breakpoints from './utils/breakpoints'; // eslint-disable-line import/no-namespace
import * as utils from './utils/react'; // eslint-disable-line import/no-namespace
import { createTheme } from './theme';
import { type Theme as ThemeType } from './theme/types';

export * from './components';

export type { ThemeType };

export {
  // Styles
  createSheet,
  colors,
  utils,
  breakpoints,
  createTheme,
};
