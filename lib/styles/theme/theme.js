'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.compileTheme = compileTheme;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _themeSchema = require('./theme-schema');

var _themeSchema2 = _interopRequireDefault(_themeSchema);

var _defaultTheme = require('./default-theme');

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function compileTheme(variables, theme) {
  return Object.keys(_defaultTheme.defaultTheme).reduce(function (current, component) {
    var userTheme = theme[component] ? theme[component](variables) : {};

    return _extends({}, current, _defineProperty({}, component, Object.assign({}, _defaultTheme.defaultTheme[component](variables), userTheme)));
  }, {});
}

/**
 * A React Component to supply the theme for the elements via the context.
 *
 * @class
 */

var Theme = function (_PureComponent) {
  _inherits(Theme, _PureComponent);

  function Theme() {
    _classCallCheck(this, Theme);

    return _possibleConstructorReturn(this, (Theme.__proto__ || Object.getPrototypeOf(Theme)).apply(this, arguments));
  }

  _createClass(Theme, [{
    key: 'getChildContext',


    /**
     * Merge the passed in theme with the default one.
     */
    value: function getChildContext() {
      return { theme: compileTheme(this.variables, this.props.theme) };
    }
  }, {
    key: 'render',
    value: function render() {
      var Component = this.props.component;


      return _react2.default.createElement(
        Component,
        (0, _getNotDeclaredProps2.default)(this, Theme),
        this.props.children
      );
    }
  }, {
    key: 'variables',
    get: function get() {
      return Object.assign({}, _defaultTheme.defaultVars, this.props.variables);
    }
  }]);

  return Theme;
}(_react.PureComponent);

Theme.propTypes = {
  theme: _propTypes2.default.object,
  variables: _propTypes2.default.object,
  children: _propTypes2.default.node,
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string])
};
Theme.defaultProps = {
  theme: {},
  variables: {},
  children: '',
  component: 'div'
};
Theme.childContextTypes = { theme: _themeSchema2.default };
exports.default = Theme;