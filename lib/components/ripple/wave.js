'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React Component to render a wave.
 *
 * @class
 */
var Wave = function (_PureComponent) {
  _inherits(Wave, _PureComponent);

  function Wave() {
    _classCallCheck(this, Wave);

    return _possibleConstructorReturn(this, (Wave.__proto__ || Object.getPrototypeOf(Wave)).apply(this, arguments));
  }

  _createClass(Wave, [{
    key: 'componentDidMount',


    /**
     * Start the scale animation.
     */
    value: function componentDidMount() {
      this.wave.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
        duration: 180 + this.props.radius * 0.11,
        fill: 'forwards'
      });
    }

    /**
     * Start the fade out animation and call the onFinish prop when the animation has finished
     * so we can remove the element from the dom.
     */

  }, {
    key: 'startFadeOutAnimation',
    value: function startFadeOutAnimation() {
      var _this2 = this;

      this.animation = this.wave.animate([{ opacity: this.props.initialOpacity }, { opacity: 0 }], {
        fill: 'forwards',
        duration: 180
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
        className: this.props.classes.wave,
        style: this.props.style,
        ref: function ref(element) {
          _this3.wave = element;
        }
      });
    }
  }]);

  return Wave;
}(_react.PureComponent);

Wave.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  id: _propTypes2.default.number.isRequired,
  style: _propTypes2.default.object.isRequired,
  radius: _propTypes2.default.number.isRequired,
  initialOpacity: _propTypes2.default.number.isRequired,
  onFinish: _propTypes2.default.func.isRequired
};
exports.default = Wave;