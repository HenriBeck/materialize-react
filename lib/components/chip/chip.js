'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _stylesheet = require('../../../../../../../../src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _getNotDeclaredProps = require('../../../../../../../../src/utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chip = function (_PureComponent) {
  _inherits(Chip, _PureComponent);

  function Chip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Chip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chip.__proto__ || Object.getPrototypeOf(Chip)).call.apply(_ref, [this].concat(args))), _this), _this.state = { focused: false }, _this.keyDown = false, _this.handleDelete = function () {
      _this.props.onDelete(_this.props.id);
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      _this.toggleFocus();
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.toggleFocus();
    }, _this.handleKeyDown = function (ev) {
      _this.props.onKeyDown(ev);

      if (ev.keyCode === 46 && !_this.keyDown) {
        _this.keyDown = true;

        _this.handleDelete();
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.keyDown = false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chip, [{
    key: 'toggleFocus',
    value: function toggleFocus() {
      this.setState(function (_ref2) {
        var focused = _ref2.focused;

        return { focused: !focused };
      });
    }
  }, {
    key: 'renderImage',
    value: function renderImage(style) {
      var props = {
        style: style,
        className: 'chip--image'
      };

      if (_is_js2.default.json(this.props.img)) {
        return _react2.default.createElement(
          'span',
          props,
          this.props.img.text
        );
      }

      return _react2.default.createElement('img', _extends({
        alt: 'chip',
        src: this.props.img
      }, props));
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;

      return _react2.default.createElement(
        'button',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Chip), {
          className: 'chip ' + this.props.className,
          tabIndex: '0',
          style: styles.root,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }),
        _react2.default.createElement('span', {
          className: 'chip--shadow',
          style: styles.shadow
        }),
        this.props.img && this.renderImage(styles.img),
        _react2.default.createElement(
          'span',
          {
            className: 'chip--label',
            style: styles.label
          },
          this.props.children
        ),
        this.props.deletable && _react2.default.createElement(_icon2.default, {
          icon: 'close-circle',
          className: 'chip--icon',
          style: styles.delete,
          onTouchStart: this.handleDelete,
          onMouseDown: this.handleDelete
        })
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.chip;
    }
  }, {
    key: 'styles',
    get: function get() {
      return _stylesheet2.default.compile({
        root: _extends({
          position: 'relative',
          backgroundColor: this.theme.bgColor,
          borderRadius: '16px',
          height: 32,
          outline: 0,
          border: 0,
          padding: '0 ' + (this.props.deletable ? 0 : 12) + 'px 0 ' + (this.props.img ? 0 : 12) + 'px',
          layout: {
            direction: 'horizontal',
            inline: true,
            crossAlign: 'center'
          }
        }, this.props.style),

        img: {
          rightPadding: 8,
          size: 32,
          borderRadius: '50%',
          textTransform: 'uppercase',
          backgroundColor: _is_js2.default.json(this.props.img) ? this.props.img.color : 'transparent',
          lineHeight: '32px',
          textAlign: 'center',
          margin: '0 8px 0 0',
          color: _is_js2.default.json(this.props.img) ? this.props.img.textColor : 'inherit'
        },

        delete: {
          size: 24,
          lineHeight: '24px',
          fontSize: '12px',
          margin: '0 4px',
          cursor: 'pointer'
        },

        label: {
          typo: 'body1',
          color: this.theme.color,
          userSelect: 'none'
        },

        shadow: {
          position: ['absolute', 0],
          elevation: this.theme.focusedElevation,
          opacity: this.state.focused ? 1 : 0,
          transition: 'opacity ' + this.context.theme.variables.transitionTime + 'ms linear',
          borderRadius: 'inherit'
        }
      });
    }
  }]);

  return Chip;
}(_react.PureComponent);

Chip.propTypes = {
  id: _react.PropTypes.string.isRequired,
  children: _react.PropTypes.node.isRequired,
  img: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
    color: _react.PropTypes.string,
    text: _react.PropTypes.string,
    textColor: _react.PropTypes.string
  })]),
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  deletable: _react.PropTypes.bool,
  onDelete: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func
};
Chip.defaultProps = {
  img: '',
  className: '',
  deletable: false,
  style: {},
  onDelete: function onDelete() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {}
};
Chip.contextTypes = { theme: _react.PropTypes.object };
exports.default = Chip;