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
  color: _propTypes2.default.string,
  disabledColor: _propTypes2.default.string
});

function defaultTheme(vars) {
  return {
    color: vars.iconColor,
    disabledColor: vars.disabledColor
  };
}