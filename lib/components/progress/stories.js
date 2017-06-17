'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonKnobs = require('@storybook/addon-knobs');

var _progress = require('./progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = { width: 400 };

(0, _react3.storiesOf)('Progress', module).addDecorator(_addonKnobs.withKnobs).add('Default Styles', function () {
  return _react2.default.createElement(
    'div',
    { style: style },
    _react2.default.createElement(_progress2.default, {
      progress: (0, _addonKnobs.number)('Progress', 75, {
        range: true,
        min: 0,
        max: 100,
        step: 1
      }),

      secondaryProgress: (0, _addonKnobs.number)('Secondary Progress', 0, {
        range: true,
        min: 0,
        max: 100,
        step: 1
      })
    })
  );
}).add('Indeterminate Style', function () {
  return _react2.default.createElement(
    'div',
    { style: style },
    _react2.default.createElement(_progress2.default, {
      indeterminate: true,
      active: (0, _addonKnobs.boolean)('Active', true)
    })
  );
});