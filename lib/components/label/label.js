'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Label = Label;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _typo = require('../../styles/plugins/typo');

var _typo2 = _interopRequireDefault(_typo);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A function to render a label tag with special material design stylings.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes object provided by jss.
 * @param {String} props.children - Text for the label.
 * @param {String} props.className - Additional className to apply.
 * @param {Boolean} props.disabled - If the label is disabled.
 * @returns {JSX} - Returns the label component.
 */
function Label(_ref) {
  var classes = _ref.classes,
      children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled,
      props = _objectWithoutProperties(_ref, ['classes', 'children', 'className', 'disabled']);

  return _react2.default.createElement(
    'label',
    _extends({
      'aria-disabled': disabled,
      htmlFor: props.for,
      className: classes.label + ' ' + className
    }, (0, _lodash2.default)((0, _getNotDeclaredProps2.default)({ props: props }, Label), 'for')),
    children
  );
}

Label.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.node.isRequired,
  for: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool
};

Label.defaultProps = {
  className: '',
  disabled: false
};

var styles = {
  label: _extends({}, (0, _typo2.default)('body1'), {
    composes: 'label',
    userSelect: 'none',
    padding: '0 8px',
    color: function color(props) {
      return props.disabled ? props.theme.disabledColor : props.theme.color;
    }
  })
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(Label), 'label');