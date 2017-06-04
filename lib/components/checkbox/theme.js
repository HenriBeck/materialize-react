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
  checkmarkColor: _propTypes2.default.string,

  checkedBorderColor: _propTypes2.default.string,
  checkedBackgroundColor: _propTypes2.default.string,

  uncheckedBorderColor: _propTypes2.default.string,
  uncheckedBackgroundColor: _propTypes2.default.string,

  disabledBorderColor: _propTypes2.default.string,
  disabledBackgroundColor: _propTypes2.default.string,
  disabledCheckedBackgroundColor: _propTypes2.default.string,

  checkedRippleColor: _propTypes2.default.string,
  uncheckedRippleColor: _propTypes2.default.string,

  checkedRippleFocusColor: _propTypes2.default.string,
  uncheckedRippleFocusColor: _propTypes2.default.string,

  labelColor: _propTypes2.default.string,
  disabledLabelColor: _propTypes2.default.string,

  padding: _propTypes2.default.number,
  height: _propTypes2.default.number,
  checkboxSize: _propTypes2.default.number,
  checkboxBorderWidth: _propTypes2.default.number
});

function defaultTheme(vars) {
  return {
    checkmarkColor: 'white',

    checkedBorderColor: vars.primaryBase,
    checkedBgColor: vars.primaryBase,

    uncheckedBorderColor: 'rgba(0, 0, 0, 0.55)',
    uncheckedBgColor: 'transparent',

    disabledBorderColor: 'rgba(0, 0, 0, 0.26)',
    disabledBgColor: 'transparent',
    disabledCheckedBgColor: 'rgba(0, 0, 0, 0.26)',

    labelColor: vars.textColor,
    disabledLabelColor: vars.disabledColor,

    padding: 4,
    height: 48,
    checkboxSize: 20,
    checkboxBorderWidth: 2
  };
}