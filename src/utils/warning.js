/**
 * A function to throw a warning when the NODE_ENV is development
 * and the condition is met.
 *
 * @param {Boolean} condition - The condition to check.
 * @param {...String} args - An array of strings
 * which will be concatenated and passed to the error.
 * @returns {Boolean} - Returns whether the warning got thrown.
 */
export default function warning(condition, ...args) {
  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      throw new Error(args.join(' '));
    }

    return condition;
  }

  return false;
}
