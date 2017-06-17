'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _enzyme = require('../../../tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a label tag with the children inside', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _label2.default,
    { 'for': 'some' },
    'Content'
  ));

  t.deepEqual(wrapper.find('Jss(Label)').length, 1);
  t.deepEqual(wrapper.find('label').length, 1);
  t.deepEqual(wrapper.find('label').text(), 'Content');
});

(0, _ava2.default)('should render different styles when disabled', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _label2.default,
    {
      'for': 'some',
      disabled: true
    },
    'Content'
  ));
  var color = wrapper.find('Label').prop('sheet').rules.map.label.renderable.style.color;
  var theme = wrapper.context('theme').label;

  t.deepEqual(color, theme.disabledColor);
});