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
  height: _propTypes2.default.number.isRequired,
  backgroundColor: _propTypes2.default.string.isRequired
});

/**
 * The default theme for the divider component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
function defaultTheme(vars) {
  return {
    height: 1,
    backgroundColor: vars.dividerColor
  };
}