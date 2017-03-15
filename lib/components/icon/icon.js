'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Icon;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Icon(_ref, _ref2) {
  var theme = _ref2.theme;

  var icon = _ref.icon,
      className = _ref.className,
      disabled = _ref.disabled,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ['icon', 'className', 'disabled', 'style']);

  return _react2.default.createElement('i', _extends({
    className: 'icon mdi mdi-24px mdi-' + icon + ' ' + className,
    style: _extends({
      color: disabled ? theme.icon.disabledColor : theme.icon.color,
      lineHeight: 1
    }, style)
  }, props));
}

Icon.propTypes = {
  icon: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  style: _react.PropTypes.object
};

Icon.defaultProps = {
  className: '',
  disabled: false,
  style: {}
};

Icon.contextTypes = { theme: _react.PropTypes.object };