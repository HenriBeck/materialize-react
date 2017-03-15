'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _storybookAddonKnobs = require('@kadira/storybook-addon-knobs');

var _progress = require('./progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = { width: 400 };

(0, _storybook.storiesOf)('Progress', module).add('Default Styles', function () {
  return _react2.default.createElement(_progress2.default, {
    progress: (0, _storybookAddonKnobs.number)('Progress', 75, {
      min: 0,
      max: 100,
      step: 1
    }),
    style: style
  });
}).add('Indeterminate Style', function () {
  return _react2.default.createElement(_progress2.default, {
    mode: 'indeterminate',
    active: (0, _storybookAddonKnobs.boolean)('Active', true),
    style: style
  });
});