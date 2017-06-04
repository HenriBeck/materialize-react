'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _radioButton = require('./radio-button');

var _radioButton2 = _interopRequireDefault(_radioButton);

var _enzyme = require('/tests/helpers/enzyme');

var _hexToRgba = require('/src/styles/functions/hex-to-rgba');

var _hexToRgba2 = _interopRequireDefault(_hexToRgba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a button', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_radioButton2.default, { name: 'test' }));

  t.deepEqual(wrapper.find('button').length, 1);
});

(0, _ava2.default)('should animate the circle in when defaultOn is passed', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_radioButton2.default, {
    defaultOn: true,
    name: 'test'
  }));

  t.deepEqual(wrapper.state('on'), true);
  var circle = wrapper.find('.radio-button--circle');

  t.deepEqual(circle.node.style.transform, 'scale(1)');
});

(0, _ava2.default)('should animate the circle out when the state changes', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_radioButton2.default, {
    defaultOn: true,
    name: 'test'
  }));
  var instance = wrapper.instance();

  instance.on = false;

  var circle = wrapper.find('.radio-button--circle');

  t.deepEqual(circle.node.style.transform, 'scale(0)');
});

(0, _ava2.default)('should be able to change the state with the on property', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_radioButton2.default, { name: 'test' }));
  var instance = wrapper.instance();

  instance.on = true;

  t.deepEqual(wrapper.state('on'), true);
});

(0, _ava2.default)('should aria-disabled and tabIndex of -1 set when the button is disabled', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_radioButton2.default, {
    disabled: true,
    name: 'test'
  }));
  var button = wrapper.find('button');

  t.deepEqual(button.prop('aria-disabled'), true);
});

(0, _ava2.default)('should update the circle color when the disabled prop changes', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_radioButton2.default, { name: 'test' }));
  var theme = wrapper.instance().theme;
  var circle = wrapper.find('.radio-button--circle');

  wrapper.setProps({ disabled: true });

  t.deepEqual(circle.node.style.backgroundColor, theme.disabledColor);

  wrapper.setProps({ disabled: false });

  t.deepEqual(circle.node.style.backgroundColor, (0, _hexToRgba2.default)(theme.onColor, false));
});

(0, _ava2.default)('should not update anything special if the state or the disabled prop not changes', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_radioButton2.default, { name: 'test' }));

  wrapper.setProps({ labelPosition: 'left' });

  t.pass();
});

(0, _ava2.default)('should not update the state if the button is already toggled', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_radioButton2.default, { name: 'test' }));
  var container = wrapper.find('.radio-button--container');

  container.simulate('mouseDown');
  container.simulate('mouseDown');

  t.deepEqual(wrapper.state('on'), true);
});

(0, _ava2.default)('should add and remove focus of the ripple', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_radioButton2.default, { name: 'test' }));
  var instance = wrapper.instance();

  instance.ripple.addFocus = _sinon2.default.spy();
  instance.ripple.removeFocus = _sinon2.default.spy();

  instance.focus();
  instance.blur();

  t.deepEqual(instance.ripple.addFocus.callCount, 1);
  t.deepEqual(instance.ripple.removeFocus.callCount, 1);
});