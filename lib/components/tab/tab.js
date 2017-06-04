'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stylesheet = require('/src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_PureComponent) {
  _inherits(Tab, _PureComponent);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isFocused: false }, _this.focus = function () {
      return _this.setState({ isFocused: true });
    }, _this.blur = function () {
      return _this.setState({ isFocused: false });
    }, _this.handleMouseDown = function (ev) {
      _this.props.onMouseDown(ev);

      _this.props.onPress(_this.props.id);
    }, _this.handleTouchStart = function (ev) {
      _this.props.onTouchStart(ev);

      _this.props.onPress(_this.props.id);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.content.style.color = this.getColor(this.props.active);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.active !== this.props.active) {
        this.content.animate({
          color: [this.getColor(prevProps.active), this.getColor(this.props.active)]
        }, {
          duration: this.context.theme.variables.transitionTime,
          fill: 'forwards'
        });
      }
    }
  }, {
    key: 'getColor',
    value: function getColor(active) {
      return active ? this.theme.activeColor : this.theme.inactiveColor;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles;

      return _react2.default.createElement(
        'div',
        {
          role: 'tab',
          className: 'tab',
          style: styles.root,
          'aria-selected': this.props.active,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          ref: function ref(element) {
            _this2.root = element;
          }
        },
        _react2.default.createElement(
          'span',
          {
            className: 'tab--content',
            style: styles.content,
            ref: function ref(element) {
              _this2.content = element;
            }
          },
          this.props.children
        ),
        _react2.default.createElement(_ripple2.default, {
          className: 'tab--ripple',
          nowaves: this.props.noink,
          color: this.theme.rippleColor,
          ref: function ref(element) {
            _this2.ripple = element;
          }
        })
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.tab;
    }
  }, {
    key: 'styles',
    get: function get() {
      return _stylesheet2.default.compile({
        root: _extends({
          maxWidth: '264px',
          minWidth: '160px',
          padding: '0 12px',
          height: 48,
          position: 'relative',
          layout: {
            direction: 'vertical',
            mainAlign: 'center',
            crossAlign: 'center'
          }
        }, this.props.style),

        content: {
          width: '100%',
          typo: 'body1',
          textTransform: 'uppercase',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          textAlign: 'center',
          fontWeight: this.state.isFocused && 700
        }
      });
    }
  }, {
    key: 'position',
    get: function get() {
      return this.root.getBoundingClientRect();
    }
  }]);

  return Tab;
}(_react.PureComponent);

Tab.propTypes = {
  children: _react.PropTypes.node.isRequired,
  id: _react.PropTypes.string.isRequired,
  noink: _react.PropTypes.bool,
  active: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  onPress: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func
};
Tab.defaultProps = {
  noink: false,
  style: {},
  active: false,
  onPress: function onPress() {},
  onMouseDown: function onMouseDown() {},
  onTouchStart: function onTouchStart() {}
};
Tab.contextTypes = { theme: _react.PropTypes.object };
exports.default = Tab;