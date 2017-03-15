'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wave = require('./wave');

var _wave2 = _interopRequireDefault(_wave);

var _getNotDeclaredProps = require('../../../../../../../../src/utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _elementRect = require('./element-rect');

var _elementRect2 = _interopRequireDefault(_elementRect);

var _stylesheet = require('../../../../../../../../src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _event = require('../../../../../../../../src/utils/event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ripple = function (_PureComponent) {
  _inherits(Ripple, _PureComponent);

  function Ripple() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Ripple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Ripple.__proto__ || Object.getPrototypeOf(Ripple)).call.apply(_ref, [this].concat(args))), _this), _this.state = { waves: [] }, _this.wavesCount = 0, _this.waves = {}, _this.isFocused = false, _this.focusAnimationOptions = {
      fill: 'forwards',
      duration: _this.context.theme.variables.transitionTime
    }, _this.downAction = function (ev) {
      _this.addWave(ev);
    }, _this.upAction = function () {
      _this.state.waves.forEach(function (wave) {
        _this.waves[wave.id].upAction();
      });
    }, _this.addFocus = function () {
      if (!_this.isFocused) {
        _this.toggleFocus({});

        _this.isFocused = true;
      }
    }, _this.removeFocus = function () {
      if (_this.isFocused) {
        _this.toggleFocus({ direction: 'reverse' });

        _this.isFocused = false;
      }
    }, _this.handleRemoveWave = function (waveId) {
      _this.setState(function (_ref2) {
        var waves = _ref2.waves;

        return { waves: waves.filter(function (wave) {
            return wave.id !== waveId;
          }) };
      });
    }, _this.handleMouseDown = function (ev) {
      _this.props.onMouseDown(ev);

      _this.downAction(ev);
    }, _this.handleMouseUp = function (ev) {
      _this.props.onMouseUp(ev);

      _this.upAction();
    }, _this.handleTouchStart = function (ev) {
      _this.props.onTouchStart(ev);

      _this.downAction(ev);
    }, _this.handleTouchEnd = function (ev) {
      _this.props.onTouchEnd(ev);

      _this.upAction();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Ripple, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _window$getComputedSt = window.getComputedStyle(this.root),
          zIndex = _window$getComputedSt.zIndex;

      this.root.style.zIndex = isNaN(parseInt(zIndex, 10)) ? 1 : parseInt(zIndex, 10) + 1;

      this.focus.style.backgroundColor = this.props.focusColor || this.focusColor;
    }
  }, {
    key: 'addWave',
    value: function addWave(ev) {
      var containerRect = new _elementRect2.default(this.root);
      var center = containerRect.center;
      var currentCords = new _event2.default(ev).getCords();
      var isCentered = this.props.center || !currentCords;
      var startPosition = isCentered ? center : {
        x: currentCords.x - containerRect.boundingRect.left,
        y: currentCords.y - containerRect.boundingRect.top
      };
      var distanceToCorner = isCentered ? Math.pow(Math.pow(center.x, 2) + Math.pow(center.y, 2), 0.5) : containerRect.distanceToFarthestCorner(startPosition);
      var radius = Math.min(distanceToCorner, Ripple.MAX_RADIUS);

      this.wavesCount += 1;

      var newWave = {
        id: this.wavesCount,
        radius: radius,
        style: {
          height: radius * 2,
          width: radius * 2,
          left: startPosition.x - radius,
          top: startPosition.y - radius,
          backgroundColor: this.props.color || this.color
        }
      };

      this.setState(function (state) {
        return { waves: state.waves.concat([newWave]) };
      });
    }
  }, {
    key: 'toggleFocus',
    value: function toggleFocus(options) {
      var animation = { opacity: [0, this.props.focusOpacity] };

      if (this.props.round) {
        animation.transform = ['scale(0)', 'scale(1)'];
      }

      this.focus.animate(animation, _extends({}, this.focusAnimationOptions, options));
    }
  }, {
    key: 'renderWaves',
    value: function renderWaves() {
      var _this2 = this;

      return this.state.waves.map(function (wave) {
        return _react2.default.createElement(_wave2.default, {
          initialOpacity: _this2.props.initialOpacity,
          style: wave.style,
          radius: wave.radius,
          id: wave.id,
          onFinish: _this2.handleRemoveWave,
          key: wave.id,
          ref: function ref(element) {
            _this2.waves[wave.id] = element;
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var styles = this.styles;

      return _react2.default.createElement(
        'span',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Ripple), {
          className: 'ripple ' + this.props.className,
          style: styles.root,
          ref: function ref(element) {
            _this3.root = element;
          },
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        }),
        _react2.default.createElement('span', {
          className: 'ripple--focus',
          style: styles.focus,
          ref: function ref(element) {
            _this3.focus = element;
          }
        }),
        _react2.default.createElement(
          'span',
          {
            className: 'ripple--wave-container',
            style: styles.waveContainer
          },
          this.renderWaves()
        )
      );
    }
  }, {
    key: 'color',


    /**
     * Get the computed color of the root node.
     *
     * @returns {String} - Returns the color.
     */
    get: function get() {
      return window.getComputedStyle(this.root).color;
    }

    /**
     * Get the focus color. Either the color passed as a prop or the inherited color.
     *
     * @returns {String} - Returns the focus color.
     */

  }, {
    key: 'focusColor',
    get: function get() {
      return this.props.focusColor || this.color;
    }

    /**
     * Set the current focus color and animate to it.
     *
     * @param {String} color - The new focus color.
     */
    ,
    set: function set(color) {
      if (this.isFocused) {
        this.focus.animate({
          backgroundColor: [window.getComputedStyle(this.focus).backgroundColor, color]
        }, this.focusAnimationOptions);
      } else {
        this.focus.style.backgroundColor = color;
      }
    }
  }, {
    key: 'styles',
    get: function get() {
      var round = this.props.round;


      return _stylesheet2.default.compile({
        root: _extends({
          position: ['absolute', 0],
          display: 'block',
          borderRadius: 'inherit',
          overflow: 'hidden',
          cursor: 'pointer',
          zIndex: 'inherit',
          pointerEvents: this.props.nowaves ? 'none' : 'inherit'
        }, this.props.style),

        focus: {
          position: ['absolute', 0],
          borderRadius: round ? '50%' : 'inherit',
          opacity: 0
        },

        waveContainer: {
          position: ['absolute', 0, 'auto', 'auto', 0],
          size: '100%',
          pointerEvents: 'none',
          borderRadius: round ? '50%' : 'inherit',
          overflow: 'hidden'
        }
      });
    }
  }]);

  return Ripple;
}(_react.PureComponent);

Ripple.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  round: _react.PropTypes.bool,
  center: _react.PropTypes.bool,
  initialOpacity: _react.PropTypes.number,
  color: _react.PropTypes.string,
  focusColor: _react.PropTypes.string,
  focusOpacity: _react.PropTypes.number,
  nowaves: _react.PropTypes.bool,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func
};
Ripple.defaultProps = {
  style: {},
  className: '',
  round: false,
  center: false,
  initialOpacity: 0.25,
  color: '',
  focusColor: null,
  focusOpacity: 0.2,
  nowaves: false,
  onMouseDown: function onMouseDown() {},
  onMouseUp: function onMouseUp() {},
  onTouchStart: function onTouchStart() {},
  onTouchEnd: function onTouchEnd() {}
};
Ripple.contextTypes = { theme: _react.PropTypes.object };
Ripple.MAX_RADIUS = 300;
exports.default = Ripple;