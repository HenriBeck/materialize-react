'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var _colors = require('../../../../../../../../src/styles/colors');

var schema = exports.schema = _react.PropTypes.shape({
  bgColor: _react.PropTypes.string,
  color: _react.PropTypes.string,
  focusedElevation: _react.PropTypes.number
});

var defaultTheme = exports.defaultTheme = {
  bgColor: _colors.grey300,
  color: 'var(textColor)',
  focusedElevation: 2,
  imgColor: 'var(textColor)'
};