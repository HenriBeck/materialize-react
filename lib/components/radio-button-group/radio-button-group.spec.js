'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('../../../../../../../../tests/helpers/enzyme');

var _radioButtonGroup = require('./radio-button-group');

var _radioButtonGroup2 = _interopRequireDefault(_radioButtonGroup);

var _radioButton = require('../radio-button');

var _radioButton2 = _interopRequireDefault(_radioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _enzyme.mount)(_react2.default.createElement(
    _radioButtonGroup2.default,
    _extends({
      name: 'test',
      defaultSelected: 'test1'
    }, props),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'test1' },
      'Test 1'
    ),
    _react2.default.createElement(
      _radioButton2.default,
      { name: 'test2' },
      'Test 2'
    )
  ));
}

(0, _ava2.default)('should render a div with a role of radiogroup', function (t) {
  var wrapper = render();

  t.deepEqual(wrapper.find({ role: 'radiogroup' }).length, 1);
});

(0, _ava2.default)('should throw an error if only one or less RadioButton\'s are passed', function (t) {
  t.throws(function () {
    return _react2.default.createElement(
      _radioButtonGroup2.default,
      {
        name: 'test',
        defaultSelected: 'test1'
      },
      _react2.default.createElement(_radioButton2.default, { name: 'test1' })
    );
  });
});

(0, _ava2.default)('should also include other type of elements', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _radioButtonGroup2.default,
    {
      name: 'test',
      defaultSelected: 'test1'
    },
    _react2.default.createElement(_radioButton2.default, { name: 'test1' }),
    _react2.default.createElement(_radioButton2.default, { name: 'test2' }),
    _react2.default.createElement(
      'div',
      null,
      'Content'
    )
  ));

  t.true(wrapper.contains(_react2.default.createElement(
    'div',
    null,
    'Content'
  )));
});

(0, _ava2.default)('should update the group when a radio button is changed', function (t) {
  var wrapper = render();
  var instance = wrapper.instance();
  var radioButton = wrapper.find('RadioButton').last().find('.radio-button--container');

  radioButton.simulate('mouseDown');

  t.deepEqual(instance.selectedButton, 'test2');
});

(0, _ava2.default)('should not call the onChange function when the handleChange function is', function (t) {
  var onChange = _sinon2.default.spy();
  var wrapper = render({ onChange: onChange });
  var instance = wrapper.instance();

  instance.handleChange('test2', false);
  instance.handleChange('test1', true);

  t.deepEqual(onChange.callCount, 1);
  t.true(onChange.calledWith('test', 'test1'));
});

(0, _ava2.default)('should focus/blur the currently selected button when the group receives an event', function (t) {
  var props = {
    onFocus: _sinon2.default.spy(),
    onBlur: _sinon2.default.spy()
  };
  var wrapper = render(props);

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.deepEqual(props.onFocus.callCount, 1);
  t.deepEqual(props.onBlur.callCount, 1);
});

(0, _ava2.default)('should call the key down and up handler', function (t) {
  var props = {
    onKeyDown: _sinon2.default.spy(),
    onKeyUp: _sinon2.default.spy()
  };
  var wrapper = render(props);

  wrapper.simulate('keyDown');
  wrapper.simulate('keyUp');

  t.deepEqual(props.onKeyDown.callCount, 1);
  t.deepEqual(props.onKeyUp.callCount, 1);
});

(0, _ava2.default)('should not update the buttons if the active button is the same as the selected', function (t) {
  var wrapper = render();
  var instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 32 });

  t.deepEqual(instance.selectedButton, 'test1');
});

(0, _ava2.default)('should update the buttons if the active button is not the same as the selected', function (t) {
  var wrapper = render();
  var instance = wrapper.instance();

  instance.focusedButton = 'test2';

  wrapper.simulate('keyDown', { keyCode: 32 });

  t.deepEqual(instance.selectedButton, 'test2');
});

(0, _ava2.default)('should move the focus up and down the buttons', function (t) {
  var wrapper = render();
  var instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 40 });

  t.deepEqual(instance.focusedButton, 'test2');

  wrapper.simulate('keyUp');

  wrapper.simulate('keyDown', { keyCode: 38 });

  t.deepEqual(instance.focusedButton, 'test1');

  wrapper.simulate('blur');
});

(0, _ava2.default)('should not update the focusedButton if the target element is the button group', function (t) {
  var wrapper = render();
  var instance = wrapper.instance();

  wrapper.simulate('focus', { target: { id: 'id' } });

  t.deepEqual(instance.focusedButton, null);

  wrapper.simulate('blur', { target: { id: 'id' } });
});

(0, _ava2.default)('should not update the buttons if the key up event hasn\'t happened yet', function (t) {
  var wrapper = render();
  var instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 40 });

  t.deepEqual(instance.focusedButton, 'test2');

  wrapper.simulate('keyDown', { keyCode: 38 });

  t.deepEqual(instance.focusedButton, 'test2');
});