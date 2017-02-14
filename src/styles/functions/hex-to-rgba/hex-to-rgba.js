import warning from 'utils/warning';

/**
 * Convert a hex color to rgba with an alpha value.
 *
 * @param {String} hex - The hex string to convert.
 * @param {Number} [alpha=1] - The alpha of the color.
 * @returns {String|Boolean} - Returns the rgba string.
 */
export default function hexToRgba(hex, alpha = 1) {
  if (/^#[\d+a-f]{6}$/.test(hex)) {
    const redValue = parseInt(hex.slice(1, 3), 16);
    const greenValue = parseInt(hex.slice(3, 5), 16);
    const blueValue = parseInt(hex.slice(5, 7), 16);

    return `rgba(${redValue}, ${greenValue}, ${blueValue}, ${alpha})`;
  }

  return warning(true, `${hex} is not a valid hex string!`);
}
