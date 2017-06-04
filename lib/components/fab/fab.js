'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getNotDeclaredProps = require('/src/utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _stylesheet = require('/src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _timings = require('/src/styles/timings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FAB = function (_PureComponent) {
  _inherits(FAB, _PureComponent);

  function FAB() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FAB);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FAB.__proto__ || Object.getPrototypeOf(FAB)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      pressed: false,
      focused: false
    }, _this.animateIn = function () {
      _this.root.animate({
        transform: ['scale(0) rotate(-45deg)', 'scale(1) rotate(0deg)']
      }, {
        duration: _this.context.theme.variables.transitionTime * 2,
        easing: _timings.easeInOutCubic,
        fill: 'forwards'
      });
    }, _this.handlePress = _this.togglePress(_this.props.onPress), _this.handleRelease = _this.togglePress(), _this.handleKeyDown = function () {
      var ev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this.props.onKeyDown(ev);

      if (FAB.keyCodes.includes(ev.keyCode) && !_this.state.pressed) {
        _this.handlePress();
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.handleRelease();
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      _this.toggleFocus();
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.toggleFocus();
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FAB, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.animateIn) {
        this.animateIn();
      }
    }
  }, {
    key: 'togglePress',
    value: function togglePress() {
      var _this2 = this;

      var stateUpdatedCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      return function () {
        return _this2.setState(function (_ref2) {
          var pressed = _ref2.pressed;

          return { pressed: !pressed };
        }, stateUpdatedCallback);
      };
    }
  }, {
    key: 'toggleFocus',
    value: function toggleFocus() {
      this.setState(function (_ref3) {
        var focused = _ref3.focused;

        return { focused: !focused };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var disabled = this.props.disabled;

      var styles = this.styles;

      return _react2.default.createElement(
        'button',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, FAB), {
          className: 'fab ' + this.props.className,
          tabIndex: disabled ? -1 : 0,
          'aria-disabled': disabled,
          ref: function ref(element) {
            _this3.root = element;
          },
          style: styles.root,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        }),
        _react2.default.createElement('span', {
          className: 'fab--shadow',
          style: styles.shadow
        }),
        _react2.default.createElement(_ripple2.default, {
          round: true,
          center: true,
          className: 'fab--ripple',
          nowaves: this.props.noink,
          ref: function ref(element) {
            _this3.ripple = element;
          }
        }),
        _react2.default.createElement(_icon2.default, {
          className: 'fab--icon',
          icon: this.props.icon,
          disabled: disabled,
          style: styles.icon
        })
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.fab;
    }
  }, {
    key: 'styles',
    get: function get() {
      var _props = this.props,
          mini = _props.mini,
          disabled = _props.disabled;

      var size = mini ? this.theme.miniSize : this.theme.normalSize;

      return _stylesheet2.default.compile({
        root: _extends({
          elevation: disabled ? this.theme.disabledElevation : this.theme.elevation,
          size: size,
          zIndex: 16,
          position: 'relative',
          boxSizing: 'border-box',
          padding: (size - this.theme.iconSize) / 2,
          backgroundColor: disabled ? this.theme.disabledBgColor : this.theme.bgColor,
          borderRadius: '50%',
          border: 0,
          outline: 'none',
          pointerEvents: disabled && 'none',
          color: this.theme.iconColor
        }, this.props.style),

        icon: {
          userSelect: 'none',
          size: 24,
          color: disabled ? this.theme.disabledIconColor : this.theme.iconColor
        },

        shadow: {
          position: ['absolute', 0],
          borderRadius: 'inherit',
          elevation: this.theme.focusedElevation,
          opacity: this.state.pressed || this.state.focused ? 1 : 0,
          transition: 'opacity ' + this.context.theme.variables.transitionTime + 'ms linear'
        }
      });
    }
  }]);

  return FAB;
}(_react.PureComponent);

FAB.propTypes = {
  icon: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  noink: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  mini: _react.PropTypes.bool,
  animateIn: _react.PropTypes.bool,
  onPress: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func
};
FAB.defaultProps = {
  className: '',
  style: {},
  noink: false,
  disabled: false,
  mini: false,
  animateIn: false,
  onPress: function onPress() {},
  onMouseDown: function onMouseDown() {},
  onMouseUp: function onMouseUp() {},
  onTouchStart: function onTouchStart() {},
  onTouchEnd: function onTouchEnd() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {}
};
FAB.contextTypes = { theme: _react.PropTypes.object };
FAB.keyCodes = [13, 32];
exports.default = FAB;