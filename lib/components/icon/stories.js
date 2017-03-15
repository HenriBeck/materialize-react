'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('Icon', module).add('MDI Icon', function () {
  return _react2.default.createElement(_icon2.default, { icon: 'chevron-down' });
}).add('Disabled Icon', function () {
  return _react2.default.createElement(_icon2.default, {
    disabled: true,
    icon: 'github-circle'
  });
});