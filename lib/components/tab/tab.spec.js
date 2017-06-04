'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _tab = require('./tab');

var _tab2 = _interopRequireDefault(_tab);

var _enzyme = require('/tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a div with a span inside and the children inside', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _tab2.default,
    {
      id: 'test',
      active: true
    },
    'Content'
  ));
  var root = wrapper.find({ role: 'tab' });
  var span = root.find('.tab--content');

  t.deepEqual(root.length, 1);
  t.deepEqual(span.length, 1);
  t.deepEqual(span.text(), 'Content');
});

(0, _ava2.default)('should get the position of the tab', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _tab2.default,
    {
      id: 'test',
      active: true
    },
    'Content'
  ));
  var instance = wrapper.instance();

  t.true(_is_js2.default.json(instance.position));
});

(0, _ava2.default)('should update the state when the toggleFocus function is called', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _tab2.default,
    {
      id: 'test',
      active: true
    },
    'Content'
  ));
  var instance = wrapper.instance();

  instance.focus();

  t.deepEqual(wrapper.state('isFocused'), true);

  instance.blur();

  t.deepEqual(wrapper.state('isFocused'), false);
});

(0, _ava2.default)('should update the color of the content if the active prop changes', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _tab2.default,
    {
      id: 'test',
      active: true
    },
    'Content'
  ));
  var instance = wrapper.instance();
  var content = wrapper.find('.tab--content');

  wrapper.setProps({ active: false });

  t.deepEqual(content.node.style.color, instance.getColor(false));
});

(0, _ava2.default)('should call the onPress prop when the tab is clicked', function (t) {
  var onPress = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _tab2.default,
    {
      id: 'test',
      active: true,
      onPress: onPress
    },
    'Content'
  ));

  wrapper.simulate('mouseDown');

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('touchStart');

  t.deepEqual(onPress.callCount, 2);
  t.true(onPress.calledWithExactly('test'));
});

(0, _ava2.default)('should call the event handlers for onMouseDown and onTouchStart if an event happens', function (t) {
  var onTouchStart = _sinon2.default.spy();
  var onMouseDown = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _tab2.default,
    {
      id: 'test',
      active: true,
      onMouseDown: onMouseDown,
      onTouchStart: onTouchStart
    },
    'Content'
  ));

  wrapper.simulate('mouseDown');
  wrapper.simulate('touchStart');

  t.deepEqual(onMouseDown.callCount, 1);
  t.deepEqual(onTouchStart.callCount, 1);
});