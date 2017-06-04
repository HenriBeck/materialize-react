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

var _stylesheet = require('/src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

var _getNextIndex = require('/src/utils/get-next-index');

var _getNextIndex2 = _interopRequireDefault(_getNextIndex);

var _radioButton = require('../radio-button');

var _radioButton2 = _interopRequireDefault(_radioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioButtonGroup = function (_PureComponent) {
  _inherits(RadioButtonGroup, _PureComponent);

  function RadioButtonGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadioButtonGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioButtonGroup.__proto__ || Object.getPrototypeOf(RadioButtonGroup)).call.apply(_ref, [this].concat(args))), _this), _this.buttons = {}, _this.selectedButton = _this.props.defaultSelected, _this.focusedButton = null, _this.isFocused = false, _this.id = new _chance2.default().string(), _this.keyDown = false, _this.handleChange = function (name, state) {
      if (state) {
        _this.buttons[_this.selectedButton].on = false;
        _this.buttons[_this.selectedButton].blur();

        _this.selectedButton = name;

        _this.buttons[_this.selectedButton].focus();
        _this.focusedButton = _this.selectedButton;

        _this.props.onChange(_this.props.name, name);
      }
    }, _this.handleKeyDown = function (ev) {
      _this.props.onKeyDown(ev);

      if (!_this.keyDown) {
        if (ev.keyCode === 13 || ev.keyCode === 32) {
          if (_this.selectedButton !== _this.focusedButton) {
            _this.buttons[_this.selectedButton].on = false;
            _this.buttons[_this.focusedButton].on = true;

            _this.selectedButton = _this.focusedButton;
          }
        } else if (ev.keyCode === 38 || ev.keyCode === 40) {
          var buttons = Object.keys(_this.buttons);
          var index = buttons.findIndex(function (button) {
            return button === _this.focusedButton;
          });
          var direction = ev.keyCode === 38 ? 'left' : 'right';
          var nextIndex = (0, _getNextIndex2.default)(buttons, index, direction);

          _this.buttons[_this.focusedButton].blur();
          _this.focusedButton = buttons[nextIndex];
          _this.buttons[_this.focusedButton].focus();
        }

        _this.keyDown = true;
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.keyDown = false;
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      if (ev.target.id === _this.id) {
        _this.focusedButton = _this.selectedButton;

        _this.buttons[_this.focusedButton].focus();
      }
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      if (ev.target.id === _this.id) {
        _this.buttons[_this.focusedButton].blur();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadioButtonGroup, [{
    key: 'renderChildren',
    value: function renderChildren() {
      var _this2 = this;

      return _react.Children.map(this.props.children, function (elem) {
        var props = {};

        if (elem.type === _radioButton2.default) {
          var name = elem.props.name;


          props.ref = function (element) {
            _this2.buttons[name] = element;
          };
          props.defaultOn = _this2.props.defaultSelected === name;
          props.onChange = _this2.handleChange;
        }

        return _react2.default.cloneElement(elem, props);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        _react2.default.createElement(
          'div',
          _extends({}, (0, _getNotDeclaredProps2.default)(this, RadioButtonGroup), {
            role: 'radiogroup',
            id: this.id,
            style: styles.root,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur
          }),
          _react2.default.createElement(
            _label2.default,
            {
              className: 'radio-button-group--label',
              'for': this.id,
              style: styles.label
            },
            this.props.label
          ),
          this.renderChildren()
        )
      );
    }
  }, {
    key: 'styles',
    get: function get() {
      return _stylesheet2.default.compile({
        root: _extends({
          layout: {
            direction: 'vertical',
            inline: true
          },
          padding: 8,
          outline: 0,
          border: 0,
          backgroundColor: 'transparent'
        }, this.props.style),

        label: { typo: 'title' }
      });
    }
  }]);

  return RadioButtonGroup;
}(_react.PureComponent);

RadioButtonGroup.propTypes = {
  name: _react.PropTypes.string.isRequired,
  children: function children(_ref2) {
    var children = _ref2.children;

    return _react.Children.toArray(children).reduce(function (count, elem) {
      var isRadioButton = elem.type === _radioButton2.default;

      return count + (isRadioButton ? 1 : 0);
    }, 0) <= 1 ? new Error('RadioButtonGroup must have atleast two RadioButton\'s inside') : null;
  },

  defaultSelected: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.string,
  style: _react.PropTypes.object,
  onChange: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func
};
RadioButtonGroup.defaultProps = {
  children: '',
  label: '',
  style: {},
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {}
};
RadioButtonGroup.contextTypes = { theme: _react.PropTypes.object };
exports.default = RadioButtonGroup;