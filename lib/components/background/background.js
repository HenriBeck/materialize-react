'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A function to inherit some global styling like color and backgroundColor.
 *
 * @param {Object} props - Props object.
 * @param {JSX} props.children - The children to render inside.
 * @param {Object} props.classes - The object with the classNames inside.
 * @param {String} [props.className] - Additional className to be added.
 * @returns {JSX} - Returns the JSX.
 */
function Background(_ref) {
  var children = _ref.children,
      classes = _ref.classes,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ['children', 'classes', 'className']);

  return _react2.default.createElement(
    'div',
    _extends({
      className: 'background ' + classes.root + ' ' + className
    }, (0, _lodash2.default)(props, 'theme', 'sheet')),
    children
  );
}

Background.propTypes = {
  children: _propTypes2.default.node.isRequired,
  classes: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string
};

Background.defaultProps = { className: '' };

var styles = {
  root: {
    color: function color(props) {
      return props.theme.color;
    },
    backgroundColor: function backgroundColor(props) {
      return props.theme.backgroundColor;
    }
  }
};

exports.default = (0, _connectWithTheme2.default)((0, _reactJss2.default)(styles)(Background), 'background');