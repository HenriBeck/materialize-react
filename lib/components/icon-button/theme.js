'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({
  size: _react.PropTypes.number,
  margin: _react.PropTypes.number,
  iconSize: _react.PropTypes.number
});

var defaultTheme = exports.defaultTheme = {
  size: 48,
  margin: 4,
  iconSize: 24
};