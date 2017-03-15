'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _getNotDeclaredProps = require('../../../../../../../../src/utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _stylesheet = require('../../../../../../../../src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconButton = function (_PureComponent) {
  _inherits(IconButton, _PureComponent);

  function IconButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IconButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IconButton.__proto__ || Object.getPrototypeOf(IconButton)).call.apply(_ref, [this].concat(args))), _this), _this.keyDown = false, _this.handleKeyDown = function (ev) {
      _this.props.onKeyDown(ev);

      if (IconButton.keyCodes.includes(ev.keyCode) && !_this.keyDown) {
        _this.keyDown = true;

        _this.props.onPress();
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.keyDown = false;
    }, _this.handleMouseDown = function (ev) {
      _this.props.onMouseDown(ev);

      _this.props.onPress();
    }, _this.handleTouchStart = function (ev) {
      _this.props.onTouchStart(ev);

      _this.props.onPress();
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      _this.ripple.addFocus();
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.ripple.removeFocus();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IconButton, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var disabled = this.props.disabled;

      var styles = this.styles;

      return _react2.default.createElement(
        'button',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, IconButton), {
          className: 'icon-button ' + this.props.className,
          style: styles.root,
          'aria-disabled': disabled,
          tabIndex: this.props.disabled ? -1 : 0,
          onTouchStart: this.handleTouchStart,
          onMouseDown: this.handleMouseDown,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }),
        _react2.default.createElement(_ripple2.default, {
          round: true,
          center: true,
          className: 'icon-button--ripple',
          color: this.context.theme.icon.color,
          focusColor: this.context.theme.icon.color,
          focusOpacity: 0.12,
          nowaves: this.props.noink,
          ref: function ref(element) {
            _this2.ripple = element;
          }
        }),
        _react2.default.createElement(_icon2.default, {
          className: 'icon-button--icon',
          icon: this.props.icon,
          disabled: disabled,
          style: styles.icon
        })
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.iconButton;
    }
  }, {
    key: 'styles',
    get: function get() {
      return _stylesheet2.default.compile({
        root: _extends({
          position: 'relative',
          size: this.theme.size,
          margin: this.theme.margin,
          backgroundColor: 'inherit',
          borderRadius: '50%',
          outline: 0,
          border: 0,
          pointerEvents: this.props.disabled && 'none',
          padding: (this.theme.size - this.theme.iconSize) / 2
        }, this.props.style),

        icon: {
          fontSize: this.theme.iconSize,
          display: 'inline-flex'
        }
      });
    }
  }]);

  return IconButton;
}(_react.PureComponent);

IconButton.propTypes = {
  icon: _react.PropTypes.string.isRequired,
  disabled: _react.PropTypes.bool,
  noink: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  onPress: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func
};
IconButton.defaultProps = {
  disabled: false,
  noink: false,
  style: {},
  className: '',
  onPress: function onPress() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onTouchStart: function onTouchStart() {},
  onMouseDown: function onMouseDown() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {}
};
IconButton.contextTypes = { theme: _react.PropTypes.object };
IconButton.keyCodes = [13, 32];
exports.default = IconButton;