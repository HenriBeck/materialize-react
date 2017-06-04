'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _fab = require('./fab');

var _fab2 = _interopRequireDefault(_fab);

var _enzyme = require('/tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a button', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, { icon: 'build' }));

  t.deepEqual(wrapper.find('button').length, 1);
});

(0, _ava2.default)('should have a ripple inside', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_fab2.default, { icon: 'build' }));

  t.deepEqual(wrapper.find('Ripple').length, 1);
});

(0, _ava2.default)('should animate the fab in', function (t) {
  (0, _enzyme.mount)(_react2.default.createElement(_fab2.default, {
    animateIn: true,
    icon: 'build'
  }));

  t.pass();
});

(0, _ava2.default)('should have a different size if the fab is in mini mode', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, {
    mini: true,
    icon: 'build'
  }));
  var button = wrapper.find('button').first();
  var instance = wrapper.instance();

  t.deepEqual(button.prop('style').height, instance.theme.miniSize);
  t.deepEqual(button.prop('style').width, instance.theme.miniSize);
});

(0, _ava2.default)('should set the aria-disabled prop to true', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, {
    disabled: true,
    icon: 'build'
  }));
  var button = wrapper.find('button').first();

  t.deepEqual(button.prop('aria-disabled'), true);
});

(0, _ava2.default)('should handle focus events correctly', function (t) {
  var onFocus = _sinon2.default.spy();
  var onBlur = _sinon2.default.spy();
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, {
    icon: 'build',
    onFocus: onFocus,
    onBlur: onBlur
  }));

  wrapper.simulate('focus');

  t.deepEqual(onFocus.callCount, 1);
  t.deepEqual(wrapper.state('focused'), true);

  wrapper.simulate('blur');

  t.deepEqual(onBlur.callCount, 1);
  t.deepEqual(wrapper.state('focused'), false);
});

(0, _ava2.default)('should handle touch events correctly', function (t) {
  var onTouchStart = _sinon2.default.spy();
  var onTouchEnd = _sinon2.default.spy();
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, {
    icon: 'build',
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd
  }));

  wrapper.simulate('touchStart');

  t.deepEqual(onTouchStart.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), true);

  wrapper.simulate('touchEnd');

  t.deepEqual(onTouchEnd.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), false);
});

(0, _ava2.default)('should handle mouse events correctly', function (t) {
  var onMouseDown = _sinon2.default.spy();
  var onMouseUp = _sinon2.default.spy();
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, {
    icon: 'build',
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp
  }));

  wrapper.simulate('mouseDown');

  t.deepEqual(onMouseDown.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), true);

  wrapper.simulate('mouseUp');

  t.deepEqual(onMouseUp.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), false);
});

(0, _ava2.default)('should not handle key events where the key codes don\'t match', function (t) {
  var onKeyDown = _sinon2.default.spy();
  var onKeyUp = _sinon2.default.spy();
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, {
    icon: 'build',
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp
  }));

  wrapper.simulate('keyDown');

  t.deepEqual(onKeyDown.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), false);
});

(0, _ava2.default)('should only handle key events where the key codes match', function (t) {
  var onKeyDown = _sinon2.default.spy();
  var onKeyUp = _sinon2.default.spy();
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, {
    icon: 'build',
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp
  }));

  t.plan(_fab2.default.keyCodes.length * 2);

  _fab2.default.keyCodes.forEach(function (keyCode, index) {
    wrapper.simulate('keyDown', { keyCode: keyCode });

    t.deepEqual(onKeyDown.callCount, index + 1);
    t.deepEqual(wrapper.state('pressed'), true);

    wrapper.simulate('keyUp');
  });
});

(0, _ava2.default)('should only update the state when a key is not already pressed', function (t) {
  var onPress = _sinon2.default.spy();
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, {
    icon: 'build',
    onPress: onPress
  }));

  wrapper.simulate('keyDown', { keyCode: _fab2.default.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('keyDown', { keyCode: _fab2.default.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);
});

(0, _ava2.default)('all events should work when no handlers are passed', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_fab2.default, { icon: 'build' }));

  wrapper.simulate('keyDown');
  wrapper.simulate('keyUp');

  wrapper.simulate('mouseDown');
  wrapper.simulate('mouseUp');

  wrapper.simulate('touchStart');
  wrapper.simulate('touchEnd');

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.pass();
});