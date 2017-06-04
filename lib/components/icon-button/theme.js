'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  size: _propTypes2.default.number,
  margin: _propTypes2.default.number,
  iconSize: _propTypes2.default.number
});

var defaultTheme = exports.defaultTheme = {
  size: 48,
  margin: 4,
  iconSize: 24
};