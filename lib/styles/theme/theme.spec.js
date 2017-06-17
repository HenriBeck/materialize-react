'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _enzyme = require('enzyme');

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should just render the children passed to theme', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _theme2.default,
    null,
    _react2.default.createElement(
      'div',
      null,
      'Children'
    )
  ));

  t.deepEqual(wrapper.text(), 'Children');
});

(0, _ava2.default)('should have a theme object as the context', function (t) {
  var instance = (0, _enzyme.shallow)(_react2.default.createElement(
    _theme2.default,
    null,
    _react2.default.createElement(
      'div',
      null,
      'Children'
    )
  )).instance();

  t.true(_is_js2.default.json(instance.getChildContext().theme));
});

(0, _ava2.default)('should compile a theme', function (t) {
  var theme = (0, _theme.compileTheme)({}, { button: function button() {} });

  t.true(_is_js2.default.json(theme));
});