'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _switch = require('./switch');

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Switch', module).add('Default styles', function () {
  return _react2.default.createElement(_switch2.default, { name: 'name' });
}).add('Default toggled', function () {
  return _react2.default.createElement(_switch2.default, {
    defaultToggled: true,
    name: 'name'
  });
}).add('Label right', function () {
  return _react2.default.createElement(
    _switch2.default,
    { name: 'name' },
    'Right label'
  );
}).add('Label left', function () {
  return _react2.default.createElement(
    _switch2.default,
    {
      labelPosition: 'left',
      name: 'name'
    },
    'Left label'
  );
}).add('Disabled', function () {
  return _react2.default.createElement(
    _switch2.default,
    {
      disabled: true,
      name: 'name'
    },
    'Right label'
  );
}).add('Disabled and toggled', function () {
  return _react2.default.createElement(
    _switch2.default,
    {
      disabled: true,
      defaultToggled: true,
      name: 'name'
    },
    'Right label'
  );
}).add('With callback', function () {
  return _react2.default.createElement(
    _switch2.default,
    {
      name: 'name',
      onChange: (0, _addonActions.action)('Toggled!')
    },
    'Right label'
  );
});