'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({
  elevation: _react.PropTypes.number,
  pressedElevation: _react.PropTypes.number,
  typo: _react.PropTypes.string,

  height: _react.PropTypes.number,
  minWidth: _react.PropTypes.number,
  margin: _react.PropTypes.oneOf([_react.PropTypes.string, _react.PropTypes.number]),

  bgColor: _react.PropTypes.string,
  raisedBgColor: _react.PropTypes.string,
  raisedAndPressedBgColor: _react.PropTypes.string,
  disabledBgColor: _react.PropTypes.string,
  raisedAndDisabledBgColor: _react.PropTypes.string,

  color: _react.PropTypes.string,
  disabledColor: _react.PropTypes.string
});

var defaultTheme = exports.defaultTheme = {
  elevation: 2,
  pressedElevation: 4,
  typo: 'button',
  height: 36,
  minWidth: 88,
  margin: '0 8px',
  bgColor: '#ffffff',
  raisedBgColor: '#ffffff',
  disabledBgColor: 'transparent',
  raisedAndDisabledBgColor: 'rgba(0, 0, 0, 0.12)',
  color: 'var(textColor)',
  disabledColor: 'rgba(0, 0, 0, 0.26)'
};