'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Divider;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Divider(_ref, _ref2) {
  var theme = _ref2.theme;

  var style = _ref.style,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ['style', 'className']);

  return _react2.default.createElement('div', _extends({
    className: 'divider ' + className,
    style: _extends({
      height: theme.divider.height,
      backgroundColor: theme.divider.backgroundColor
    }, style)
  }, props));
}

Divider.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string
};

Divider.defaultProps = {
  style: {},
  className: ''
};

Divider.contextTypes = { theme: _react.PropTypes.object };