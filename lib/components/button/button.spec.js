'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('../../../tests/helpers/enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classes = {
  button: 'button',
  buttonPressed: 'button--pressed'
};

(0, _ava2.default)('should render the button', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_button2.default, null));

  t.deepEqual(wrapper.find('Jss(Button)').length, 1);
  t.deepEqual(wrapper.find('button').length, 1);
});

(0, _ava2.default)('should render the button with different styles', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_button2.default, { raised: true }));
  var button = wrapper.find('Button');
  var bgColor = function bgColor() {
    return button.prop('sheet').rules.map.button.renderable.style['background-color'];
  };
  var theme = wrapper.context('theme').button;

  t.deepEqual(bgColor(), theme.raisedBgColor);

  wrapper.setProps({ disabled: true });

  t.deepEqual(bgColor(), theme.raisedAndDisabledBgColor);

  wrapper.setProps({ raised: false });

  t.deepEqual(bgColor(), theme.disabledBgColor);
});

(0, _ava2.default)('should have tabIndex 0 when the button isn\'t disabled and -1 when isn\'t disabled', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_button.Button, {
    disabled: true,
    classes: classes
  }));
  var button = wrapper.find('button');

  t.deepEqual(button.prop('tabIndex'), -1);
  t.deepEqual(button.prop('aria-disabled'), true);
});

(0, _ava2.default)('should change the state when an interaction happens', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_button.Button, {
    raised: true,
    classes: classes
  }));

  wrapper.simulate('mouseDown');

  t.deepEqual(wrapper.state('pressed'), true);

  wrapper.simulate('mouseUp');

  t.deepEqual(wrapper.state('pressed'), false);
});

(0, _ava2.default)('should have a Ripple inside the button', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_button.Button, { classes: classes }));

  t.deepEqual(wrapper.find('RippleContainer').length, 1);
});

(0, _ava2.default)('should handle onFocus and onBlur events and add focus to the element', function (t) {
  var onFocus = _sinon2.default.spy();
  var onBlur = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_button.Button, {
    classes: classes,
    onFocus: onFocus,
    onBlur: onBlur
  }));

  wrapper.simulate('focus');

  t.deepEqual(onFocus.callCount, 1);

  wrapper.simulate('blur');

  t.deepEqual(onBlur.callCount, 1);
});

(0, _ava2.default)('should handle touch events and call the specific handlers', function (t) {
  var onTouchStart = _sinon2.default.spy();
  var onTouchEnd = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_button.Button, {
    classes: classes,
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd
  }));

  wrapper.simulate('touchStart');

  t.deepEqual(onTouchStart.callCount, 1);

  wrapper.simulate('touchEnd');

  t.deepEqual(onTouchEnd.callCount, 1);
});

(0, _ava2.default)('should not handle key events if the keyCode doesn\'t match', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_button.Button, { classes: classes }));

  wrapper.simulate('keyDown');

  t.deepEqual(wrapper.state('pressed'), false);
});

(0, _ava2.default)('should only handle key events where the key codes match', function (t) {
  var onPress = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_button.Button, {
    classes: classes,
    onPress: onPress
  }));

  t.plan(_button.Button.keyCodes.length);

  _button.Button.keyCodes.forEach(function (keyCode, index) {
    wrapper.simulate('keyDown', { keyCode: keyCode });

    t.deepEqual(onPress.callCount, index + 1);

    wrapper.simulate('keyUp');
  });
});

(0, _ava2.default)('should only update the state when a key is not already pressed', function (t) {
  var onPress = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_button.Button, {
    classes: classes,
    onPress: onPress
  }));

  wrapper.simulate('keyDown', { keyCode: _button.Button.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('keyDown', { keyCode: _button.Button.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);
});

(0, _ava2.default)('should handle mouse events and call the specific handlers', function (t) {
  var onMouseDown = _sinon2.default.spy();
  var onMouseUp = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_button.Button, {
    classes: classes,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp
  }));

  wrapper.simulate('mouseDown');

  t.deepEqual(onMouseDown.callCount, 1);

  wrapper.simulate('mouseUp');

  t.deepEqual(onMouseUp.callCount, 1);
});

(0, _ava2.default)('All default event handlers can be called', function (t) {
  _button.Button.defaultProps.onBlur();
  _button.Button.defaultProps.onFocus();

  _button.Button.defaultProps.onMouseDown();
  _button.Button.defaultProps.onMouseUp();

  _button.Button.defaultProps.onTouchStart();
  _button.Button.defaultProps.onTouchEnd();

  t.pass();
});