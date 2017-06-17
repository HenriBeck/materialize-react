'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;
exports.defaultTheme = defaultTheme;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  containerRotationDuration: _propTypes2.default.number.isRequired,
  fullCycleDuration: _propTypes2.default.number.isRequired,
  expandContractDuration: _propTypes2.default.number.isRequired,
  color: _propTypes2.default.string.isRequired,
  strokeWidth: _propTypes2.default.number.isRequired,
  size: _propTypes2.default.number.isRequired
});

/**
 * Default theme for the spinner.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
function defaultTheme(vars) {
  return {
    containerRotationDuration: 1568,
    fullCycleDuration: 5332,
    expandContractDuration: 1333,
    color: vars.primaryBase,
    strokeWidth: 4,
    size: 56
  };
}