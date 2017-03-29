'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _progress = require('./progress');

var _progress2 = _interopRequireDefault(_progress);

var _enzyme = require('../../../tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should have a root node with the role of progressbar', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_progress2.default, null));

  // Check if we have a element with the role of progressbar
  t.deepEqual(wrapper.find({ role: 'progressbar' }).length, 1);
});

(0, _ava2.default)('should have aria-valuemin and aria-valuemax on the root node', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_progress2.default, { mode: 'normal' }));
  var root = wrapper.find({ role: 'progressbar' });

  // Check if the valuemin and valuemax props are set
  t.deepEqual(root.prop('aria-valuemin'), 0);
  t.deepEqual(root.prop('aria-valuemax'), 100);
});

(0, _ava2.default)('should set the aria-valuenow to the value of the progress prop', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, { progress: 40 }));
  var root = wrapper.find({ role: 'progressbar' });

  t.deepEqual(root.prop('aria-valuenow'), 40);
});

(0, _ava2.default)('should change the aria-valuenow when the progress prop changes', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, { progress: 40 }));

  wrapper.setProps({ progress: 80 });

  var root = wrapper.find({ role: 'progressbar' });

  t.deepEqual(root.prop('aria-valuenow'), 80);
});

(0, _ava2.default)('should have two children when the mode is set to indeterminate', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, { mode: 'indeterminate' }));

  t.deepEqual(wrapper.find({ role: 'progressbar' }).children().length, 2);
});

(0, _ava2.default)('should animate the bar in if the active state changes to true', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, {
    active: true,
    mode: 'indeterminate'
  }));
  var bar = wrapper.find({ role: 'progressbar' }).children().find('span').first();

  wrapper.setProps({ active: false });

  t.deepEqual(bar.node.style.opacity, '0');

  wrapper.setProps({ active: true });

  t.deepEqual(bar.node.style.opacity, '1');
});

(0, _ava2.default)('should not start the animations on mount if the progress isn\'t active', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, { mode: 'indeterminate' }));
  var instance = wrapper.instance();

  t.deepEqual(instance.barAnimation, null);
  t.deepEqual(instance.indeterminateAnimation, null);

  wrapper.setProps({ active: true });

  t.notDeepEqual(instance.barAnimation, null);
  t.notDeepEqual(instance.indeterminateAnimation, null);
});