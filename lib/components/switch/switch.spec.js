'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('../../../tests/helpers/enzyme');

var _switch = require('./switch');

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a button', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_switch2.default, { name: 'test' }));

  t.deepEqual(wrapper.find('button').length, 1);
});

(0, _ava2.default)('should have the toggled state set to true when defaultToggled prop is passed', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_switch2.default, {
    defaultToggled: true,
    name: 'test'
  }));

  t.deepEqual(wrapper.state('toggled'), true);
});

(0, _ava2.default)('should update the component when the disabled prop changes', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_switch2.default, { name: 'test' }));

  wrapper.setProps({ disabled: true });

  t.deepEqual(wrapper.find('button').prop('tabIndex'), -1);
});

(0, _ava2.default)('should not update the elements when neither the state or the disabled prop changes', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_switch2.default, { name: 'test' }));

  wrapper.setProps({ name: 'test2' });

  t.pass();
});

(0, _ava2.default)('should be able to add focus and remove it and call the handler', function (t) {
  var onFocus = _sinon2.default.spy();
  var onBlur = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_switch2.default, {
    name: 'test',
    onFocus: onFocus,
    onBlur: onBlur
  }));

  wrapper.simulate('focus');

  t.deepEqual(onFocus.callCount, 1);

  wrapper.simulate('blur');

  t.deepEqual(onBlur.callCount, 1);
});

(0, _ava2.default)('focus events should work with no event handlers', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_switch2.default, { name: 'test' }));

  wrapper.simulate('focus');

  wrapper.simulate('blur');

  t.pass();
});

(0, _ava2.default)('should not toggle the button when no keyCode is provided', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_switch2.default, { name: 'test' }));

  wrapper.simulate('keyDown');

  t.deepEqual(wrapper.state('toggled'), false);
});

(0, _ava2.default)('should only update the state when a valid key is pressed', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_switch2.default, { name: 'test' }));

  t.plan(_switch2.default.keyCodes.length);

  _switch2.default.keyCodes.forEach(function (keyCode, index) {
    wrapper.simulate('keyDown', { keyCode: keyCode });

    t.deepEqual(wrapper.state('toggled'), index % 2 === 0);

    wrapper.simulate('keyUp');
  });
});