// @flow strict

import merge from 'lodash.merge';

import {
  type Color,
  getColor,
} from '../styles/colors';

import schema, {
  type ThemeType,
  type Theme,
} from './schema';
import { getPrimaryColors } from './primary-colors';
import { getAccentColors } from './accent-colors';
import { defaultTypography } from './typography';
import { defaultElevations } from './elevation';
import { defaultZIndexes } from './z-indexes';
import { defaultBreakpoints } from './breakpoints';
import createComponentThemes from './create-component-themes';

type ThemeOptions = {
  type: ThemeType,
  primary: Color,
  accent: Color,
};

const themes = {
  light: {
    statusBar: getColor('grey', '300'),
    appBar: getColor('grey', '100'),
    sheet: '#ffffff',
    background: getColor('grey', '50'),
    backdrop: 'rgba(0, 0, 0, 0.56)',

    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },

    icon: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    divider: 'rgba(0, 0, 0, 0.12)',

    error: getColor('red', '500'),
  },

  dark: {
    statusBar: '#000000',
    appBar: getColor('grey', '900'),
    sheet: getColor('grey', '800'),
    background: '#303030',
    backdrop: 'rgba(0, 0, 0, 0.56)',

    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      hint: 'rgba(255, 255, 255, 0.3)',
    },

    icon: '#ffffff',
    disabled: 'rgba(255, 255, 255, 0.3)',
    divider: 'rgba(255, 255, 255, 0.12)',

    error: getColor('red', '500'),
  },
};

function createTheme({
  type,
  primary,
  accent,
}: ThemeOptions, theme?: {} = {}): Theme {
  const baseTheme = {
    zIndexes: defaultZIndexes,
    typography: defaultTypography,
    elevation: defaultElevations,
    breakpoints: defaultBreakpoints,

    type,

    ...themes[type],
    primary: getPrimaryColors(primary),
    accent: getAccentColors(accent),
  };

  return merge({}, baseTheme, { components: createComponentThemes(baseTheme) }, theme);
}

export {
  createTheme,
  themes,
  schema,
};
