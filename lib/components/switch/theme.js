'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;
exports.defaultTheme = defaultTheme;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _colors = require('../../styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  transitionTime: _propTypes2.default.number.isRequired,

  thumbSize: _propTypes2.default.number.isRequired,
  rippleSize: _propTypes2.default.number.isRequired,
  trackWidth: _propTypes2.default.number.isRequired,
  trackHeight: _propTypes2.default.number.isRequired,

  activeThumbColor: _propTypes2.default.string.isRequired,
  activeTrackColor: _propTypes2.default.string.isRequired,
  activeRippleColor: _propTypes2.default.string.isRequired,

  inactiveThumbColor: _propTypes2.default.string.isRequired,
  inactiveTrackColor: _propTypes2.default.string.isRequired,
  inactiveRippleColor: _propTypes2.default.string.isRequired,

  disabledThumbColor: _propTypes2.default.string.isRequired,
  disabledTrackColor: _propTypes2.default.string.isRequired
});

function defaultTheme(vars) {
  return {
    transitionTime: vars.transitionTime,

    thumbSize: 20,
    rippleSize: 40,
    trackWidth: 36,
    trackHeight: 14,

    activeThumbColor: vars.primaryBase,
    activeTrackColor: (0, _color2.default)(vars.primaryBase).alpha(0.5).hex(),
    activeRippleColor: vars.primaryBase,

    inactiveThumbColor: _colors.grey400,
    inactiveTrackColor: 'rgba(255, 255, 255, 0.3)',
    inactiveRippleColor: '#000000',

    disabledThumbColor: _colors.grey800,
    disabledTrackColor: 'rgba(255, 255, 255, 0.1)'
  };
}