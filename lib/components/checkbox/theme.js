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
  checkedBorderColor: _propTypes2.default.string.isRequired,
  checkedBackgroundColor: _propTypes2.default.string.isRequired,

  uncheckedBorderColor: _propTypes2.default.string.isRequired,
  uncheckedBackgroundColor: _propTypes2.default.string.isRequired,

  disabledBorderColor: _propTypes2.default.string.isRequired,
  disabledBackgroundColor: _propTypes2.default.string.isRequired,
  disabledCheckedBackgroundColor: _propTypes2.default.string.isRequired,

  padding: _propTypes2.default.number.isRequired,
  rippleSize: _propTypes2.default.number.isRequired,
  size: _propTypes2.default.number.isRequired,
  borderWidth: _propTypes2.default.number.isRequired,

  animationDuration: _propTypes2.default.number.isRequired
});

function defaultTheme(vars) {
  return {
    checkedBorderColor: vars.primaryBase,
    checkedBgColor: vars.primaryBase,

    uncheckedBorderColor: 'rgba(255, 255, 255, 0.7)',
    uncheckedBgColor: 'transparent',

    disabledBorderColor: 'rgba(255, 255, 255, 0.3)',
    disabledBgColor: 'transparent',
    disabledCheckedBgColor: 'rgba(255, 255, 255, 0.3)',

    padding: 4,
    rippleSize: 48,
    size: 20,
    borderWidth: 2,

    animationDuration: vars.transitionTime
  };
}