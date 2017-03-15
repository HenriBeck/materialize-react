'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({
  activeColor: _react.PropTypes.string,
  inactiveColor: _react.PropTypes.string,
  rippleColor: _react.PropTypes.string
});

var defaultTheme = exports.defaultTheme = {
  activeColor: 'var(textColor)',
  inactiveColor: 'var(secondaryTextColor)',
  rippleColor: 'var(primaryBase)'
};