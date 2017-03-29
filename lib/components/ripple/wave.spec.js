'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _wave = require('./wave');

var _wave2 = _interopRequireDefault(_wave);

var _enzyme = require('../../../tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderWave() {
  var onFinish = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  return (0, _enzyme.mount)(_react2.default.createElement(_wave2.default, {
    id: 1,
    style: {},
    radius: 2,
    initialOpacity: 0.6,
    onFinish: onFinish
  }));
}

(0, _ava2.default)('should render a span', function (t) {
  var wrapper = renderWave();

  t.deepEqual(wrapper.find('span').length, 1);
});

(0, _ava2.default)('should animate the span to scale 1', function (t) {
  var wrapper = renderWave();
  var span = wrapper.find('span').first();

  t.deepEqual(span.node.style.transform, 'scale(1)');
});

(0, _ava2.default)('should fade the wave out when the upAction get\'s called', function (t) {
  var wrapper = renderWave();
  var instance = wrapper.instance();

  instance.upAction();

  var span = wrapper.find('span').first();

  t.deepEqual(span.node.style.opacity, '0');
});

(0, _ava2.default)('should call the onFinish function when the wave faded out', function (t) {
  var onFinish = _sinon2.default.spy();
  var wrapper = renderWave(onFinish);
  var instance = wrapper.instance();

  instance.upAction();

  instance.animation.onfinish();

  t.deepEqual(onFinish.callCount, 1);
});