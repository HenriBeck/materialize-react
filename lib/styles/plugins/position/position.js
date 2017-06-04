"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
/**
 * Check if a variable is a number and if not return a default value.
 *
 * @param {Number} number - Make sure it's a valid number.
 * @param {Number} defaultValue - The value if the first arg isn't a number.
 * @returns {Number} - Returns either the number or the defaultValue.
 */
function checkForNumber(number, defaultValue) {
  return number || number === 0 ? number : defaultValue;
}

/**
 * A function to generate a css object with position styles.
 *
 * @param {String} [pos] - The position for the element.
 * @param {...Number} args - The values for the top, right, bottom and left.
 * @returns {Object} - Returns the style object.
 */
function position() {
  var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var top = checkForNumber(arguments.length <= 1 ? undefined : arguments[1], null);
  var right = checkForNumber(arguments.length <= 2 ? undefined : arguments[2], top);
  var bottom = checkForNumber(arguments.length <= 3 ? undefined : arguments[3], top);
  var left = checkForNumber(arguments.length <= 4 ? undefined : arguments[4], right);

  if (pos === null) {
    return {};
  } else if (top === null) {
    return { position: pos };
  }

  return {
    position: pos,
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
}