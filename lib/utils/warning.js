'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
/**
 * A function to throw a warning when the NODE_ENV is development
 * and the condition is met.
 *
 * @param {Boolean} condition - The condition to check.
 * @param {String[]} args - An array of strings
 * which will be concatenated and passed to the error.
 * @returns {Boolean} - Returns whether the warning got thrown.
 */
function warning(condition) {
  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      throw new Error(args.join(' '));
    }

    return condition;
  }

  return false;
}