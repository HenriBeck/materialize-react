/**
 * A function to quickly generate the height and width for an element.
 *
 * @param {Number} width - The width of the element.
 * @param {Number} [height=width] - The height of the element.
 * If not provided it will be the same as the width of the element.
 * @returns {Object} Returns an object with height and width property.
 */
export default function size(width = null, height = width) {
  if (width === null) {
    return {};
  }

  return {
    width,
    height,
  };
}
