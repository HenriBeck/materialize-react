// @flow strict

import { mergeClassNames } from '../utils/react';

type DecomposedColor = {
  type: string,
  values: $ReadOnlyArray<number>,
};
type Classes = { [key: string]: string };

/**
 * Convert a hex color to an rgb color.
 *
 * @param {String} color - The hex color.
 * @returns {String} - Returns the rgb color.
 */
function convertHexToRGB(color: string): string {
  if (!color.startsWith('#')) {
    return color;
  }

  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);

  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Decompose a color.
 *
 * @param {String} color - The color to decompose.
 * @returns {Object} - Returns the type and the values of the decomposed color.
 */
function decomposeColor(color: string): DecomposedColor {
  if (color.charAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);
  const values = color.substring(marker + 1, color.length - 1).split(',');

  return {
    type,
    values: values.map(value => parseFloat(value)),
  };
}

/**
 * Get the luminance of a color.
 *
 * @param {String} color - The color to calculate for.
 * @returns {Number} - Returns the luminance.
 */
function getLuminance(color: string): number {
  const decomposedColor = decomposeColor(color);

  if (decomposedColor.type.indexOf('rgb') > -1) {
    const rgb = decomposedColor.values
      .map(val => val / 255)
      .map(val => (val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4));

    // Truncate at 3 digits
    return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
  } else if (decomposedColor.type.indexOf('hsl') > -1) {
    return decomposedColor.values[2] / 100;
  }

  return 0;
}

/**
 * Get the contrast ratio for a foreground and a background color.
 *
 * @param {String} foreground - The color of the foreground.
 * @param {String} background - The color of the background.
 * @returns {Number} - Returns the contrast ratio.
 */
function getContrastRatio(foreground: string, background: string): number {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);

  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

/**
 * Get the contrast color for a background.
 *
 * @param {Object} options - The options.
 * @param {String} options.background - The color of the background.
 * @param {String} options.lightColor - The light color.
 * @param {String} options.darkColor - The dark color.
 * @param {Number} [options.contrastThreshold] - The threshold for the contrast ratio.
 * @returns {String} - Returns the color with the most contrast.
 */
function getContrastColor<LightColor: string, DarkColor: string>({
  background,
  lightColor,
  darkColor,
  contrastThreshold = 3,
}: {
  background: string,
  lightColor: LightColor,
  darkColor: DarkColor,
  contrastThreshold?: number,
}): (LightColor | DarkColor) {
  return getContrastRatio(background, darkColor) >= contrastThreshold
    ? darkColor
    : lightColor;
}

function mergeClassObjects(classes1: Classes, classes2: Classes) {
  const keys = [
    ...Object.keys(classes1),
    ...Object.keys(classes2),
  ];

  return keys.reduce((acc: Classes, key: string): Classes => {
    return {
      ...acc,
      [key]: mergeClassNames(classes1[key], classes2[key]),
    };
  }, {});
}

export {
  getContrastColor,
  getContrastRatio,
  getLuminance,
  decomposeColor,
  convertHexToRGB,
  mergeClassObjects,
};
