'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _addonKnobs = require('@storybook/addon-knobs');

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Button', module).addDecorator(_addonKnobs.withKnobs).add('Flat Button', function () {
  return _react2.default.createElement(
    _button2.default,
    null,
    'Test'
  );
}).add('Raised button', function () {
  return _react2.default.createElement(
    _button2.default,
    { raised: true },
    'Raised'
  );
}).add('Disabled button', function () {
  return _react2.default.createElement(
    _button2.default,
    { disabled: true },
    'Disabled'
  );
}).add('Raised and Disabled button', function () {
  return _react2.default.createElement(
    _button2.default,
    {
      disabled: true,
      raised: true
    },
    'Disabled'
  );
}).add('Button without ink', function () {
  return _react2.default.createElement(
    _button2.default,
    { noink: true },
    'No ink'
  );
}).add('Button with callbacks', function () {
  return _react2.default.createElement(
    _button2.default,
    {
      onPress: (0, _addonActions.action)('Pressed the button'),
      onRelease: (0, _addonActions.action)('Released the button')
    },
    'Click me!'
  );
}).add('Interactive', function () {
  return _react2.default.createElement(
    _button2.default,
    {
      noink: (0, _addonKnobs.boolean)('No Ink', false),
      disabled: (0, _addonKnobs.boolean)('Disabled', false),
      raised: (0, _addonKnobs.boolean)('Raised', false)
    },
    (0, _addonKnobs.text)('Button text', 'Text')
  );
});