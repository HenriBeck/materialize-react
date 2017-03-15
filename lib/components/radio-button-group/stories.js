'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _radioButtonGroup = require('./radio-button-group');

var _radioButtonGroup2 = _interopRequireDefault(_radioButtonGroup);

var _radioButton = require('../radio-button');

var _radioButton2 = _interopRequireDefault(_radioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('RadioButtonGroup', module).add('Default styles', function () {
  return _react2.default.createElement(
    _radioButtonGroup2.default,
    {
      name: 'test',
      defaultSelected: 'button2'
    },
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button1' },
      'Button 1'
    ),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button2' },
      'Button 2'
    ),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button3' },
      'Button 3'
    )
  );
}).add('With callback', function () {
  return _react2.default.createElement(
    _radioButtonGroup2.default,
    {
      name: 'test',
      defaultSelected: 'button2',
      onChange: (0, _storybook.action)('Changed!')
    },
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button1' },
      'Button 1'
    ),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button2' },
      'Button 2'
    ),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button3' },
      'Button 3'
    )
  );
}).add('With label', function () {
  return _react2.default.createElement(
    _radioButtonGroup2.default,
    {
      name: 'test',
      label: 'Some Label',
      defaultSelected: 'button1'
    },
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button1' },
      'Button 1'
    ),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button2' },
      'Button 2'
    ),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button3' },
      'Button 3'
    )
  );
}).add('With disabled button', function () {
  return _react2.default.createElement(
    _radioButtonGroup2.default,
    {
      name: 'test',
      defaultSelected: 'button1'
    },
    _react2.default.createElement(
      _radioButton2.default,
      {
        name: 'button1',
        disabled: true
      },
      'Button 1'
    ),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button2' },
      'Button 2'
    ),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'button3' },
      'Button 3'
    )
  );
});