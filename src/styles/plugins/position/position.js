import is from 'is_js';

/**
 * Check if the arg exists and elsewise return the value.
 *
 * @param {Number} arg - The argument to check for.
 * @param {*} value - A value to return when it doesn't exists.
 * @returns {Number|*} - Returns the arg when it's a number elsewise it will return the value.
 */
function checkForNumber(arg, value) {
  return is.number(arg) ? arg : value;
}

/**
 * A function to quickly generate the position for css.
 * Especially useful when using the absolute position.
 *
 * @param {String} pos - The css position.
 * @param {...Number} args - A number of position which will be mapped to top, right, bottom and
 * left in that order.
 * Inherits first the right and then the top position if it's not set explicitly.
 * @returns {Object} - Returns an object with css properties.
 */
export default function position(pos = null, ...args) {
  const top = checkForNumber(args[0], null);
  const right = checkForNumber(args[1], top);
  const bottom = checkForNumber(args[2], top);
  const left = checkForNumber(args[3], right);

  if (pos === null) {
    return {};
  } else if (top === null) {
    return { position: pos };
  }

  return {
    position: pos,
    top,
    right,
    bottom,
    left,
  };
}
