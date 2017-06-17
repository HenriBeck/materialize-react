'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Icon', module).add('MDI Icon', function () {
  return _react2.default.createElement(_icon2.default, { icon: 'chevron-down' });
}).add('Disabled Icon', function () {
  return _react2.default.createElement(_icon2.default, {
    disabled: true,
    icon: 'github-circle'
  });
});