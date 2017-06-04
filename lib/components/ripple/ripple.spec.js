'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ripple = require('./ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _wave = require('./wave');

var _wave2 = _interopRequireDefault(_wave);

var _enzyme = require('../../../tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {
  waves: [],
  initialOpacity: 0.25,
  classes: {},
  className: '',
  isFocused: false,
  focusOpacity: 0.2,
  focusColor: '',
  round: false,
  onDownAction: function onDownAction() {},
  onAnimationFinish: function onAnimationFinish() {},
  onMouseDown: function onMouseDown() {},
  onMouseUp: function onMouseUp() {},
  onTouchStart: function onTouchStart() {},
  onTouchEnd: function onTouchEnd() {}
};

(0, _ava2.default)('should render a span with the riplpe class', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, defaultProps));

  t.deepEqual(wrapper.find('span.ripple').length, 1);
});

(0, _ava2.default)('should call the mouse event handler', function (t) {
  var onMouseDown = _sinon2.default.spy();
  var onMouseUp = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, _extends({}, defaultProps, {
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp
  })));
  var rootNode = wrapper.find('.ripple').first();

  rootNode.simulate('mouseDown');

  t.deepEqual(onMouseDown.callCount, 1);

  rootNode.simulate('mouseUp');

  t.deepEqual(onMouseUp.callCount, 1);
});

(0, _ava2.default)('should call the touch event handler', function (t) {
  var onTouchStart = _sinon2.default.spy();
  var onTouchEnd = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, _extends({}, defaultProps, {
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd
  })));
  var rootNode = wrapper.find('.ripple').first();

  rootNode.simulate('touchStart');

  t.deepEqual(onTouchStart.callCount, 1);

  rootNode.simulate('touchEnd');

  t.deepEqual(onTouchEnd.callCount, 1);
});

(0, _ava2.default)('should render a Wave component', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ripple2.default, _extends({}, defaultProps, {
    waves: [{
      id: 1,
      style: {},
      radius: 5
    }]
  })));
  var rootNode = wrapper.find('.ripple').first();

  rootNode.simulate('touchEnd');

  t.deepEqual(wrapper.find(_wave2.default).length, 1);
});