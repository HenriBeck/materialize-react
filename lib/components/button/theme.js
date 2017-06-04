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
  elevation: _propTypes2.default.number.isRequired,
  pressedElevation: _propTypes2.default.number.isRequired,

  height: _propTypes2.default.number.isRequired,
  minWidth: _propTypes2.default.number.isRequired,
  margin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,

  bgColor: _propTypes2.default.string.isRequired,
  raisedBgColor: _propTypes2.default.string.isRequired,
  raisedAndPressedBgColor: _propTypes2.default.string.isRequired,
  disabledBgColor: _propTypes2.default.string.isRequired,
  raisedAndDisabledBgColor: _propTypes2.default.string.isRequired,

  color: _propTypes2.default.string.isRequired,
  disabledColor: _propTypes2.default.string.isRequired
});

function defaultTheme(vars) {
  return {
    elevation: 2,
    pressedElevation: 4,
    height: 36,
    minWidth: 88,
    margin: '0 8px',
    bgColor: '#ffffff',
    raisedBgColor: '#ffffff',
    disabledBgColor: 'transparent',
    raisedAndDisabledBgColor: 'rgba(0, 0, 0, 0.12)',
    color: vars.textColor,
    disabledColor: 'rgba(0, 0, 0, 0.26)'
  };
}