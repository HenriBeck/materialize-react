'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _chip = require('./chip');

var _chip2 = _interopRequireDefault(_chip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('Chip', module).add('Default styles', function () {
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
      onDelete: (0, _storybook.action)('Delete')
    },
    'Hello'
  );
}).add('With delete option', function () {
  return _react2.default.createElement(
    _chip2.default,
    {
      deletable: true,
      id: 'test',
      img: {
        color: 'blue',
        text: 'ab',
        textColor: 'white'
      },
      onDelete: (0, _storybook.action)('Delete')
    },
    'Hello'
  );
});