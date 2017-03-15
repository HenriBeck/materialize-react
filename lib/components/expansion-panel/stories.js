'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _expansionPanel = require('./expansion-panel');

var _expansionPanel2 = _interopRequireDefault(_expansionPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('ExpansionPanel', module).add('Default styles', function () {
  return _react2.default.createElement(
    _expansionPanel2.default,
    {
      label: 'Region',
      value: 'Europe',
      style: { width: '800px' }
    },
    'Some Content'
  );
});