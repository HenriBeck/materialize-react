'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('../../../../../../../../tests/helpers/enzyme');

var _parallax = require('./parallax');

var _parallax2 = _interopRequireDefault(_parallax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a div with an img and a div inside', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_parallax2.default, { img: 'image' }));

  t.deepEqual(wrapper.find('img').length, 1);
  t.deepEqual(wrapper.find('.parallax--content').length, 1);
});

(0, _ava2.default)('should not calculate the position if onScroll get\'s called twice', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_parallax2.default, { img: 'image' }));
  var instance = wrapper.instance();

  instance.onScroll();
  instance.onScroll();

  t.pass();
});

(0, _ava2.default)('should not update the scroll pos when the image isn\'t visible', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_parallax2.default, { img: 'image' }));
  var instance = wrapper.instance();

  window.innerHeight = -100;

  t.deepEqual(instance.isVisible, false);

  instance.onScroll();
});

(0, _ava2.default)('should remove the event listener when the node get\'s unmounted', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_parallax2.default, { img: 'image' }));
  var removeEventListener = _sinon2.default.spy(window, 'removeEventListener');

  wrapper.unmount();

  t.deepEqual(removeEventListener.callCount, 1);
});