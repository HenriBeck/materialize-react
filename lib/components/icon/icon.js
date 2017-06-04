'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Icon(_ref) {
  var icon = _ref.icon,
      className = _ref.className,
      classes = _ref.classes,
      props = _objectWithoutProperties(_ref, ['icon', 'className', 'classes']);

  return _react2.default.createElement('i', _extends({
    className: 'mdi-' + icon + ' ' + className + ' ' + classes.icon
  }, (0, _getNotDeclaredProps2.default)({ props: props }, Icon)));
}

Icon.propTypes = {
  icon: _propTypes2.default.string.isRequired,
  classes: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string
};

Icon.defaultProps = { className: '' };

var styles = {
  icon: {
    composes: 'icon mdi mdi-24px',
    color: function color(props) {
      return props.disabled ? props.theme.disabledColor : props.theme.color;
    },
    lineHeight: 24
  }
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(Icon), 'icon');