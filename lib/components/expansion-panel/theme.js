'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var _colors = require('../../../../../../../../src/styles/colors');

var schema = exports.schema = _react.PropTypes.shape({
  bgColor: _react.PropTypes.string,
  labelValueColor: _react.PropTypes.string
});

var defaultTheme = exports.defaultTheme = {
  bgColor: _colors.grey800,
  labelValueColor: 'var(secondaryTextColor)'
};