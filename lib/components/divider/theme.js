'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.schema = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _propTypes2.default.shape({
  height: _propTypes2.default.number,
  backgroundColor: _propTypes2.default.string
});

var defaultTheme = exports.defaultTheme = {
  height: 1,
  backgroundColor: 'var(dividerColor)'
};