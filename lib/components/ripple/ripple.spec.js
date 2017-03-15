'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('../../../../../../../../tests/helpers/enzyme');

var _ripple = require('./ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render 3 spans', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, null));

  t.deepEqual(wrapper.find('span').length, 3);
});

(0, _ava2.default)('should increment the zIndex of the parent with 1 so the ripple is always on top', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, { style: { zIndex: 5 } }));
  var root = wrapper.find('.ripple');

  t.deepEqual(root.node.style['z-index'], '6');
});

(0, _ava2.default)('should add pointerEvents none to the root when the nowaves prop is passed', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, { nowaves: true }));
  var root = wrapper.find('.ripple');

  t.deepEqual(root.prop('style').pointerEvents, 'none');
});

(0, _ava2.default)('should be able to add focus to the ripple', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, null));
  var instance = wrapper.instance();

  instance.addFocus();

  var span = wrapper.find('.ripple--focus');

  t.deepEqual(instance.isFocused, true);
  t.deepEqual(span.node.style.opacity, String(instance.props.focusOpacity));
});

(0, _ava2.default)('should scale the ripple in when the ripple is round', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, { round: true }));
  var instance = wrapper.instance();

  instance.addFocus();

  var span = wrapper.find('.ripple--focus');

  t.deepEqual(span.node.style.transform, 'scale(1)');

  instance.removeFocus();

  t.deepEqual(span.node.style.transform, 'scale(0)');
});

(0, _ava2.default)('should be able to remove the focus', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, null));
  var instance = wrapper.instance();

  instance.addFocus();

  instance.removeFocus();

  var span = wrapper.find('.ripple--focus');

  t.deepEqual(instance.isFocused, false);
  t.deepEqual(span.node.style.opacity, '0');
});

(0, _ava2.default)('should not fade the focus element in when the element is already in focus state', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, null));
  var instance = wrapper.instance();

  instance.addFocus();

  instance.addFocus();

  t.deepEqual(instance.isFocused, true);
});

(0, _ava2.default)('should only fade out the focus element when the element is already in focus state', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, null));
  var instance = wrapper.instance();

  instance.removeFocus();

  t.deepEqual(instance.isFocused, false);
});

(0, _ava2.default)('should be able to change the focus color', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, null));
  var instance = wrapper.instance();

  instance.focusColor = 'black';

  var span = wrapper.find('.ripple--focus');

  t.deepEqual(span.node.style['background-color'], 'black');

  instance.addFocus();

  instance.focusColor = 'white';

  t.deepEqual(span.node.style['background-color'], 'white');
});

(0, _ava2.default)('should add the ripple where the user clicked', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, null));

  wrapper.simulate('mouseDown', {
    x: 10,
    y: 10
  });

  var radius = wrapper.find('Wave').prop('radius');

  t.notDeepEqual(radius, 0);
});

(0, _ava2.default)('should handle touch start event and add a wave', function (t) {
  var onTouchStart = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, { onTouchStart: onTouchStart }));

  wrapper.simulate('touchStart');

  t.deepEqual(onTouchStart.callCount, 1);
  t.deepEqual(wrapper.state('waves').length, 1);
});

(0, _ava2.default)('should handle touch end event and add remove the wave', function (t) {
  var onTouchEnd = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, { onTouchEnd: onTouchEnd }));
  var instance = wrapper.instance();

  wrapper.simulate('touchStart');

  wrapper.simulate('touchEnd');

  instance.waves['1'].animation.onfinish();

  t.deepEqual(onTouchEnd.callCount, 1);
  t.deepEqual(wrapper.state('waves').length, 0);
});

(0, _ava2.default)('should handle mouse down event and add a wave', function (t) {
  var onMouseDown = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, { onMouseDown: onMouseDown }));

  wrapper.simulate('mouseDown');

  t.deepEqual(onMouseDown.callCount, 1);
  t.deepEqual(wrapper.state('waves').length, 1);
});

(0, _ava2.default)('should handle mouse up event and add remove the wave', function (t) {
  var onMouseUp = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, { onMouseUp: onMouseUp }));
  var instance = wrapper.instance();

  wrapper.simulate('mouseDown');

  wrapper.simulate('mouseUp');

  instance.waves['1'].animation.onfinish();

  t.deepEqual(onMouseUp.callCount, 1);
  t.deepEqual(wrapper.state('waves').length, 0);
});

(0, _ava2.default)('should work without providing event handlers', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, null));

  wrapper.simulate('mouseDown');
  wrapper.simulate('mouseUp');

  wrapper.simulate('touchStart');
  wrapper.simulate('touchEnd');

  t.pass();
});