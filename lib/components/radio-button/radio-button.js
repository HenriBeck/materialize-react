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

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioButton = function (_PureComponent) {
  _inherits(RadioButton, _PureComponent);

  function RadioButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadioButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = { on: _this.props.defaultOn }, _this.id = new _chance2.default().string(), _this.borderDiameter = _this.theme.circleSize + 2 * (_this.theme.borderDistance + _this.theme.borderWidth), _this.animationOptions = {
      duration: _this.context.theme.variables.transitionTime,
      fill: 'forwards'
    }, _this.focus = function () {
      _this.ripple.addFocus();
    }, _this.blur = function () {
      _this.ripple.removeFocus();
    }, _this.handleToggle = function () {
      if (!_this.state.on) {
        _this.setState(function (prevState) {
          return { on: !prevState.on };
        }, function () {
          return _this.props.onChange(_this.props.name, _this.state.on);
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadioButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var disabled = this.props.disabled;


      this.ripple.focusColor = this.props.defaultOn ? this.theme.onColor : this.theme.offColor;

      this.circle.style.backgroundColor = disabled ? this.theme.disabledColor : this.theme.onColor;

      this.border.style.borderColor = this.color(this.props, this.state);

      if (this.props.defaultOn) {
        this.animateCircle();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var changedState = this.state.on !== prevState.on;
      var changedDisabled = this.props.disabled !== prevProps.disabled;
      var oldColor = this.color(prevProps, prevState);
      var newColor = this.color(this.props, this.state);

      if (changedState) {
        this.ripple.focusColor = this.state.on ? this.theme.onColor : this.theme.offColor;

        this.animateCircle();
      }

      if (oldColor !== newColor) {
        this.animateBorder(oldColor, newColor);
      }

      if (changedDisabled) {
        this.circle.style.backgroundColor = this.props.disabled ? this.theme.disabledColor : this.theme.onColor;
      }
    }
  }, {
    key: 'color',
    value: function color(props, state) {
      var onPrefix = state.on ? 'on' : 'off';
      var prefix = props.disabled ? 'disabled' : onPrefix;

      return this.theme[prefix + 'Color'];
    }
  }, {
    key: 'animateBorder',
    value: function animateBorder(oldColor, newColor) {
      this.border.animate({
        borderColor: [oldColor, newColor]
      }, this.animationOptions);
    }
  }, {
    key: 'animateCircle',
    value: function animateCircle() {
      var transform = ['scale(0)', 'scale(1)'];

      this.circle.animate({ transform: transform }, _extends({}, this.animationOptions, {
        direction: this.state.on ? 'normal' : 'reverse'
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var disabled = this.props.disabled;
      var on = this.state.on;

      var styles = this.styles;

      return _react2.default.createElement(
        'button',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, RadioButton), {
          tabIndex: '-1',
          role: 'radio',
          id: this.id,
          'aria-checked': on,
          'aria-disabled': disabled,
          style: styles.root
        }),
        _react2.default.createElement(
          'span',
          {
            className: 'radio-button--container',
            style: styles.container,
            onMouseDown: this.handleToggle,
            onTouchStart: this.handleToggle
          },
          _react2.default.createElement(_ripple2.default, {
            round: true,
            center: true,
            className: 'radio-button--ripple',
            style: styles.ripple,
            nowaves: this.props.noink,
            ref: function ref(element) {
              _this2.ripple = element;
            }
          }),
          _react2.default.createElement('span', {
            className: 'radio-button--circle',
            style: styles.circle,
            ref: function ref(element) {
              _this2.circle = element;
            }
          }),
          _react2.default.createElement('span', {
            className: 'radio-button--border',
            style: styles.border,
            ref: function ref(element) {
              _this2.border = element;
            }
          })
        ),
        _react2.default.createElement(
          _label2.default,
          {
            'for': this.id,
            className: 'radio-button--label',
            style: styles.label,
            onClick: this.handleToggle,
            disabled: this.props.disabled
          },
          this.props.children
        )
      );
    }
  }, {
    key: 'on',
    set: function set(state) {
      this.setState({ on: state });
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.radioButton;
    }
  }, {
    key: 'styles',
    get: function get() {
      return _stylesheet2.default.compile({
        root: _extends({
          layout: {
            direction: 'horizontal',
            inline: true,
            crossAlign: 'center',
            reverse: this.props.labelPosition === 'left'
          },
          outline: 0,
          padding: this.theme.padding,
          backgroundColor: 'inherit',
          border: 0,
          pointerEvents: this.props.disabled && 'none'
        }, this.props.style),

        container: {
          display: 'inline-block',
          position: 'relative',
          cursor: 'pointer',
          size: this.borderDiameter,
          margin: (this.theme.rippleSize - this.borderDiameter) / 2,
          borderRadius: '50%',
          zIndex: 1
        },

        border: {
          position: ['absolute', 0],
          border: this.theme.borderWidth + 'px solid transparent',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          borderRadius: '50%'
        },

        circle: {
          position: ['absolute', (this.borderDiameter - this.theme.circleSize) / 2, (this.borderDiameter - this.theme.circleSize) / 2, 'auto', 'auto'],
          transform: 'scale(0)',
          size: this.theme.circleSize,
          borderRadius: '50%',
          backgroundColor: 'transparent'
        },

        ripple: {
          position: ['absolute', (this.theme.rippleSize - this.borderDiameter) / -2]
        },

        label: {
          typo: 'body1',
          userSelect: 'none',
          padding: this.theme.padding
        }
      });
    }
  }]);

  return RadioButton;
}(_react.PureComponent);

RadioButton.propTypes = {
  name: _react.PropTypes.string.isRequired,
  disabled: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  noink: _react.PropTypes.bool,
  defaultOn: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  labelPosition: _react.PropTypes.oneOf(['left', 'right']),
  onChange: _react.PropTypes.func
};
RadioButton.defaultProps = {
  disabled: false,
  noink: false,
  defaultOn: false,
  labelPosition: 'right',
  children: '',
  style: {},
  onChange: function onChange() {}
};
RadioButton.contextTypes = { theme: _react.PropTypes.object };
exports.default = RadioButton;