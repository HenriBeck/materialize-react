'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wave = function (_PureComponent) {
  _inherits(Wave, _PureComponent);

  function Wave() {
    _classCallCheck(this, Wave);

    return _possibleConstructorReturn(this, (Wave.__proto__ || Object.getPrototypeOf(Wave)).apply(this, arguments));
  }

  _createClass(Wave, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.wave.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
        duration: 250 + this.props.radius * 0.1,
        fill: 'forwards'
      });
    }
  }, {
    key: 'upAction',
    value: function upAction() {
      var _this2 = this;

      this.animation = this.wave.animate({
        opacity: [this.props.initialOpacity, 0]
      }, {
        fill: 'forwards',
        duration: 250
      });

      this.animation.onfinish = function () {
        return _this2.props.onFinish(_this2.props.id);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('span', {
        className: 'ripple--wave',
        style: this.style,
        ref: function ref(element) {
          _this3.wave = element;
        }
      });
    }
  }, {
    key: 'style',
    get: function get() {
      return _extends({
        position: 'absolute',
        pointerEvents: 'none',
        opacity: this.props.initialOpacity,
        overflow: 'hidden',
        borderRadius: '50%',
        transform: 'scale(0)',
        willChange: 'opacity, transform',
        zIndex: 1
      }, this.props.style);
    }
  }]);

  return Wave;
}(_react.PureComponent);

Wave.propTypes = {
  id: _react.PropTypes.number.isRequired,
  style: _react.PropTypes.object.isRequired,
  radius: _react.PropTypes.number.isRequired,
  initialOpacity: _react.PropTypes.number.isRequired,
  onFinish: _react.PropTypes.func.isRequired
};
exports.default = Wave;