// @flow strict

import {
  oneOf,
  shape,
  string,
} from 'prop-types';

import { getContrastColor } from '../styles/utils';
import {
  type Color,
  colors,
  getColor,
} from '../styles/colors';

import { themes } from '.';

type PrimaryColor = {
  color: Color,
  base: string,
  light: string,
  dark: string,

  contrastTextColor: string,
  contrastIconColor: string,
};

const schema = shape({
  color: oneOf(Object.keys(colors)).isRequired,
  base: string.isRequired,
  light: string.isRequired,
  dark: string.isRequired,

  contrastTextColor: string.isRequired,
  contrastIconColor: string.isRequired,
}).isRequired;

function getPrimaryColors(primaryColor: Color): PrimaryColor {
  return {
    color: primaryColor,
    light: getColor(primaryColor, '100'),
    base: getColor(primaryColor, '500'),
    dark: getColor(primaryColor, '700'),

    contrastTextColor: getContrastColor({
      background: getColor(primaryColor, '500'),
      lightColor: themes.dark.text.primary,
      darkColor: themes.light.text.primary,
    }),

    contrastIconColor: getContrastColor({
      background: getColor(primaryColor, '500'),
      lightColor: themes.dark.icon,
      darkColor: themes.light.icon,
    }),
  };
}

export type { PrimaryColor };

export {
  getPrimaryColors,
  schema,
};
