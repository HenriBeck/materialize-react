'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _divider = require('./divider');

var _divider2 = _interopRequireDefault(_divider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Divider', module).add('Default styles', function () {
  return _react2.default.createElement(_divider2.default, { style: { width: 400 } });
});