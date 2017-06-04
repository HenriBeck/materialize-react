'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('../../../tests/helpers/enzyme');

var _wave = require('./wave');

var _wave2 = _interopRequireDefault(_wave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {
  classes: { wave: 'wave' },
  id: 1,
  style: {},
  radius: 2,
  initialOpacity: 0.25,
  onFinish: function onFinish() {}
};

(0, _ava2.default)('should render a span', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_wave2.default, defaultProps));

  t.deepEqual(wrapper.find('span').length, 1);
});

(0, _ava2.default)('animate the wave out', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_wave2.default, defaultProps));
  var instance = wrapper.instance();

  instance.startFadeOutAnimation();

  t.true(Boolean(instance.animation));
});

(0, _ava2.default)('should call the onFinish handler', function (t) {
  var props = _extends({}, defaultProps, {
    onFinish: _sinon2.default.spy()
  });
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_wave2.default, props));
  var instance = wrapper.instance();

  instance.startFadeOutAnimation();

  instance.animation.onfinish();

  t.deepEqual(props.onFinish.callCount, 1);
});