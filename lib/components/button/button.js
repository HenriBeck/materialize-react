'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _typo = require('../../styles/plugins/typo');

var _typo2 = _interopRequireDefault(_typo);

var _elevation = require('../../styles/plugins/elevation');

var _elevation2 = _interopRequireDefault(_elevation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A material design button.
 *
 * @class
 */
var Button = exports.Button = function (_PureComponent) {
  _inherits(Button, _PureComponent);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      pressed: false,
      isFocused: false
    }, _this.keyDown = false, _this.handlePress = function () {
      if (_this.props.raised) {
        _this.setState({ pressed: true });
      }

      _this.props.onPress();
    }, _this.handleRelease = function () {
      if (_this.props.raised) {
        _this.setState({ pressed: false });
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

      _this.setState({ isFocused: true });
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.setState({ isFocused: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          disabled = _props.disabled,
          classes = _props.classes;

      var className = (0, _classnames2.default)(classes.button, _defineProperty({}, classes.buttonPressed, this.state.pressed && !this.props.disabled), this.props.className);

      return _react2.default.createElement(
        'span',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Button), {
          role: 'button',
          className: className,
          tabIndex: disabled ? -1 : 0,
          'aria-disabled': disabled,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }),
        _react2.default.createElement(_ripple2.default, _extends({
          className: 'button--ripple',
          isFocused: this.state.isFocused,
          nowaves: this.props.noink
        }, this.rippleProps)),
        this.props.children
      );
    }
  }, {
    key: 'rippleProps',


    /**
     * Get the ripple props based on the props the user passed.
     *
     * @private
     * @returns {Object} - Returns the props.
     */
    get: function get() {
      return this.props.raised ? Button.raisedRippleProps : Button.normalRippleProps;
    }

    /**
     * Call the onPress handler and set the pressed state to true.
     *
     * @private
     */


    /**
     * Toggle the pressed state when the user releases the button.
     *
     * @private
     */


    /**
     * Check if the user pressed a key that where we should emit an action.
     *
     * @private
     */


    /**
     * Set the keyDown attribute to false when the user releases the key.
     *
     * @private
     */


    /**
     * Call the press handler for the button.
     *
     * @private
     */


    /**
     * Call the release handler for the button.
     *
     * @private
     */


    /**
     * Call the press handler for the button.
     *
     * @private
     */


    /**
     * Call the release handler for the button.
     *
     * @private
     */


    /**
     * When the button get's focused, we tell the ripple to visibly indicate that.
     *
     * @private
     */


    /**
     * When the button loses focus we want to remove the visible focus from the button.
     *
     * @private
     */

  }]);

  return Button;
}(_react.PureComponent);

Button.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.node,
  disabled: _propTypes2.default.bool,
  raised: _propTypes2.default.bool,
  noink: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onPress: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  onTouchEnd: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func
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
Button.normalRippleProps = {
  color: '#cccccc',
  initialOpacity: 0.25
};
Button.raisedRippleProps = {
  focusColor: '#000000',
  focusOpacity: 0.12
};
Button.keyCodes = [13, 32];


var buttonTypo = (0, _typo2.default)('button');

var styles = {
  button: _extends({}, buttonTypo, {
    composes: 'button',
    userSelect: 'none',
    display: 'inline-block',
    position: 'relative',
    zIndex: 0,
    boxSizing: 'border-box',
    outline: 0,
    border: 0,
    borderRadius: 2,
    margin: '0 8px',
    WebkitTapHighlightColor: 'transparent',
    cursor: function cursor(props) {
      return props.disabled ? 'auto' : 'pointer';
    },
    height: function height(props) {
      return props.theme.height;
    },
    minWidth: function minWidth(props) {
      return props.theme.minWidth;
    },
    color: function color(props) {
      return props.disabled ? props.theme.disabledColor : props.theme.color;
    },
    pointerEvents: function pointerEvents(props) {
      return props.disabled ? 'none' : 'auto';
    },
    padding: function padding(props) {
      return (props.theme.height - buttonTypo.lineHeight) / 2 + 'px 8px';
    },
    boxShadow: function boxShadow(props) {
      return props.raised && !props.disabled ? (0, _elevation2.default)(props.theme.elevation) : 'none';
    },
    backgroundColor: function backgroundColor(props) {
      if (props.disabled) {
        return props.raised ? props.theme.raisedAndDisabledBgColor : props.theme.disabledBgColor;
      }

      return props.raised ? props.theme.raisedBgColor : props.theme.bgColor;
    },


    '&:hover': {
      boxShadow: function boxShadow(props) {
        return props.raised && !props.disabled ? (0, _elevation2.default)(props.theme.pressedElevation) : 'none';
      }
    }
  }),

  buttonPressed: { boxShadow: function boxShadow(props) {
      return (0, _elevation2.default)(props.theme.pressedElevation);
    } }
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(Button), 'button');