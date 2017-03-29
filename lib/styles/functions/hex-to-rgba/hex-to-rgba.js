'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hexToRgba;

var _warning = require('../../../utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert a hex color to rgba with an alpha value.
 *
 * @param {String} hex - The hex string to convert.
 * @param {Number|Boolean} [alpha=1] - The alpha of the color.
 * @returns {String|Boolean} - Returns the rgba string.
 */
function hexToRgba(hex) {
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (/^#[\d+a-f]{6}$/.test(hex)) {
    var redValue = parseInt(hex.slice(1, 3), 16);
    var greenValue = parseInt(hex.slice(3, 5), 16);
    var blueValue = parseInt(hex.slice(5, 7), 16);

    return alpha === false ? 'rgb(' + redValue + ', ' + greenValue + ', ' + blueValue + ')' : 'rgba(' + redValue + ', ' + greenValue + ', ' + blueValue + ', ' + alpha + ')';
  }

  return (0, _warning2.default)(true, hex + ' is not a valid hex string!');
}