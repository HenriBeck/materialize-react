'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _divider = require('./divider');

var _divider2 = _interopRequireDefault(_divider);

var _enzyme = require('../../../tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render the a div', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_divider2.default, null));

  t.deepEqual(wrapper.find('Jss(Divider)').length, 1);
  t.deepEqual(wrapper.find('div.divider').length, 1);
});