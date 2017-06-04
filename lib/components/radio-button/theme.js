'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  rippleSize: _propTypes2.default.number,
  circleSize: _propTypes2.default.number,
  borderDistance: _propTypes2.default.number,
  borderWidth: _propTypes2.default.number,
  padding: _propTypes2.default.number,

  onColor: _propTypes2.default.string,
  offColor: _propTypes2.default.string,
  disabledColor: _propTypes2.default.string
});

var defaultTheme = exports.defaultTheme = {
  rippleSize: 40,
  circleSize: 8,
  borderDistance: 2,
  borderWidth: 2,
  padding: 4,

  onColor: 'var(primaryBase)',
  offColor: 'rgba(0, 0, 0, 0.54)',
  disabledColor: 'rgba(0, 0, 0, 0.26)'
};