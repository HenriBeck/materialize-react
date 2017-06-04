'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _enzyme = require('/tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return an i tag if the icon isn\'t a custom icon', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_icon2.default, { icon: 'github' }));

  t.deepEqual(wrapper.find('i').length, 1);
});

(0, _ava2.default)('should have the iconColor of the theme when the icon isn\'t disabled', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_icon2.default, { icon: 'github' }));
  var iconProps = wrapper.find('i').first().props();
  var theme = wrapper.context('theme');

  t.deepEqual(iconProps.style.color, theme.icon.color);
});

(0, _ava2.default)('should have the disabledColor of the theme when the icon isn\'t disabled', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_icon2.default, {
    disabled: true,
    icon: 'github'
  }));
  var iconProps = wrapper.find('i').first().props();
  var theme = wrapper.context('theme');

  t.deepEqual(iconProps.style.color, theme.icon.disabledColor);
});