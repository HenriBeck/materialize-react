'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  radius: _propTypes2.default.number,
  strokeWidth: _propTypes2.default.number,
  arcsize: _propTypes2.default.number,
  arctime: _propTypes2.default.number,
  arcStartRotate: _propTypes2.default.number,
  color: _propTypes2.default.string
});

var defaultTheme = exports.defaultTheme = {
  radius: 12.5,
  strokeWidth: 3,
  arcsize: 270,
  arctime: 1333,
  arcStartRotate: 216,
  color: 'var(primaryBase)'
};