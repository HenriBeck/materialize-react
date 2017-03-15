'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _tabs = require('./tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _tab = require('../tab');

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('Tabs', module).add('Default styles', function () {
  return _react2.default.createElement(
    _tabs2.default,
    { initialTabId: 'button2' },
    _react2.default.createElement(
      _tab2.default,
      { id: 'button1' },
      'Button 1'
    ),
    _react2.default.createElement(
      _tab2.default,
      { id: 'button2' },
      'Button 2'
    ),
    _react2.default.createElement(
      _tab2.default,
      { id: 'button3' },
      'Button 3 some really long text which will not be truncated yet'
    )
  );
}).add('With action on Tab change', function () {
  return _react2.default.createElement(
    _tabs2.default,
    {
      initialTabId: 'button2',
      onTabChange: (0, _storybook.action)('tabChange')
    },
    _react2.default.createElement(
      _tab2.default,
      { id: 'button1' },
      'Button 1'
    ),
    _react2.default.createElement(
      _tab2.default,
      { id: 'button2' },
      'Button 2'
    ),
    _react2.default.createElement(
      _tab2.default,
      { id: 'button3' },
      'Button 3'
    )
  );
});