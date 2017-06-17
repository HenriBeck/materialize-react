'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAB = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _timings = require('../../styles/timings');

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

var _elevation = require('../../styles/plugins/elevation');

var _elevation2 = _interopRequireDefault(_elevation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component to render a floating action button.
 *
 * @class
 */
var FAB = exports.FAB = function (_PureComponent) {
  _inherits(FAB, _PureComponent);

  function FAB() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FAB);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FAB.__proto__ || Object.getPrototypeOf(FAB)).call.apply(_ref, [this].concat(args))), _this), _this.keyDown = false, _this.handleKeyDown = function (ev) {
      _this.props.onKeyDown(ev);

      if (FAB.keyCodes.includes(ev.keyCode) && !_this.keyDown) {
        _this.props.onPress();

        _this.keyDown = true;
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.keyDown = false;
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      _this.shadow.style.opacity = 1;
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.shadow.style.opacity = 0;
    }, _this.handleMouseDown = function (ev) {
      _this.props.onMouseDown(ev);

      _this.props.onPress();
    }, _this.handleTouchStart = function (ev) {
      _this.props.onTouchStart(ev);

      _this.props.onPress();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FAB, [{
    key: 'componentDidMount',


    /**
     * Scale and rotate the fab in if necessary.
     */
    value: function componentDidMount() {
      if (this.props.animateIn) {
        this.root.animate({
          transform: ['scale(0) rotate(-45deg)', 'scale(1) rotate(0deg)']
        }, {
          duration: this.props.theme.transitionTime * 2,
          easing: _timings.easeInOutCubic,
          fill: 'forwards'
        });
      }
    }

    /**
     * Check if a key was pressed that we should handled.
     */


    /**
     * Reset the keyDown property.
     */


    /**
     * Add the shadow for the FAB when it's focused.
     */


    /**
     * Remove the shadow for the FAB when it's focused.
     */


    /**
     * Call the onPress handler.
     */


    /**
     * Call the onPress handler.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          disabled = _props.disabled,
          classes = _props.classes;


      return _react2.default.createElement(
        'span',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, FAB), {
          role: 'button',
          className: this.props.className + ' ' + classes.fab,
          tabIndex: disabled ? -1 : 0,
          'aria-disabled': disabled,
          ref: function ref(element) {
            _this2.root = element;
          },
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart
        }),
        _react2.default.createElement('span', {
          className: classes.shadow,
          ref: function ref(element) {
            _this2.shadow = element;
          }
        }),
        _react2.default.createElement(_ripple2.default, {
          round: true,
          center: true,
          className: 'fab--ripple',
          nowaves: this.props.noink
        }),
        _react2.default.createElement(_icon2.default, {
          className: classes.icon,
          icon: this.props.icon,
          disabled: disabled
        })
      );
    }
  }]);

  return FAB;
}(_react.PureComponent);

FAB.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired,
  icon: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  noink: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  animateIn: _propTypes2.default.bool,
  onPress: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func
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
  onTouchStart: function onTouchStart() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {}
};
FAB.keyCodes = [13, 32];


var styles = {
  fab: {
    composes: 'fab',
    zIndex: 16,
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '50%',
    border: 0,
    outline: 'none',
    width: function width(props) {
      return props.mini ? props.theme.miniSize : props.theme.normalSize;
    },
    height: function height(props) {
      return props.mini ? props.theme.miniSize : props.theme.normalSize;
    },
    pointerEvents: function pointerEvents(props) {
      return props.disabled && 'none';
    },
    color: function color(props) {
      return props.theme.iconColor;
    },
    boxShadow: function boxShadow(props) {
      return props.disabled ? props.theme.disabledElevation : props.theme.elevation;
    },
    padding: function padding(props) {
      var size = props.mini ? props.theme.miniSize : props.theme.normalSize;

      return (size - props.theme.iconSize) / 2;
    },
    backgroundColor: function backgroundColor(props) {
      return props.disabled ? props.theme.disabledBackgroundColor : props.theme.backgroundColor;
    }
  },

  icon: {
    composes: 'fab--icon',
    userSelect: 'none',
    height: function height(props) {
      return props.theme.iconSize;
    },
    width: function width(props) {
      return props.theme.iconSize;
    }
  },

  shadow: {
    composes: 'fab--shadow',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    opacity: 0,
    boxShadow: function boxShadow(props) {
      return (0, _elevation2.default)(props.theme.focusedElevation);
    },
    transition: function transition(props) {
      return 'opacity ' + props.theme.transitionTime + 'ms linear';
    }
  }
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(FAB), 'fab');