'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _iconButton = require('./icon-button');

var _iconButton2 = _interopRequireDefault(_iconButton);

var _enzyme = require('../../../tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render various elements and components', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_iconButton2.default, { icon: 'github' }));

  t.deepEqual(wrapper.find('Jss(IconButton)').length, 1);
  t.deepEqual(wrapper.find('Ripple').length, 1);
  t.deepEqual(wrapper.find('button').length, 1);
  t.deepEqual(wrapper.find('Icon').length, 1);
});

(0, _ava2.default)('should have aria-disabled and tabIndex of -1 when disabled', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_iconButton2.default, {
    disabled: true,
    icon: 'github'
  }));
  var button = wrapper.find('button').first();

  t.deepEqual(button.prop('aria-disabled'), true);
  t.deepEqual(button.prop('tabIndex'), -1);
});

(0, _ava2.default)('should call the event handlers when the mouse or a touch event happens', function (t) {
  var onMouseDown = _sinon2.default.spy();
  var onTouchStart = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_iconButton2.default, {
    icon: 'github',
    onMouseDown: onMouseDown,
    onTouchStart: onTouchStart
  }));

  wrapper.simulate('mouseDown');
  wrapper.simulate('touchStart');

  t.deepEqual(onMouseDown.callCount, 1);
  t.deepEqual(onTouchStart.callCount, 1);
});

(0, _ava2.default)('should call the onPress handler when a mouse or touch event happens', function (t) {
  var onPress = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_iconButton2.default, {
    icon: 'github',
    onPress: onPress
  }));

  wrapper.simulate('mouseDown');

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('touchStart');

  t.deepEqual(onPress.callCount, 2);
});

(0, _ava2.default)('should add and remove the focus from the ripple', function (t) {
  var onFocus = _sinon2.default.spy();
  var onBlur = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_iconButton2.default, {
    icon: 'github',
    onFocus: onFocus,
    onBlur: onBlur
  }));

  wrapper.simulate('focus');

  t.deepEqual(onFocus.callCount, 1);

  wrapper.simulate('blur');

  t.deepEqual(onBlur.callCount, 1);
});

(0, _ava2.default)('should not call the onPress handler when the keyCode isn\'t specified', function (t) {
  var onPress = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_iconButton2.default, {
    icon: 'github',
    onPress: onPress
  }));

  wrapper.simulate('keyDown');

  t.deepEqual(onPress.callCount, 0);
});

(0, _ava2.default)('should only call the onPress handler when the keyCode is specified and valid', function (t) {
  var onPress = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_iconButton2.default, {
    icon: 'github',
    onPress: onPress
  }));

  t.plan(_iconButton.IconButton.keyCodes.length);

  _iconButton.IconButton.keyCodes.forEach(function (keyCode, index) {
    wrapper.simulate('keyDown', { keyCode: keyCode });

    t.deepEqual(onPress.callCount, index + 1);

    wrapper.simulate('keyUp');
  });
});

(0, _ava2.default)('should not call the onPress handler again if the keyUp handler hasn\'t been called', function (t) {
  var onPress = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_iconButton2.default, {
    icon: 'github',
    onPress: onPress
  }));
  var keyCode = _iconButton.IconButton.keyCodes[0];

  wrapper.simulate('keyDown', { keyCode: keyCode });

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('keyDown', { keyCode: keyCode });

  t.deepEqual(onPress.callCount, 1);
});

(0, _ava2.default)('should be able to call the default event handlers', function (t) {
  _iconButton.IconButton.defaultProps.onFocus();
  _iconButton.IconButton.defaultProps.onBlur();
  _iconButton.IconButton.defaultProps.onPress();
  _iconButton.IconButton.defaultProps.onKeyDown();
  _iconButton.IconButton.defaultProps.onKeyUp();
  _iconButton.IconButton.defaultProps.onTouchStart();
  _iconButton.IconButton.defaultProps.onMouseDown();

  t.pass();
});