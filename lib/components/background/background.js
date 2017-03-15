'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Background(_ref, _ref2) {
  var theme = _ref2.theme;

  var style = _ref.style,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ['style', 'children']);

  return _react2.default.createElement(
    'div',
    _extends({
      style: _extends({
        color: theme.variables.textColor,
        backgroundColor: theme.variables.backgroundColor
      }, style)
    }, props),
    children
  );
}

Background.propTypes = {
  children: _react.PropTypes.node.isRequired,
  style: _react.PropTypes.object
};

Background.defaultProps = { style: {} };

Background.contextTypes = { theme: _react.PropTypes.object };

exports.default = Background;