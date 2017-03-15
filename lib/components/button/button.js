'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getNotDeclaredProps = require('../../../../../../../../src/utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _stylesheet = require('../../../../../../../../src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_PureComponent) {
  _inherits(Button, _PureComponent);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.state = { pressed: false }, _this.keyDown = false, _this.handlePress = function () {
      if (_this.props.raised) {
        _this.toggleState(_this.props.onPress);
      } else {
        _this.props.onPress();
      }
    }, _this.handleRelease = function () {
      if (_this.props.raised) {
        _this.toggleState();
      }
    }, _this.handleKeyDown = function () {
      var ev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this.props.onKeyDown(ev);

      if (Button.keyCodes.includes(ev.keyCode) && !_this.keyDown) {
        _this.keyDown = true;

        _this.props.onPress();
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.keyDown = false;
    }, _this.handleMouseDown = function (ev) {
      _this.props.onMouseDown(ev);

      _this.handlePress();
    }, _this.handleMouseUp = function (ev) {
      _this.props.onMouseUp(ev);

      _this.handleRelease();
    }, _this.handleTouchStart = function (ev) {
      _this.props.onTouchStart(ev);

      _this.handlePress();
    }, _this.handleTouchEnd = function (ev) {
      _this.props.onTouchEnd(ev);

      _this.handleRelease();
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      _this.ripple.addFocus(ev);
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.ripple.removeFocus(ev);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'toggleState',
    value: function toggleState() {
      var updatedStateCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      this.setState(function (_ref2) {
        var pressed = _ref2.pressed;

        return { pressed: !pressed };
      }, updatedStateCallback);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var disabled = this.props.disabled;


      return _react2.default.createElement(
        'button',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Button), {
          className: 'button ' + this.props.className,
          tabIndex: disabled ? -1 : 0,
          'aria-disabled': disabled,
          style: this.styles,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          ref: function ref(element) {
            _this2.root = element;
          }
        }),
        _react2.default.createElement(_ripple2.default, _extends({
          className: 'button--ripple',
          ref: function ref(element) {
            _this2.ripple = element;
          },
          nowaves: this.props.noink
        }, this.rippleProps)),
        this.props.children
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.button;
    }
  }, {
    key: 'elevation',
    get: function get() {
      if (this.props.raised && !this.props.disabled) {
        return this.state.pressed ? this.theme.pressedElevation : this.theme.elevation;
      }

      return 0;
    }
  }, {
    key: 'backgroundColor',
    get: function get() {
      if (this.props.disabled) {
        return this.props.raised ? this.theme.raisedAndDisabledBgColor : this.theme.disabledBgColor;
      }

      return this.props.raised ? this.theme.raisedBgColor : this.theme.bgColor;
    }
  }, {
    key: 'styles',
    get: function get() {
      var disabled = this.props.disabled;


      return _stylesheet2.default.compile(_extends({
        typo: this.theme.typo,
        userSelect: 'none',
        elevation: this.elevation,
        display: 'inline-block',
        position: 'relative',
        backgroundColor: this.backgroundColor,
        cursor: disabled ? 'auto' : 'pointer',
        zIndex: 0,
        boxSizing: 'border-box',
        outline: 0,
        border: 0,
        borderRadius: 2,
        height: this.theme.height,
        minWidth: this.theme.minWidth,
        margin: '0 8px',
        color: disabled ? this.theme.disabledColor : this.theme.color,
        pointerEvents: disabled ? 'none' : 'auto',
        padding: function padding(styles) {
          return (styles.height - styles.lineHeight * styles.fontSize) / 2 + 'px 8px';
        }
      }, this.props.style));
    }
  }, {
    key: 'rippleProps',
    get: function get() {
      return this.props.raised ? Button.raisedRippleProps : Button.normalRippleProps;
    }
  }]);

  return Button;
}(_react.PureComponent);

Button.propTypes = {
  children: _react.PropTypes.node,
  style: _react.PropTypes.object,
  disabled: _react.PropTypes.bool,
  raised: _react.PropTypes.bool,
  noink: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  onPress: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func
};
Button.defaultProps = {
  children: '',
  disabled: false,
  raised: false,
  noink: false,
  className: '',
  style: {},
  onPress: function onPress() {},
  onMouseDown: function onMouseDown() {},
  onMouseUp: function onMouseUp() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onTouchStart: function onTouchStart() {},
  onTouchEnd: function onTouchEnd() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {}
};
Button.contextTypes = { theme: _react.PropTypes.object };
Button.normalRippleProps = {
  color: '#999999',
  initialOpacity: 0.4
};
Button.raisedRippleProps = {
  focusColor: '#000000',
  focusOpacity: 0.12
};
Button.keyCodes = [13, 32];
exports.default = Button;