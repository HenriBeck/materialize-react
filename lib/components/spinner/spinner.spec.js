'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('../../../../../../../../tests/helpers/enzyme');

var _spinner = require('./spinner');

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a div with an svg inside', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_spinner2.default, null));
  var children = wrapper.find('.spinner').children();

  t.deepEqual(children.length, 1);
  t.deepEqual(children.children().length, 1);
});

(0, _ava2.default)('should fade in the animation when the active prop is passed', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_spinner2.default, { active: true }));
  var root = wrapper.find('.spinner');

  t.deepEqual(root.node.style.opacity, '1');
});

(0, _ava2.default)('should fade in/out the animation when the active prop is changed', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_spinner2.default, { active: true }));
  var root = wrapper.find('.spinner');

  t.deepEqual(root.node.style.opacity, '1');

  wrapper.setProps({ active: false });

  t.deepEqual(root.node.style.opacity, '0');

  wrapper.setProps({ active: true });

  t.deepEqual(root.node.style.opacity, '1');
});

(0, _ava2.default)('should not update the opacity of the spinner and only add the new styles', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_spinner2.default, { active: true }));

  wrapper.setProps({ style: { height: '64px' } });

  var div = wrapper.find('.spinner');

  t.deepEqual(div.node.style.height, '64px');
  t.deepEqual(div.node.style.opacity, '1');
});