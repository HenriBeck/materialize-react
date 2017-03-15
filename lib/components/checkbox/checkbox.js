'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _timings = require('../../../../../../../../src/styles/timings');

var _stylesheet = require('../../../../../../../../src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_PureComponent) {
  _inherits(Checkbox, _PureComponent);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.lastBgColor = 'transparent', _this.lastBorderColor = null, _this.parentBgColor = null, _this.animationOptions = {
      easing: _timings.easeInOutCubic,
      duration: _this.context.theme.variables.transitionTime,
      fill: 'forwards'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Checkbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var borderColor = this.colors.borderColor;


      this.lastBorderColor = borderColor;
      this.checkbox.style.borderColor = borderColor;

      if (this.props.checked) {
        this.animateCheckmark();
      }

      if (this.props.checked || this.props.disabled) {
        this.animateCheckbox();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.animateCheckbox();

      if (prevProps.disabled !== this.props.disabled) {
        this.updateCheckmarkColor();
      }

      if (prevProps.checked !== this.props.checked) {
        this.animateCheckmark();
      }
    }
  }, {
    key: 'setBgColor',
    value: function setBgColor(bgColor) {
      this.parentBgColor = bgColor;

      this.updateCheckmarkColor();
    }
  }, {
    key: 'updateCheckmarkColor',
    value: function updateCheckmarkColor() {
      this.checkmark.style.borderColor = this.props.disabled ? this.parentBgColor : this.theme.checkmarkColor;
    }
  }, {
    key: 'animateCheckmark',
    value: function animateCheckmark() {
      var checked = this.props.checked;

      var animations = { opacity: [1, checked ? 1 : 0] };

      if (checked) {
        animations.transform = ['scale(0, 0) rotate(-45deg)', 'scale(1, 1) rotate(45deg)'];
      }

      this.checkmark.animate(animations, this.animationOptions);
    }
  }, {
    key: 'animateCheckbox',
    value: function animateCheckbox() {
      var colors = this.colors;

      this.checkbox.animate({
        backgroundColor: [this.lastBgColor, colors.bgColor],
        borderColor: [this.lastBorderColor, colors.borderColor]
      }, this.animationOptions);

      this.lastBgColor = colors.bgColor;
      this.lastBorderColor = colors.borderColor;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles;

      return _react2.default.createElement(
        'span',
        {
          style: styles.checkbox,
          className: 'checkbox--checkbox',
          ref: function ref(element) {
            _this2.checkbox = element;
          }
        },
        _react2.default.createElement('span', {
          style: styles.checkmark,
          className: 'checkbox--checkmark',
          ref: function ref(element) {
            _this2.checkmark = element;
          }
        })
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.checkbox;
    }
  }, {
    key: 'colors',
    get: function get() {
      var checked = this.props.checked;


      if (this.props.disabled) {
        return {
          bgColor: checked ? this.theme.disabledCheckedBgColor : this.theme.disabledBgColor,
          borderColor: this.theme.disabledBorderColor
        };
      }

      return {
        bgColor: checked ? this.theme.checkedBgColor : this.theme.uncheckedBgColor,
        borderColor: checked ? this.theme.checkedBorderColor : this.theme.uncheckedBorderColor
      };
    }
  }, {
    key: 'styles',
    get: function get() {
      return _stylesheet2.default.compile({
        checkbox: {
          display: 'inline-block',
          position: 'relative',
          margin: (this.theme.height - this.theme.checkboxSize) / 2,
          size: this.theme.checkboxSize - this.theme.checkboxBorderWidth * 2,
          border: 'solid ' + this.theme.checkboxBorderWidth + 'px',
          borderRadius: this.theme.checkboxBorderWidth,
          willChange: 'background-color, border-color'
        },

        checkmark: {
          size: ['36%', '70%'],
          position: ['absolute', 0],
          border: 40 / 15 + 'px solid',
          borderTop: 0,
          borderLeft: 0,
          transformOrigin: '97% 86%',
          boxSizing: 'content-box',
          willChange: 'opacity, transform',
          borderColor: this.theme.checkmarkColor,
          opacity: 0
        }
      });
    }
  }]);

  return Checkbox;
}(_react.PureComponent);

Checkbox.propTypes = {
  checked: _react.PropTypes.bool.isRequired,
  disabled: _react.PropTypes.bool.isRequired
};
Checkbox.contextTypes = { theme: _react.PropTypes.object };
exports.default = Checkbox;