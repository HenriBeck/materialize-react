'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.compileTheme = compileTheme;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _themeSchema = require('./theme-schema');

var _themeSchema2 = _interopRequireDefault(_themeSchema);

var _defaultTheme = require('./default-theme');

var _defaultTheme2 = _interopRequireDefault(_defaultTheme);

var _stylesheet = require('../stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _getNotDeclaredProps = require('../../../../../../../../src/utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function compileTheme(theme) {
  var mergedTheme = (0, _lodash2.default)({}, _defaultTheme2.default, theme);

  return _stylesheet2.default.compile(mergedTheme, { variables: mergedTheme.variables }, []);
}

var Theme = function (_PureComponent) {
  _inherits(Theme, _PureComponent);

  function Theme() {
    _classCallCheck(this, Theme);

    return _possibleConstructorReturn(this, (Theme.__proto__ || Object.getPrototypeOf(Theme)).apply(this, arguments));
  }

  _createClass(Theme, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { theme: compileTheme(this.props.theme) };
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
  }]);

  return Theme;
}(_react.PureComponent);

Theme.propTypes = {
  theme: _themeSchema2.default,
  children: _react.PropTypes.node,
  component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string])
};
Theme.defaultProps = {
  theme: {},
  children: '',
  component: 'div'
};
Theme.childContextTypes = { theme: _react.PropTypes.object };
exports.default = Theme;