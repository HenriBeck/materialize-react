'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _enzyme = require('../../../tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a span with a span inside', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkbox2.default, {
    checked: false,
    disabled: false
  }));
  var spans = wrapper.find('span');
  var children = spans.first().children();

  t.deepEqual(spans.length, 2);
  t.deepEqual(children.find('span').length, 1);
});

(0, _ava2.default)('should set the initial border color on mount', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkbox2.default, {
    checked: true,
    disabled: true
  }));
  var instance = wrapper.instance();

  t.deepEqual(instance.lastBorderColor, instance.colors.borderColor);
});

(0, _ava2.default)('should compute the colors of the checkbox based on the state', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkbox2.default, {
    checked: false,
    disabled: true
  }));
  var instance = wrapper.instance();
  var theme = instance.theme;

  t.deepEqual(instance.colors, {
    bgColor: theme.disabledBgColor,
    borderColor: theme.disabledBorderColor
  });

  wrapper.setProps({ checked: true });

  t.deepEqual(instance.colors, {
    bgColor: theme.disabledCheckedBgColor,
    borderColor: theme.disabledBorderColor
  });

  wrapper.setProps({ disabled: false });

  t.deepEqual(instance.colors, {
    bgColor: theme.checkedBgColor,
    borderColor: theme.checkedBorderColor
  });

  wrapper.setProps({ checked: false });

  t.deepEqual(instance.colors, {
    bgColor: theme.uncheckedBgColor,
    borderColor: theme.uncheckedBorderColor
  });
});

(0, _ava2.default)('should update the checkmark color to the parent color when the checkbox is disabled', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_checkbox2.default, {
    disabled: true,
    checked: false
  }));
  var instance = wrapper.instance();
  var checkmark = wrapper.find('.checkbox--checkmark').first();

  instance.parentBgColor = '#ffffff';
  instance.updateCheckmarkColor();

  t.deepEqual(checkmark.node.style['border-color'], instance.parentBgColor);
});