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
  bgColor: _propTypes2.default.string.isRequired,
  height: _propTypes2.default.number.isRequired,
  color: _propTypes2.default.string.isRequired,
  focusedElevation: _propTypes2.default.number.isRequired,
  imgColor: _propTypes2.default.string.isRequired,

  transitionTime: _propTypes2.default.number.isRequired,

  deleteIconSize: _propTypes2.default.number.isRequired,
  deleteIconFontSize: _propTypes2.default.number.isRequired
});

/**
 * The default theme for the chip component.
 *
 * @private
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
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