'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({
  typo: _react.PropTypes.string,
  color: _react.PropTypes.string,
  disabledColor: _react.PropTypes.string
});

var defaultTheme = exports.defaultTheme = {
  typo: 'body1',
  color: 'var(textColor)',
  disabledColor: 'var(secondaryTextColor)'
};