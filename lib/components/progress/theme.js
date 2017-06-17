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
  barHeight: _propTypes2.default.number.isRequired,
  backgroundColor: _propTypes2.default.string.isRequired,
  primaryBarColor: _propTypes2.default.string.isRequired,
  secondaryBarColor: _propTypes2.default.string.isRequired,
  transitionTime: _propTypes2.default.number.isRequired,
  indeterminateDuration: _propTypes2.default.number.isRequired,
  fullAnimationDuration: _propTypes2.default.number.isRequired
});

/**
 * Default theme for the progress component.
 *
 * @param {Object} vars - Variables passed by the theme compiler.
 * @returns {Object} - Returns the theme.
 */
function defaultTheme(vars) {
  return {
    barHeight: 4,
    backgroundColor: _colors.grey300,
    primaryBarColor: vars.primaryBase,
    secondaryBarColor: vars.primaryLight,
    transitionTime: vars.transitionTime,
    indeterminateDuration: 2 * 1000,
    fullAnimationDuration: 600
  };
}