'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _checkboxContainer = require('./checkbox-container');

var _checkboxContainer2 = _interopRequireDefault(_checkboxContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('Checkbox', module).add('Default styles', function () {
  return _react2.default.createElement(_checkboxContainer2.default, { name: 'name' });
}).add('Default Checked', function () {
  return _react2.default.createElement(_checkboxContainer2.default, {
    defaultChecked: true,
    name: 'name'
  });
}).add('Right Label', function () {
  return _react2.default.createElement(
    _checkboxContainer2.default,
    { name: 'name' },
    'Right Label'
  );
}).add('Left Label', function () {
  return _react2.default.createElement(
    _checkboxContainer2.default,
    {
      labelPosition: 'left',
      name: 'name'
    },
    'Left Label'
  );
}).add('Disabled', function () {
  return _react2.default.createElement(
    _checkboxContainer2.default,
    {
      disabled: true,
      name: 'name'
    },
    'Right Label'
  );
}).add('Disabled and Checked', function () {
  return _react2.default.createElement(
    _checkboxContainer2.default,
    {
      disabled: true,
      defaultChecked: true,
      name: 'name'
    },
    'Right Label'
  );
}).add('With callback', function () {
  return _react2.default.createElement(
    _checkboxContainer2.default,
    {
      name: 'name',
      onChange: (0, _storybook.action)('Toggled')
    },
    'Right Label'
  );
});