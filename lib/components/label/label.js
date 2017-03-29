'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Label;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _stylesheet = require('../../styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Label(_ref, _ref2) {
  var theme = _ref2.theme;

  var children = _ref.children,
      style = _ref.style,
      className = _ref.className,
      disabled = _ref.disabled,
      otherProps = _objectWithoutProperties(_ref, ['children', 'style', 'className', 'disabled']);

  var compiledStyle = _stylesheet2.default.compile(_extends({
    typo: theme.label.typo,
    userSelect: 'none',
    padding: '0 8px',
    color: disabled ? theme.label.disabledColor : theme.label.color
  }, style));

  return _react2.default.createElement(
    'label',
    _extends({
      htmlFor: otherProps.for,
      className: 'label ' + className,
      style: compiledStyle
    }, (0, _lodash2.default)(otherProps, 'for')),
    children
  );
}

Label.propTypes = {
  children: _react.PropTypes.node.isRequired,
  for: _react.PropTypes.string.isRequired,
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool
};

Label.defaultProps = {
  style: {},
  className: '',
  disabled: false
};

Label.contextTypes = { theme: _react.PropTypes.object };