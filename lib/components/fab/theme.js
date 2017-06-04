'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _colors = require('../../styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  miniSize: _propTypes2.default.number,
  normalSize: _propTypes2.default.number,
  iconSize: _propTypes2.default.number,

  elevation: _propTypes2.default.number,
  focusedElevation: _propTypes2.default.number,
  disabledElevation: _propTypes2.default.number,

  iconColor: _propTypes2.default.string,
  disabledIconColor: _propTypes2.default.string,
  backgroundColor: _propTypes2.default.string,
  disabledBackgroundColor: _propTypes2.default.string
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