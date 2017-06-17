'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _timings = require('../../styles/timings');

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = exports.Checkbox = function (_PureComponent) {
  _inherits(Checkbox, _PureComponent);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var bgColor = window.getComputedStyle(this.root)['background-color'];

      this.checkmark.style.borderColor = bgColor;

      if (this.props.checked) {
        this.animateCheckmark();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.checked !== this.props.checked) {
        this.animateCheckmark();
      }
    }
  }, {
    key: 'getRippleProps',
    value: function getRippleProps() {
      var color = this.props.checked ? this.props.theme.checkedBgColor : this.props.theme.uncheckedBgColor;

      return {
        color: color,
        focusColor: color
      };
    }
  }, {
    key: 'animateCheckmark',
    value: function animateCheckmark() {
      var animations = this.props.checked ? {
        opacity: [1, 1],
        transform: ['scale(0, 0) rotate(-45deg)', 'scale(1, 1) rotate(45deg)']
      } : { opacity: [1, 0] };

      this.checkmark.animate(animations, {
        easing: _timings.easeInOutCubic,
        fill: 'forwards',
        duration: this.props.theme.animationDuration
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          disabled = _props.disabled,
          classes = _props.classes;


      return _react2.default.createElement(
        'span',
        {
          role: 'checkbox',
          tabIndex: disabled ? -1 : 0,
          'aria-disabled': disabled,
          'aria-checked': this.props.checked,
          className: this.props.className + ' ' + classes.checkbox,
          ref: function ref(element) {
            _this2.root = element;
          },
          onKeyDown: this.props.onKeyDown,
          onKeyUp: this.props.onKeyUp,
          onFocus: this.props.onFocus,
          onBlur: this.props.onBlur
        },
        _react2.default.createElement(
          'span',
          {
            role: 'presentation',
            onTouchStart: this.props.onPress,
            onMouseDown: this.props.onPress,
            className: classes.container
          },
          _react2.default.createElement(
            'span',
            {
              className: classes.checkboxContainer,
              ref: function ref(element) {
                _this2.checkbox = element;
              }
            },
            _react2.default.createElement('span', {
              className: classes.checkmark,
              ref: function ref(element) {
                _this2.checkmark = element;
              }
            })
          ),
          _react2.default.createElement(_ripple2.default, _extends({
            round: true,
            center: true,
            className: classes.ripple,
            isFocused: this.props.isFocused
          }, this.getRippleProps()))
        ),
        _react2.default.createElement(
          _label2.default,
          {
            'for': this.props.id,
            disabled: disabled
          },
          this.props.children
        )
      );
    }
  }]);

  return Checkbox;
}(_react.PureComponent);

Checkbox.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired,
  checked: _propTypes2.default.bool.isRequired,
  disabled: _propTypes2.default.bool.isRequired,
  className: _propTypes2.default.string.isRequired,
  onPress: _propTypes2.default.func.isRequired,
  id: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.string.isRequired,
  onKeyUp: _propTypes2.default.func.isRequired,
  onKeyDown: _propTypes2.default.func.isRequired,
  onFocus: _propTypes2.default.func.isRequired,
  onBlur: _propTypes2.default.func.isRequired
};


var styles = {
  checkbox: {
    boxSizing: 'border-box',
    outline: 'none',
    border: 0,
    backgroundColor: 'inherit',
    display: 'inline-flex',
    justifyContent: 'center',
    flexDirection: function flexDirection(props) {
      return 'row' + (props.labelPosition === 'left' ? '-reverse' : '');
    },
    padding: function padding(props) {
      return props.theme.padding;
    },
    height: function height(props) {
      return props.theme.rippleSize + props.theme.padding * 2;
    },
    pointerEvents: function pointerEvents(props) {
      return props.disabled && 'none';
    }
  },

  container: {
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    borderRadius: '50%',
    boxSizing: 'border-box',
    zIndex: 1,
    height: function height(props) {
      return props.theme.rippleSize;
    },
    width: function width(props) {
      return props.theme.rippleSize;
    }
  },

  label: { cursor: function cursor(props) {
      return !props.disabled && 'pointer';
    } },

  checkboxContainer: {
    display: 'inline-block',
    position: 'relative',
    margin: function margin(props) {
      return (props.theme.rippleSize - props.theme.size) / 2;
    },
    height: function height(props) {
      return props.theme.size - props.theme.borderWidth * 2;
    },
    width: function width(props) {
      return props.theme.size - props.theme.borderWidth * 2;
    },
    borderStyle: 'solid',
    borderWidth: function borderWidth(props) {
      return props.theme.borderWidth;
    },
    borderRadius: function borderRadius(props) {
      return props.theme.borderWidth;
    },
    borderColor: function borderColor(props) {
      if (props.disabled) {
        return props.theme.disabledBorderColor;
      }

      return props.checked ? props.theme.checkedBorderColor : props.theme.uncheckedBorderColor;
    },
    backgroundColor: function backgroundColor(props) {
      if (props.disabled) {
        return props.checked ? props.theme.disabledCheckedBgColor : props.theme.disabledBgColor;
      }

      return props.checked ? props.theme.checkedBgColor : props.theme.uncheckedBgColor;
    },
    transition: function transition(props) {
      var animationDuration = props.theme.animationDuration;


      return 'background-color ' + animationDuration + ', border-color ' + animationDuration;
    }
  },

  checkmark: {
    width: '36%',
    height: '70%',
    left: -1,
    position: 'absolute',
    border: 8 / 3 + 'px solid',
    borderTop: 0,
    borderLeft: 0,
    transformOrigin: '97% 86%',
    boxSizing: 'content-box',
    willChange: 'opacity, transform',
    opacity: 0
  }
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(Checkbox), 'checkbox');