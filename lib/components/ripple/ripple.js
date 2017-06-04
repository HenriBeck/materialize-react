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

var _wave = require('./wave');

var _wave2 = _interopRequireDefault(_wave);

var _focusContainer = require('./focus-container');

var _focusContainer2 = _interopRequireDefault(_focusContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The presentation container for the ripple.
 *
 * @class
 */
var Ripple = function (_PureComponent) {
  _inherits(Ripple, _PureComponent);

  function Ripple() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Ripple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Ripple.__proto__ || Object.getPrototypeOf(Ripple)).call.apply(_ref, [this].concat(args))), _this), _this.waves = {}, _this.handleMouseDown = function (ev) {
      _this.props.onMouseDown(ev);

      _this.props.onDownAction(ev);
    }, _this.handleMouseUp = function (ev) {
      _this.props.onMouseUp(ev);

      _this.emitUpAction();
    }, _this.handleTouchStart = function (ev) {
      _this.props.onTouchStart(ev);

      _this.props.onDownAction(ev);
    }, _this.handleTouchEnd = function (ev) {
      _this.props.onTouchEnd(ev);

      _this.emitUpAction();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Ripple, [{
    key: 'emitUpAction',


    /**
     * Emit an event to all of the current active ripples.
     */
    value: function emitUpAction() {
      var _this2 = this;

      this.props.waves.forEach(function (wave) {
        _this2.waves[wave.id].startFadeOutAnimation();
      });
    }

    /**
     * Add a wave when the user clicks inside.
     */


    /**
     * Emit up actions to all of the waves.
     */


    /**
     * Create a new wave when the user touches the element.
     */


    /**
     * Emit up actions to all of the waves when the user removes the finger.
     */

  }, {
    key: 'renderWaves',


    /**
     * Render the waves with all of the required props.
     *
     * @private
     * @returns {JSX[]} - Returns the waves as an array.
     */
    value: function renderWaves() {
      var _this3 = this;

      return this.props.waves.map(function (wave) {
        return _react2.default.createElement(_wave2.default, _extends({
          initialOpacity: _this3.props.initialOpacity,
          key: wave.id,
          classes: _this3.props.classes,
          onFinish: _this3.props.onAnimationFinish,
          ref: function ref(element) {
            _this3.waves[wave.id] = element;
          }
        }, wave));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'span',
        {
          role: 'presentation',
          className: this.props.className + ' ' + this.props.classes.ripple,
          ref: function ref(element) {
            _this4.root = element;
          },
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        },
        _react2.default.createElement(_focusContainer2.default, {
          classes: this.props.classes,
          round: this.props.round,
          opacity: this.props.focusOpacity,
          isFocused: this.props.isFocused,
          color: this.props.focusColor
        }),
        _react2.default.createElement(
          'span',
          { className: this.props.classes.waveContainer },
          this.renderWaves()
        )
      );
    }
  }]);

  return Ripple;
}(_react.PureComponent);

Ripple.propTypes = {
  waves: _propTypes2.default.array.isRequired, // eslint-disable-line react/forbid-prop-types
  initialOpacity: _propTypes2.default.number.isRequired,
  classes: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string.isRequired,
  isFocused: _propTypes2.default.bool.isRequired,
  focusOpacity: _propTypes2.default.number.isRequired,
  focusColor: _propTypes2.default.string.isRequired,
  round: _propTypes2.default.bool.isRequired,
  onDownAction: _propTypes2.default.func.isRequired,
  onAnimationFinish: _propTypes2.default.func.isRequired,
  onMouseDown: _propTypes2.default.func.isRequired,
  onMouseUp: _propTypes2.default.func.isRequired,
  onTouchStart: _propTypes2.default.func.isRequired,
  onTouchEnd: _propTypes2.default.func.isRequired
};
exports.default = Ripple;