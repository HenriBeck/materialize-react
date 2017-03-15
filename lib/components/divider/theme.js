'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({
  height: _react.PropTypes.number,
  backgroundColor: _react.PropTypes.string
});

var defaultTheme = exports.defaultTheme = {
  height: 1,
  backgroundColor: 'var(dividerColor)'
};