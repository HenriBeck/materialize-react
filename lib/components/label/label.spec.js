'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _enzyme = require('/tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a label tag with the children inside', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _label2.default,
    { 'for': 'some' },
    'Content'
  ));

  t.deepEqual(wrapper.find('label').length, 1);
  t.deepEqual(wrapper.find('label').text(), 'Content');
});