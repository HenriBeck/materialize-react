'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typo;

var _typography = require('./typography');

var _typography2 = _interopRequireDefault(_typography);

var _warning = require('../../../utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A function to get the typography based on a name.
 *
 * @param {String} name - The name of the typography specified in typography.js.
 * @returns {Object} - Returns the styles for the typography.
 */
function typo(name) {
  (0, _warning2.default)(!_typography2.default[name], name + ' doesn\'t exists as a valid typography');

  return _typography2.default[name];
}