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

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

var _stylesheet = require('/src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxContainer = function (_PureComponent) {
  _inherits(CheckboxContainer, _PureComponent);

  function CheckboxContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CheckboxContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CheckboxContainer.__proto__ || Object.getPrototypeOf(CheckboxContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = { checked: _this.props.defaultChecked }, _this.id = new _chance2.default().string(), _this.handleToggle = function () {
      _this.setState(function (prevState) {
        return { checked: !prevState.checked };
      }, function () {
        return _this.props.onChange(_this.props.name, _this.state.checked);
      });
    }, _this.handleKeyDown = function (ev) {
      _this.props.onKeyDown(ev);

      if (CheckboxContainer.keyCodes.includes(ev.keyCode) && !_this.keyDown) {
        _this.handleToggle();

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

  _createClass(CheckboxContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkbox.setBgColor(window.getComputedStyle(this.root).backgroundColor);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, _ref2) {
      var checked = _ref2.checked;

      if (checked !== this.state.checked) {
        this.ripple.focusColor = this.state.checked ? this.theme.checkedBorderColor : this.theme.uncheckedBorderColor;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var disabled = this.props.disabled;
      var checked = this.state.checked;

      var styles = this.styles;

      return _react2.default.createElement(
        'button',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, CheckboxContainer), {
          tabIndex: disabled ? -1 : 0,
          'aria-checked': checked,
          'aria-disabled': disabled,
          role: 'checkbox',
          className: 'checkbox ' + this.props.className,
          style: styles.root,
          id: this.id,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          ref: function ref(element) {
            _this2.root = element;
          }
        }),
        _react2.default.createElement(
          'span',
          {
            style: styles.container,
            className: 'checkbox--container',
            onMouseDown: this.handleToggle,
            onTouchStart: this.handleToggle
          },
          _react2.default.createElement(_checkbox2.default, {
            checked: this.state.checked,
            disabled: this.props.disabled,
            ref: function ref(element) {
              _this2.checkbox = element;
            }
          }),
          _react2.default.createElement(_ripple2.default, _extends({
            round: true,
            center: true,
            nowaves: this.props.noink,
            className: 'checkbox--ripple',
            ref: function ref(element) {
              _this2.ripple = element;
            }
          }, this.rippleColors))
        ),
        _react2.default.createElement(
          _label2.default,
          {
            style: styles.label,
            'for': this.id,
            className: 'checkbox--label',
            onMouseDown: this.handleToggle,
            onTouchStart: this.handleToggle
          },
          this.props.children
        )
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.checkbox;
    }
  }, {
    key: 'rippleColors',
    get: function get() {
      return {
        color: this.state.checked ? this.theme.checkedBorderColor : this.theme.uncheckedBorderColor,
        focusColor: this.props.defaultChecked ? this.theme.checkedBorderColor : this.theme.uncheckedBorderColor
      };
    }
  }, {
    key: 'checked',
    get: function get() {
      return this.state.checked;
    },
    set: function set(checked) {
      this.setState({ checked: checked });
    }
  }, {
    key: 'styles',
    get: function get() {
      var disabled = this.props.disabled;


      return _stylesheet2.default.compile({
        root: _extends({
          layout: {
            direction: 'horizontal',
            inline: true,
            crossAlign: 'center',
            reverse: this.props.labelPosition === 'left'
          },
          pointerEvents: disabled && 'none',
          boxSizing: 'border-box',
          outline: 'none',
          border: 0,
          padding: this.theme.padding,
          height: this.theme.height + this.theme.padding * 2,
          backgroundColor: 'inherit'
        }, this.props.style),

        container: {
          size: this.theme.height,
          display: 'inline-block',
          position: 'relative',
          cursor: 'pointer',
          borderRadius: '50%',
          boxSizing: 'border-box',
          pointerEvents: disabled && 'none'
        },

        label: {
          cursor: !disabled && 'pointer',
          color: disabled ? this.theme.disabledLabelColor : this.theme.labelColor
        }
      });
    }
  }]);

  return CheckboxContainer;
}(_react.PureComponent);

CheckboxContainer.propTypes = {
  name: _react.PropTypes.string.isRequired,
  defaultChecked: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  disabled: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  noink: _react.PropTypes.bool,
  labelPosition: _react.PropTypes.oneOf(['left', 'right']),
  className: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func
};
CheckboxContainer.defaultProps = {
  name: '',
  defaultChecked: false,
  style: {},
  disabled: false,
  noink: false,
  labelPosition: 'right',
  className: '',
  children: '',
  onChange: function onChange() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {}
};
CheckboxContainer.contextTypes = { theme: _react.PropTypes.object };
CheckboxContainer.keyCodes = [32];
exports.default = CheckboxContainer;