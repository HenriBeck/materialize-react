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
