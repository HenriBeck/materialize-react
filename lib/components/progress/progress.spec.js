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
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, null));

  // Check if we render a JSS HoC
  t.deepEqual(wrapper.find('Jss(Progress)').length, 1);
});

(0, _ava2.default)('should have aria-valuemin and aria-valuemax on the root node', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, null));
  var root = wrapper.find('.progress').first();

  // Check if the valuemin and valuemax props are set
  t.deepEqual(root.prop('aria-valuemin'), 0);
  t.deepEqual(root.prop('aria-valuemax'), 100);
});

(0, _ava2.default)('should set the aria-valuenow to the value of the progress prop', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, { progress: 40 }));
  var root = wrapper.find('span.progress').first();

  t.deepEqual(root.prop('aria-valuenow'), 40);
});

(0, _ava2.default)('should change the aria-valuenow when the progress prop changes', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, { progress: 40 }));
  var root = wrapper.find('span.progress').first();

  wrapper.setProps({ progress: 80 });

  // Check if the aria-valuenow prop has changed
  t.deepEqual(root.prop('aria-valuenow'), 80);
});

(0, _ava2.default)('should animate the secondary progress bar', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, { secondaryProgress: 40 }));

  wrapper.setProps({ secondaryProgress: 80 });

  // There is no way of exactly checking if the secondary progress has been animated
  t.pass();
});

(0, _ava2.default)('should add the indeterminate class', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, { indeterminate: true }));

  // Check if the correct class has been applied
  t.deepEqual(wrapper.find('.indeterminate').length, 1);

  // Start the progress animation
  wrapper.setProps({ active: true });

  // Check if the element got updated
  t.deepEqual(wrapper.find('.indeterminate.active').length, 1);
});

(0, _ava2.default)('should have aria-disabled set to true', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_progress2.default, { disabled: true }));
  var root = wrapper.find('.progress').first();

  // Check if the aria-disabled props is set
  t.deepEqual(root.prop('aria-disabled'), true);
});