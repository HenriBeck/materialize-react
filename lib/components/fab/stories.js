'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _fab = require('./fab');

var _fab2 = _interopRequireDefault(_fab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('FAB', module).add('Default styles', function () {
  return _react2.default.createElement(_fab2.default, { icon: 'pencil' });
}).add('Disabled', function () {
  return _react2.default.createElement(_fab2.default, {
    disabled: true,
    icon: 'pencil'
  });
}).add('Animate in', function () {
  return _react2.default.createElement(_fab2.default, {
    icon: 'pencil',
    animateIn: true
  });
}).add('With Action', function () {
  return _react2.default.createElement(_fab2.default, {
    icon: 'pencil',
    onClick: (0, _addonActions.action)('Clicked!')
  });
}).add('Mini', function () {
  return _react2.default.createElement(_fab2.default, {
    mini: true,
    icon: 'pencil'
  });
});