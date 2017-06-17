'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component to render an icon button.
 *
 * @class
 */
var IconButton = exports.IconButton = function (_PureComponent) {
  _inherits(IconButton, _PureComponent);

  function IconButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IconButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IconButton.__proto__ || Object.getPrototypeOf(IconButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isFocused: false }, _this.keyDown = false, _this.handleKeyDown = function (ev) {
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

      _this.setState({ isFocused: true });
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.setState({ isFocused: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Handle the keyDown event.
   * Check if the button is either the space bar or the enter key.
   *
   * @private
   */


  /**
   * Reset the keyDown property to false.
   *
   * @private
   */


  /**
   * Call the onPress function.
   *
   * @private
   */


  /**
   * Call the onPress function.
   *
   * @private
   */


  /**
   * Set the isFocused state to true.
   *
   * @private
   */


  /**
   * Set the isFocused state to false.
   *
   * @private
   */


  _createClass(IconButton, [{
    key: 'render',
    value: function render() {
      var disabled = this.props.disabled;


      return _react2.default.createElement(
        'span',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, IconButton), {
          role: 'button',
          className: this.props.classes.iconButton + ' ' + this.props.className,
          'aria-disabled': disabled,
          tabIndex: disabled ? -1 : 0,
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
          isFocused: this.state.isFocused
        }),
        _react2.default.createElement(_icon2.default, {
          className: this.props.classes.icon,
          icon: this.props.icon,
          disabled: disabled
        })
      );
    }
  }]);

  return IconButton;
}(_react.PureComponent);

IconButton.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  icon: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  noink: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onPress: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func
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
IconButton.contextTypes = { theme: _propTypes2.default.object };
IconButton.keyCodes = [13, 32];


var styles = {
  iconButton: {
    composes: 'icon-button',
    position: 'relative',
    backgroundColor: 'inherit',
    borderRadius: '50%',
    outline: 0,
    border: 0,
    height: function height(props) {
      return props.theme.size;
    },
    width: function width(props) {
      return props.theme.size;
    },
    margin: function margin(props) {
      return props.theme.margin;
    },
    pointerEvents: function pointerEvents(props) {
      return props.disabled && 'none';
    },
    padding: function padding(props) {
      return (props.theme.size - props.theme.iconSize) / 2;
    }
  },

  icon: {
    composes: 'icon-button--icon',
    display: 'inline-flex',
    fontSize: function fontSize(props) {
      return props.theme.iconSize;
    }
  }
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(IconButton), 'iconButton');