'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonKnobs = require('@storybook/addon-knobs');

var _spinner = require('./spinner');

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Spinner', module).addDecorator(_addonKnobs.withKnobs).add('Default styles', function () {
  return _react2.default.createElement(_spinner2.default, { active: (0, _addonKnobs.boolean)('Active', true) });
});