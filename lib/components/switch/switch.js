'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _timings = require('../../styles/timings');

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = exports.Switch = function (_PureComponent) {
  _inherits(Switch, _PureComponent);

  function Switch() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Switch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Switch.__proto__ || Object.getPrototypeOf(Switch)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      toggled: _this.props.defaultToggled,
      isFocused: false
    }, _this.id = _randomstring2.default.generate(), _this.keyDown = false, _this.animationOptions = {
      fill: 'forwards',
      easing: _timings.easeInOutQuad,
      duration: _this.theme.transitionTime
    }, _this.toggle = function () {
      _this.setState(function (prevState) {
        return { toggled: !prevState.toggled };
      }, function () {
        return _this.props.onChange(_this.props.name, _this.state.toggled);
      });
    }, _this.handleClick = _this.toggle, _this.handleKeyDown = function (ev) {
      _this.props.onKeyDown(ev);

      if (Switch.keyCodes.includes(ev.keyCode) && !_this.keyDown) {
        _this.toggle();

        _this.keyDown = true;
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.keyDown = false;
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      _this.setState({ isFocused: true });
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.setState({ isFocused: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Switch, [{
    key: 'componentDidMount',


    /**
     * Set the colors for the track and thumb.
     */
    value: function componentDidMount() {
      var colors = this.colors(this.props, this.state);

      this.thumb.style.backgroundColor = colors.thumbColor;
      this.track.style.backgroundColor = colors.trackColor;

      if (this.props.defaultToggled) {
        this.thumb.style.transform = 'translateX(' + (this.theme.trackWidth - this.theme.thumbSize) + 'px)';
      }
    }

    /**
     * Update the track and thumb if the disabled prop has changed or if the state has changed.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var newState = prevState.toggled !== this.state.toggled;

      if (newState || prevProps.disabled !== this.props.disabled) {
        var prevColors = this.colors(prevProps, prevState);
        var newColors = this.colors(this.props, this.state);

        this.animateTrack(prevColors, newColors);

        this.animateThumb(prevColors, newColors, newState);
      }
    }
  }, {
    key: 'colors',


    /**
     * Compute the colors for the thumb and the track.
     *
     * @param {Object} props - The props for the calculation.
     * @param {Object} state - The state for the calculation.
     * @returns {{ thumbColor: String, trackColor: String }} - Returns the thumb and the track color.
     */
    value: function colors(props, state) {
      var toggledPrefix = state.toggled ? 'active' : 'inactive';
      var prefix = props.disabled ? 'disabled' : toggledPrefix;

      return {
        thumbColor: this.theme[prefix + 'ThumbColor'],
        trackColor: this.theme[prefix + 'TrackColor']
      };
    }
  }, {
    key: 'animateTrack',
    value: function animateTrack(_ref2, _ref3) {
      var prevColor = _ref2.trackColor;
      var newColor = _ref3.trackColor;

      this.track.animate({
        backgroundColor: [prevColor, newColor]
      }, this.animationOptions);
    }
  }, {
    key: 'animateThumb',
    value: function animateThumb(_ref4, _ref5, moveThumb) {
      var prevColor = _ref4.thumbColor;
      var newColor = _ref5.thumbColor;

      var keyframes = {
        backgroundColor: [prevColor, newColor]
      };

      if (moveThumb) {
        var transform = ['translateX(0)', 'translateX(' + (this.theme.trackWidth - this.theme.thumbSize) + 'px)'];

        keyframes.transform = this.state.toggled ? transform : transform.reverse();
      }

      this.thumb.animate(keyframes, this.animationOptions);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          disabled = _props.disabled,
          classes = _props.classes;
      var toggled = this.state.toggled;


      return _react2.default.createElement(
        'button',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Switch), {
          'aria-pressed': toggled,
          'aria-disabled': disabled,
          id: this.id,
          className: classes.switch + ' ' + this.props.className,
          tabIndex: disabled ? -1 : 0,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }),
        _react2.default.createElement(
          'span',
          { className: classes.container },
          _react2.default.createElement(
            'span',
            {
              className: classes.thumb,
              ref: function ref(element) {
                _this2.thumb = element;
              },
              onMouseDown: this.handleClick,
              onTouchStart: this.handleClick
            },
            _react2.default.createElement(_ripple2.default, {
              round: true,
              center: true,
              className: classes.ripple,
              nowaves: this.props.noink,
              color: this.rippleColor,
              focusColor: this.rippleFocusColor,
              isFocused: this.state.isFocused,
              ref: function ref(element) {
                _this2.ripple = element;
              }
            })
          ),
          _react2.default.createElement('span', {
            className: classes.track,
            ref: function ref(element) {
              _this2.track = element;
            }
          })
        ),
        _react2.default.createElement(
          _label2.default,
          {
            'for': this.id,
            disabled: this.props.disabled,
            className: classes.label,
            onClick: this.handleClick
          },
          this.props.children
        )
      );
    }
  }, {
    key: 'theme',


    /**
     * Get the theme for the switch.
     *
     * @returns {Object} - The theme object.
     */
    get: function get() {
      return this.props.theme;
    }

    /**
     * Get the focus color for the ripple.
     *
     * @returns {String} - Returns the focus color.
     */

  }, {
    key: 'rippleFocusColor',
    get: function get() {
      return this.state.toggled ? this.theme.activeThumbColor : this.theme.inactiveThumbColor;
    }

    /**
     * Get the color for the ripple.
     *
     * @returns {String} - Returns the color.
     */

  }, {
    key: 'rippleColor',
    get: function get() {
      return this.state.toggled ? this.theme.activeRippleColor : this.theme.inactiveRippleColor;
    }
  }]);

  return Switch;
}(_react.PureComponent);

Switch.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired,
  name: _propTypes2.default.string.isRequired,
  defaultToggled: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  labelPosition: _propTypes2.default.oneOf(['left', 'right']),
  noink: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  onChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func
};
Switch.defaultProps = {
  name: '',
  defaultToggled: false,
  disabled: false,
  labelPosition: 'right',
  noink: false,
  children: '',
  onChange: function onChange() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {}
};
Switch.keyCodes = [13, 32];
exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(_styles2.default)(Switch), 'switch');