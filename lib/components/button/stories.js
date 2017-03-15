'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('Button', module).add('Flat Button', function () {
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
      onPress: (0, _storybook.action)('Pressed the button'),
      onRelease: (0, _storybook.action)('Released the button')
    },
    'Click me!'
  );
});