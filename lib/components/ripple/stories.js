'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _ripple = require('./ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('Ripple', module).addDecorator(function (story) {
  return _react2.default.createElement(
    'div',
    {
      style: {
        position: 'relative',
        height: 200,
        width: 200,
        border: 'solid 1px white'
      }
    },
    story()
  );
}).add('Default styles', function () {
  return _react2.default.createElement(_ripple2.default, null);
}).add('Custom Color', function () {
  return _react2.default.createElement(_ripple2.default, { color: 'red' });
}).add('Centered ripple', function () {
  return _react2.default.createElement(_ripple2.default, {
    round: true,
    center: true
  });
}).add('Custom Color via background', function () {
  return _react2.default.createElement(
    'div',
    {
      style: {
        height: '100%',
        width: '100%',
        color: 'red'
      }
    },
    _react2.default.createElement(_ripple2.default, null)
  );
});