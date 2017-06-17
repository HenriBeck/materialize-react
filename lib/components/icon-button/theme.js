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
  size: _propTypes2.default.number.isRequired,
  margin: _propTypes2.default.number.isRequired,
  iconSize: _propTypes2.default.number.isRequired
});

/**
 * The default theme for the icon button component.
 *
 * @private
 * @returns {Object} - Returns the theme.
 */
function defaultTheme() {
  return {
    size: 48,
    margin: 4,
    iconSize: 24
  };
}