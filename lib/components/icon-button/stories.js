'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _iconButton = require('./icon-button');

var _iconButton2 = _interopRequireDefault(_iconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('IconButton', module).add('Default styles', function () {
  return _react2.default.createElement(_iconButton2.default, { icon: 'pencil' });
}).add('Disabled', function () {
  return _react2.default.createElement(_iconButton2.default, {
    disabled: true,
    icon: 'pencil'
  });
}).add('With Action', function () {
  return _react2.default.createElement(_iconButton2.default, {
    icon: 'pencil',
    onPress: (0, _addonActions.action)('Clicked the button')
  });
});