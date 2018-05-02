// @flow strict

import {
  oneOf,
  shape,
  string,
} from 'prop-types';

import {
  type Color,
  colors,
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

const schema = shape({
  color: oneOf(Object.keys(colors)).isRequired,
  light: string.isRequired,
  base: string.isRequired,
  dark: string.isRequired,

  contrastTextColor: string.isRequired,
  contrastIconColor: string.isRequired,
}).isRequired;

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

export {
  getAccentColors,
  schema,
};
