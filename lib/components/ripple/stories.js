'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _rippleContainer = require('./ripple-container');

var _rippleContainer2 = _interopRequireDefault(_rippleContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Ripple', module).add('with text', function () {
  return _react2.default.createElement(_rippleContainer2.default, null);
});