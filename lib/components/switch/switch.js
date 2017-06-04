'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _getNotDeclaredProps = require('/src/utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _stylesheet = require('/src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _timings = require('/src/styles/timings');

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = function (_PureComponent) {
  _inherits(Switch, _PureComponent);

  function Switch() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Switch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Switch.__proto__ || Object.getPrototypeOf(Switch)).call.apply(_ref, [this].concat(args))), _this), _this.state = { toggled: _this.props.defaultToggled }, _this.id = new _chance2.default().hash(), _this.keyDown = false, _this.animationOptions = {
      fill: 'forwards',
      easing: _timings.easeInOutQuad,
      duration: _this.context.theme.variables.transitionTime
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

      _this.ripple.addFocus();
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.ripple.removeFocus();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Switch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var colors = this.colors(this.props, this.state);

      this.thumb.style.backgroundColor = colors.thumbColor;
      this.track.style.backgroundColor = colors.trackColor;

      if (this.props.defaultToggled) {
        this.thumb.style.transform = 'translateX(' + (this.theme.trackWidth - this.theme.thumbSize) + 'px)';
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var newState = prevState.toggled !== this.state.toggled;

      if (newState) {
        this.ripple.focusColor = this.state.toggled ? this.theme.activeThumbColor : this.theme.inactiveThumbColor;
      }

      if (newState || prevProps.disabled !== this.props.disabled) {
        var prevColors = this.colors(prevProps, prevState);
        var newColors = this.colors(this.props, this.state);

        this.animateTrack(prevColors, newColors);

        this.animateThumb(prevColors, newColors, newState);
      }
    }
  }, {
    key: 'colors',
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
        var styles = ['translateX(0)', 'translateX(' + (this.theme.trackWidth - this.theme.thumbSize) + 'px)'];

        keyframes.transform = this.state.toggled ? styles : styles.reverse();
      }

      this.thumb.animate(keyframes, this.animationOptions);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var disabled = this.props.disabled;
      var toggled = this.state.toggled;

      var styles = this.styles;

      return _react2.default.createElement(
        'button',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Switch), {
          'aria-pressed': toggled,
          'aria-disabled': disabled,
          id: this.id,
          tabIndex: disabled ? -1 : 0,
          style: styles.root,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }),
        _react2.default.createElement(
          'span',
          {
            style: styles.container,
            className: 'switch--container'
          },
          _react2.default.createElement(
            'span',
            {
              style: styles.thumb,
              className: 'switch--thumb',
              ref: function ref(element) {
                _this2.thumb = element;
              },
              onMouseDown: this.handleClick,
              onTouchStart: this.handleClick
            },
            _react2.default.createElement(_ripple2.default, {
              round: true,
              center: true,
              style: styles.ripple,
              className: 'switch--ripple',
              nowaves: this.props.noink,
              color: this.state.toggled ? this.theme.activeRippleColor : this.theme.inactiveRippleColor,
              ref: function ref(element) {
                _this2.ripple = element;
              }
            })
          ),
          _react2.default.createElement('span', {
            style: styles.track,
            className: 'switch--track',
            ref: function ref(element) {
              _this2.track = element;
            }
          })
        ),
        _react2.default.createElement(
          _label2.default,
          {
            style: styles.label,
            'for': this.id,
            disabled: this.props.disabled,
            className: 'switch--label'
          },
          this.props.children
        )
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.switch;
    }
  }, {
    key: 'styles',
    get: function get() {
      var disabled = this.props.disabled;


      return _stylesheet2.default.compile({
        root: {
          layout: {
            direction: 'horizontal',
            reverse: this.props.labelPosition === 'left',
            inline: true,
            crossAlign: 'center'
          },
          outline: 0,
          border: 0,
          pointerEvents: disabled && 'none',
          backgroundColor: 'inherit'
        },

        container: {
          position: 'relative',
          display: 'inline-block',
          size: [this.theme.trackWidth, this.theme.thumbSize],
          margin: (this.theme.rippleSize - this.theme.thumbSize) / 2 + 6
        },

        ripple: { position: ['absolute', (this.theme.rippleSize - this.theme.thumbSize) / -2] },

        thumb: {
          position: ['absolute', 0, 'auto', 'auto', 0],
          size: this.theme.thumbSize,
          borderRadius: '50%',
          zIndex: 1,
          boxShadow: '0 1px 5px 0 rgba(0, 0, 0, .6)',
          cursor: 'grab',
          willChange: 'background-color, transform'
        },

        track: {
          position: ['absolute', (this.theme.thumbSize - this.theme.trackHeight) / 2, 0],
          borderRadius: this.theme.trackHeight / 2,
          cursor: 'auto',
          pointerEvents: 'none',
          willChange: 'background-color'
        },

        label: {
          padding: '5px 0',
          cursor: 'pointer'
        }
      });
    }
  }]);

  return Switch;
}(_react.PureComponent);

Switch.propTypes = {
  name: _react.PropTypes.string.isRequired,
  defaultToggled: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  labelPosition: _react.PropTypes.oneOf(['left', 'right']),
  noink: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  onChange: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func
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
Switch.contextTypes = { theme: _react.PropTypes.object };
Switch.keyCodes = [13, 32];
exports.default = Switch;