'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _colors = require('../../styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  thumbSize: _propTypes2.default.number,
  rippleSize: _propTypes2.default.number,
  trackWidth: _propTypes2.default.number,
  trackHeight: _propTypes2.default.number,

  activeThumbColor: _propTypes2.default.string,
  activeTrackColor: _propTypes2.default.string,
  activeRippleColor: _propTypes2.default.string,

  inactiveThumbColor: _propTypes2.default.string,
  inactiveTrackColor: _propTypes2.default.string,
  inactiveRippleColor: _propTypes2.default.string,

  disabledThumbColor: _propTypes2.default.string,
  disabledTrackColor: _propTypes2.default.string
});

var defaultTheme = exports.defaultTheme = {
  thumbSize: 20,
  rippleSize: 40,
  trackWidth: 36,
  trackHeight: 14,

  activeThumbColor: 'var(primaryBase)',
  activeTrackColor: 'var(primaryBase)',
  activeRippleColor: 'var(primaryBase)',

  inactiveThumbColor: _colors.grey50,
  inactiveTrackColor: 'rgba(0, 0, 0, 0.38)',
  inactiveRippleColor: '#000000',

  disabledThumbColor: _colors.grey400,
  disabledTrackColor: 'rgba(0, 0, 0, 0.12)'
};