'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var _colors = require('../../styles/colors');

var schema = exports.schema = _react.PropTypes.shape({
  miniSize: _react.PropTypes.number,
  normalSize: _react.PropTypes.number,
  iconSize: _react.PropTypes.number,

  elevation: _react.PropTypes.number,
  focusedElevation: _react.PropTypes.number,
  disabledElevation: _react.PropTypes.number,

  iconColor: _react.PropTypes.string,
  disabledIconColor: _react.PropTypes.string,
  backgroundColor: _react.PropTypes.string,
  disabledBackgroundColor: _react.PropTypes.string
});

var defaultTheme = exports.defaultTheme = {
  miniSize: 40,
  normalSize: 56,
  iconSize: 24,

  elevation: 1,
  focusedElevation: 4,
  disabledElevation: 0,

  iconColor: _colors.whiteIcons,
  disabledIconColor: _colors.grey500,
  bgColor: 'var(primaryBase)',
  disabledBgColor: _colors.grey300
};