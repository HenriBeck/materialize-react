'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check if the arg exists and elsewise return the value.
 *
 * @param {Number} arg - The argument to check for.
 * @param {*} value - A value to return when it doesn't exists.
 * @returns {Number|*} - Returns the arg when it's a number elsewise it will return the value.
 */
function checkForNumber(arg, value) {
  return _is_js2.default.number(arg) ? arg : value;
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