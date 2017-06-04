'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;
exports.defaultTheme = defaultTheme;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _colors = require('../../styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  bgColor: _propTypes2.default.string,
  color: _propTypes2.default.string,
  focusedElevation: _propTypes2.default.number
});

function defaultTheme(vars) {
  return {
    bgColor: _colors.grey300,
    height: 32,
    color: vars.textColor,
    focusedElevation: 2,
    imgColor: vars.textColor,

    transitionTime: vars.transitionTime,

    deleteIconSize: 24,
    deleteIconFontSize: 12
  };
}