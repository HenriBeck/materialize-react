'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var _colors = require('../../styles/colors');

var schema = exports.schema = _react.PropTypes.shape({
  thumbSize: _react.PropTypes.number,
  rippleSize: _react.PropTypes.number,
  trackWidth: _react.PropTypes.number,
  trackHeight: _react.PropTypes.number,

  activeThumbColor: _react.PropTypes.string,
  activeTrackColor: _react.PropTypes.string,
  activeRippleColor: _react.PropTypes.string,

  inactiveThumbColor: _react.PropTypes.string,
  inactiveTrackColor: _react.PropTypes.string,
  inactiveRippleColor: _react.PropTypes.string,

  disabledThumbColor: _react.PropTypes.string,
  disabledTrackColor: _react.PropTypes.string
});

var defaultTheme = exports.defaultTheme = {
  thumbSize: 20,
  rippleSize: 40,
  trackWidth: 36,
  trackHeight: 14,

  activeThumbColor: 'var(primaryBase)',
  activeTrackColor: 'var(primaryBase)',
  activeRippleColor: 'var(primaryBase)',

  inactiveThumbColor: _colors.grey50,
  inactiveTrackColor: 'rgba(0, 0, 0, 0.38)',
  inactiveRippleColor: '#000000',

  disabledThumbColor: _colors.grey400,
  disabledTrackColor: 'rgba(0, 0, 0, 0.12)'
};