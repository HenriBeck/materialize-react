'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({
  radius: _react.PropTypes.number,
  strokeWidth: _react.PropTypes.number,
  arcsize: _react.PropTypes.number,
  arctime: _react.PropTypes.number,
  arcStartRotate: _react.PropTypes.number,
  color: _react.PropTypes.string
});

var defaultTheme = exports.defaultTheme = {
  radius: 12.5,
  strokeWidth: 3,
  arcsize: 270,
  arctime: 1333,
  arcStartRotate: 216,
  color: 'var(primaryBase)'
};