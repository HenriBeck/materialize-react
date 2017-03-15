'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _tabs = require('./tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _tab = require('../tab');

var _tab2 = _interopRequireDefault(_tab);

var _enzyme = require('../../../../../../../../tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(props) {
  return (0, _enzyme.mount)(_react2.default.createElement(
    _tabs2.default,
    _extends({
      initialTabId: 'test1'
    }, props),
    _react2.default.createElement(
      _tab2.default,
      { id: 'test1' },
      'Test 1'
    ),
    _react2.default.createElement(
      _tab2.default,
      { id: 'test2' },
      'Test 2'
    )
  ));
}

(0, _ava2.default)('should throw an error if only one child is passed', function (t) {
  t.throws(function () {
    return _react2.default.createElement(
      _tabs2.default,
      { initialTabId: 'tab1' },
      _react2.default.createElement('div', null)
    );
  });
});

(0, _ava2.default)('should throw an error if a children is not a tab', function (t) {
  t.throws(function () {
    return _react2.default.createElement(
      _tabs2.default,
      { initialTabId: 'tab1' },
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null)
    );
  });
});

(0, _ava2.default)('should have a bar inside', function (t) {
  var wrapper = render();
  var bar = wrapper.find('.tabs--bar');

  t.deepEqual(bar.length, 1);
});

(0, _ava2.default)('should not have a bar inside if the noBar prop is true', function (t) {
  var wrapper = render({ noBar: true });
  var bar = wrapper.find('.tabs--bar');

  t.deepEqual(bar.length, 0);
});

(0, _ava2.default)('should not update anything if the tab changes but there is no bar', function (t) {
  var wrapper = render({ noBar: true });
  var instance = wrapper.instance();

  instance.handleTabChanged('test2');

  t.deepEqual(wrapper.state('selectedTab'), 'test2');
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

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 32 });

  t.deepEqual(wrapper.state('selectedTab'), 'test1');
});

(0, _ava2.default)('should update the buttons if the active button is not the same as the selected', function (t) {
  var wrapper = render();
  var instance = wrapper.instance();

  instance.focusedTab = 'test2';

  wrapper.simulate('keyDown', { keyCode: 32 });

  t.deepEqual(wrapper.state('selectedTab'), 'test2');
});

(0, _ava2.default)('should move the focus up and down the buttons', function (t) {
  var wrapper = render();
  var instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 39 });

  t.deepEqual(instance.focusedTab, 'test2');

  wrapper.simulate('keyUp');

  wrapper.simulate('keyDown', { keyCode: 37 });

  t.deepEqual(instance.focusedTab, 'test1');

  wrapper.simulate('blur');
});

(0, _ava2.default)('should not update the buttons if the key up event hasn\'t happened yet', function (t) {
  var wrapper = render();
  var instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 39 });

  t.deepEqual(instance.focusedTab, 'test2');

  wrapper.simulate('keyDown', { keyCode: 37 });

  t.deepEqual(instance.focusedTab, 'test2');
});