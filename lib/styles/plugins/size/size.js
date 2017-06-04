"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = size;
/**
 * A function to quickly generate the height and width for an element.
 *
 * @param {Number} [width] - The width of the element.
 * @param {Number} [height=width] - The height of the element.
 * If not provided it will be the same as the width of the element.
 * @returns {Object} - Returns an object with height and width property.
 */
function size() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;

  if (width === null) {
    return {};
  }

  return {
    width: width,
    height: height
  };
}