'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _addonKnobs = require('@storybook/addon-knobs');

var _chip = require('./chip');

var _chip2 = _interopRequireDefault(_chip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Chip', module).addDecorator(_addonKnobs.withKnobs).add('Default styles', function () {
  return _react2.default.createElement(
    _chip2.default,
    { id: 'test' },
    'Hello'
  );
}).add('With image as text and color', function () {
  return _react2.default.createElement(
    _chip2.default,
    {
      id: 'test',
      img: {
        color: 'blue',
        text: 'ab',
        textColor: 'white'
      }
    },
    'Hello'
  );
}).add('With image', function () {
  return _react2.default.createElement(
    _chip2.default,
    {
      id: 'test',
      img: 'http://cdn.edgecast.steamstatic.com/steamcommunity/public/images/avatars/9d/9d052b9dd92d1bcad5741c32c0029b3ed5128f67_full.jpg'
    },
    'Hello'
  );
}).add('With delete option', function () {
  return _react2.default.createElement(
    _chip2.default,
    {
      deletable: true,
      id: 'test',
      onDelete: (0, _addonActions.action)('Delete')
    },
    'Hello'
  );
}).add('Interactive', function () {
  return _react2.default.createElement(
    _chip2.default,
    {
      deletable: (0, _addonKnobs.boolean)('Deletable', false),
      id: 'test',
      onDelete: (0, _addonActions.action)('Delete')
    },
    (0, _addonKnobs.text)('Chip Content', 'Hello')
  );
});