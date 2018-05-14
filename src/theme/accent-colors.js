// @flow strict-local

import {
  type Color,
  getColor,
} from '../styles/colors';
import { getContrastColor } from '../styles/utils';

import { themes } from '.';

type AccentColor = {
  color: Color,
  light: string,
  base: string,
  dark: string,

  contrastTextColor: string,
  contrastIconColor: string,
};

function getAccentColors(accentColor: Color): AccentColor {
  return {
    color: accentColor,
    light: getColor(accentColor, 'a100'),
    base: getColor(accentColor, 'a400'),
    dark: getColor(accentColor, 'a700'),

    contrastTextColor: getContrastColor({
      background: getColor(accentColor, 'a400'),
      lightColor: themes.dark.text.primary,
      darkColor: themes.light.text.primary,
    }),

    contrastIconColor: getContrastColor({
      background: getColor(accentColor, 'a400'),
      lightColor: themes.dark.icon,
      darkColor: themes.light.icon,
    }),
  };
}

export type { AccentColor };

export { getAccentColors };
