'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Divider = Divider;

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

/**
 * A component that renders a horizontal line.
 *
 * @param {Object} props - Props of the component.
 * @param {Object} props.classes - The classes provided by jss.
 * @param {String} props.className - Additional class names.
 * @returns {JSX} - Returns the element.
 */
function Divider(_ref) {
  var classes = _ref.classes,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ['classes', 'className']);

  return _react2.default.createElement('div', _extends({
    className: classes.divider + ' ' + className
  }, (0, _getNotDeclaredProps2.default)({ props: props }, Divider)));
}

Divider.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string
};

Divider.defaultProps = { className: '' };

var styles = {
  divider: {
    composes: 'divider',
    height: function height(props) {
      return props.theme.height;
    },
    backgroundColor: function backgroundColor(props) {
      return props.theme.backgroundColor;
    }
  }
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(Divider), 'divider');