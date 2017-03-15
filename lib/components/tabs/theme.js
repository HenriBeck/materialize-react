'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _react = require('react');

var schema = exports.schema = _react.PropTypes.shape({ barColor: _react.PropTypes.string });

var defaultTheme = exports.defaultTheme = { barColor: 'var(primaryBase)' };