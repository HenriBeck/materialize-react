'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;
exports.defaultTheme = defaultTheme;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  miniSize: _propTypes2.default.number.isRequired,
  normalSize: _propTypes2.default.number.isRequired,
  iconSize: _propTypes2.default.number.isRequired,

  elevation: _propTypes2.default.number.isRequired,
  focusedElevation: _propTypes2.default.number.isRequired,
  disabledElevation: _propTypes2.default.number.isRequired,

  backgroundColor: _propTypes2.default.string.isRequired,
  disabledBackgroundColor: _propTypes2.default.string.isRequired,

  transitionTime: _propTypes2.default.number.isRequired
});

function defaultTheme(vars) {
  return {
    miniSize: 40,
    normalSize: 56,
    iconSize: 24,

    elevation: 1,
    focusedElevation: 4,
    disabledElevation: 0,

    backgroundColor: vars.primaryBase,
    disabledBackgroundColor: 'rgba(255, 255, 255, 0.1)',

    transitionTime: vars.transitionTime
  };
}