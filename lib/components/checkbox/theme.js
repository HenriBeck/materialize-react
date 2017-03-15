'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({
  checkmarkColor: _react.PropTypes.string,

  checkedBorderColor: _react.PropTypes.string,
  checkedBackgroundColor: _react.PropTypes.string,

  uncheckedBorderColor: _react.PropTypes.string,
  uncheckedBackgroundColor: _react.PropTypes.string,

  disabledBorderColor: _react.PropTypes.string,
  disabledBackgroundColor: _react.PropTypes.string,
  disabledCheckedBackgroundColor: _react.PropTypes.string,

  checkedRippleColor: _react.PropTypes.string,
  uncheckedRippleColor: _react.PropTypes.string,

  checkedRippleFocusColor: _react.PropTypes.string,
  uncheckedRippleFocusColor: _react.PropTypes.string,

  labelColor: _react.PropTypes.string,
  disabledLabelColor: _react.PropTypes.string,

  padding: _react.PropTypes.number,
  height: _react.PropTypes.number,
  checkboxSize: _react.PropTypes.number,
  checkboxBorderWidth: _react.PropTypes.number
});

var defaultTheme = exports.defaultTheme = {
  checkmarkColor: 'white',

  checkedBorderColor: 'var(primaryBase)',
  checkedBgColor: 'var(primaryBase)',

  uncheckedBorderColor: 'rgba(0, 0, 0, 0.55)',
  uncheckedBgColor: 'transparent',

  disabledBorderColor: 'rgba(0, 0, 0, 0.26)',
  disabledBgColor: 'transparent',
  disabledCheckedBgColor: 'rgba(0, 0, 0, 0.26)',

  labelColor: 'var(textColor)',
  disabledLabelColor: 'var(disabledColor)',

  padding: 4,
  height: 48,
  checkboxSize: 20,
  checkboxBorderWidth: 2
};