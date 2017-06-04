'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _checkboxContainer = require('./checkbox-container');

var _checkboxContainer2 = _interopRequireDefault(_checkboxContainer);

var _enzyme = require('/tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a button', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_checkboxContainer2.default, { name: 'test' }));

  t.deepEqual(wrapper.find('button').length, 1);
});

(0, _ava2.default)('should get and set the state with the checked property', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkboxContainer2.default, { name: 'test' }));
  var instance = wrapper.instance();

  instance.checked = true;

  t.deepEqual(wrapper.state('checked'), true);

  instance.checked = false;

  t.deepEqual(wrapper.state('checked'), false);

  wrapper.setProps({ disabled: true });
});

(0, _ava2.default)('should get the current state with the checked property', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkboxContainer2.default, { name: 'test' }));
  var instance = wrapper.instance();

  t.deepEqual(instance.checked, false);
});

(0, _ava2.default)('should have a negative tabIndex and aria-disabled set to true when it\'s disabled', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_checkboxContainer2.default, {
    disabled: true,
    name: 'test'
  }));
  var checkbox = wrapper.find('.checkbox').first();

  t.deepEqual(checkbox.prop('aria-disabled'), true);
  t.deepEqual(checkbox.prop('tabIndex'), -1);
});

(0, _ava2.default)('should have the checked state set to true when the defaultChecked prop is passed', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_checkboxContainer2.default, {
    defaultChecked: true,
    name: 'test'
  }));

  t.deepEqual(wrapper.state('checked'), true);
});

(0, _ava2.default)('should add focus the the ripple and remove it', function (t) {
  var addFocus = _sinon2.default.spy();
  var removeFocus = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkboxContainer2.default, { name: 'test' }));
  var instance = wrapper.instance();

  instance.ripple.addFocus = addFocus;
  instance.ripple.removeFocus = removeFocus;

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.deepEqual(addFocus.callCount, 1);
  t.deepEqual(removeFocus.callCount, 1);
});

(0, _ava2.default)('should not update the state when there is no keyCode in a key event', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkboxContainer2.default, { name: 'test' }));

  wrapper.simulate('keyDown');

  t.deepEqual(wrapper.state('checked'), false);
});

(0, _ava2.default)('should only update the state when the key is a valid keyCode', function (t) {
  var onKeyDown = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkboxContainer2.default, {
    name: 'test',
    onKeyDown: onKeyDown
  }));

  t.plan(_checkboxContainer2.default.keyCodes.length * 2);

  _checkboxContainer2.default.keyCodes.forEach(function (keyCode, index) {
    wrapper.simulate('keyDown', { keyCode: keyCode });

    t.deepEqual(onKeyDown.callCount, index + 1);
    t.deepEqual(wrapper.state('checked'), true);

    wrapper.simulate('keyUp');
  });
});

(0, _ava2.default)('should not update the state when the keyUp event hasn\'t fired yet', function (t) {
  var onChange = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkboxContainer2.default, {
    name: 'test',
    onChange: onChange
  }));

  wrapper.simulate('keyDown', { keyCode: _checkboxContainer2.default.keyCodes[0] });

  t.deepEqual(onChange.callCount, 1);

  wrapper.simulate('keyDown', { keyCode: _checkboxContainer2.default.keyCodes[0] });

  t.deepEqual(onChange.callCount, 1);
});