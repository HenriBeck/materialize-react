'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CheckboxContainer.__proto__ || Object.getPrototypeOf(CheckboxContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      checked: _this.props.defaultChecked,
      isFocused: false
    }, _this.id = _randomstring2.default.generate(), _this.isTouchEvent = false, _this.isPressingKey = false, _this.handleKeyDown = function (ev) {
      _this.props.onKeyDown(ev);

      if (!_this.isPressingKey && CheckboxContainer.keyCodes.includes(ev.keyCode)) {
        _this.isPressingKey = true;

        _this.toggle();
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.isPressingKey = false;
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      _this.setState({ isFocused: true });
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.setState({ isFocused: false });
    }, _this.handlePress = function (ev) {
      switch (ev.type) {
        case 'mousedown':
          {
            if (_this.isTouchEvent) {
              _this.isTouchEvent = false;

              return;
            }

            _this.toggle();
            break;
          }
        case 'touchstart':
          {
            _this.isTouchEvent = true;

            _this.toggle();
            break;
          }
        default:
          break;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CheckboxContainer, [{
    key: 'toggle',
    value: function toggle() {
      var _this2 = this;

      this.setState(function (_ref2) {
        var checked = _ref2.checked;

        return { checked: !checked };
      }, function () {
        return _this2.props.onChange(_this2.props.name);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _checkbox2.default,
        _extends({
          disabled: this.props.disabled,
          checked: this.state.checked,
          onPress: this.handlePress,
          onKeyUp: this.handleKeyUp,
          onKeyDown: this.handleKeyDown,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          id: this.id,
          className: this.props.className,
          isFocused: this.state.isFocused
        }, (0, _getNotDeclaredProps2.default)(this, CheckboxContainer)),
        this.props.children
      );
    }
  }, {
    key: 'checked',
    get: function get() {
      return this.state.checked;
    },
    set: function set(checked) {
      this.setState({ checked: checked });
    }
  }]);

  return CheckboxContainer;
}(_react.PureComponent);

CheckboxContainer.propTypes = {
  name: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  defaultChecked: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};
CheckboxContainer.defaultProps = {
  defaultChecked: false,
  disabled: false,
  onChange: function onChange() {},
  onKeyUp: function onKeyUp() {},
  onKeyDown: function onKeyDown() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  className: '',
  children: ''
};
CheckboxContainer.keyCodes = [32];
exports.default = CheckboxContainer;