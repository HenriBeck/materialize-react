'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _storybookAddonKnobs = require('@kadira/storybook-addon-knobs');

var _spinner = require('./spinner');

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('Spinner', module).add('Default styles', function () {
  return _react2.default.createElement(_spinner2.default, { active: (0, _storybookAddonKnobs.boolean)('Active', true) });
});