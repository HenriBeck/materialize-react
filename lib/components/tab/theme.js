'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  activeColor: _propTypes2.default.string,
  inactiveColor: _propTypes2.default.string,
  rippleColor: _propTypes2.default.string
});

var defaultTheme = exports.defaultTheme = {
  activeColor: 'var(textColor)',
  inactiveColor: 'var(secondaryTextColor)',
  rippleColor: 'var(primaryBase)'
};