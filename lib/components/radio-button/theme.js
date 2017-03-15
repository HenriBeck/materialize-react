'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({
  rippleSize: _react.PropTypes.number,
  circleSize: _react.PropTypes.number,
  borderDistance: _react.PropTypes.number,
  borderWidth: _react.PropTypes.number,
  padding: _react.PropTypes.number,

  onColor: _react.PropTypes.string,
  offColor: _react.PropTypes.string,
  disabledColor: _react.PropTypes.string
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