'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({
  barHeight: _react.PropTypes.number,
  backgroundColor: _react.PropTypes.string,
  barColor: _react.PropTypes.string
});

var defaultTheme = exports.defaultTheme = {
  barHeight: 4,
  bgColor: 'var(primaryLight)',
  barColor: 'var(primaryBase)'
};