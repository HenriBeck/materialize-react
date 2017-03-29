'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _stylesheet = require('../../styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _timings = require('../../styles/timings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spinner = function (_PureComponent) {
  _inherits(Spinner, _PureComponent);

  function Spinner() {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
  }

  _createClass(Spinner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setupAnimations();

      if (this.props.active) {
        this.fadeIn();
      } else {
        this.fadeOut();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.active !== this.props.active) {
        if (this.props.active) {
          this.fadeIn();
        } else {
          this.fadeOut();
        }
      }
    }
  }, {
    key: 'setupAnimations',
    value: function setupAnimations() {
      var _theme = this.theme,
          radius = _theme.radius,
          arctime = _theme.arctime,
          arcsize = _theme.arcsize,
          arcStartRotate = _theme.arcStartRotate;


      this.container.animate({
        transform: ['rotate(0deg)', 'rotate(360deg)']
      }, {
        duration: 360 * arctime / (arcStartRotate + 360 - arcsize),
        iterations: Infinity
      });

      this.spinner.animate({
        strokeDashoffset: [2 * radius * Math.PI * arcsize / 360 - 0.1, 0, -(2 * radius * Math.PI * arcsize / 360 - 0.5)]
      }, {
        iterations: Infinity,
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        fill: 'forwards',
        duration: arctime
      });

      this.spinner.animate({
        transform: ['rotate(0deg)', 'rotate(-360deg)']
      }, {
        iterations: Infinity,
        fill: 'forwards',
        duration: arctime * 4,
        easing: 'steps(4)'
      });
    }
  }, {
    key: 'fadeIn',
    value: function fadeIn() {
      this.root.animate({ opacity: [0, 1] }, {
        duration: this.theme.arctime / 2,
        easing: _timings.easeInOutCubic,
        fill: 'forwards'
      });
    }
  }, {
    key: 'fadeOut',
    value: function fadeOut() {
      this.root.animate({ opacity: [1, 0] }, {
        duration: this.theme.arctime / 2,
        easing: _timings.easeInOutCubic,
        fill: 'forwards'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles;
      var _theme2 = this.theme,
          radius = _theme2.radius,
          strokeWidth = _theme2.strokeWidth;


      return _react2.default.createElement(
        'div',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Spinner), {
          className: 'spinner ' + this.props.className,
          style: styles.root,
          ref: function ref(element) {
            _this2.root = element;
          }
        }),
        _react2.default.createElement(
          'svg',
          {
            width: '48px',
            height: '48px',
            viewBox: '0 0 ' + (radius * 2 + strokeWidth) + ' ' + (radius * 2 + strokeWidth),
            className: 'spinner--svg'
          },
          _react2.default.createElement(
            'g',
            {
              style: styles.container,
              className: 'spinner--container',
              ref: function ref(element) {
                _this2.container = element;
              }
            },
            _react2.default.createElement('path', {
              fill: 'none',
              d: 'M 14,1.5 A 12.5,12.5 0 1 1 1.5,14',
              strokeLinecap: 'round',
              style: styles.spinner,
              className: 'spinner--spinner',
              ref: function ref(element) {
                _this2.spinner = element;
              }
            })
          )
        )
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.spinner;
    }
  }, {
    key: 'styles',
    get: function get() {
      var arrayAndOffset = 2 * this.theme.radius * Math.PI * this.theme.arcsize / 360;

      return _stylesheet2.default.compile({
        root: _extends({
          size: 64,
          display: 'inline-block',
          position: 'relative',
          margin: 8,
          opacity: 0,
          padding: 8,
          boxSizing: 'border-box'
        }, this.props.style),

        container: {
          strokeWidth: this.theme.strokeWidth,
          transformOrigin: '50% 50%',
          size: 64
        },

        spinner: {
          strokeDasharray: arrayAndOffset,
          strokeDashoffset: arrayAndOffset,
          transformOrigin: '50% 50%',
          stroke: this.theme.color
        }
      });
    }
  }]);

  return Spinner;
}(_react.PureComponent);

Spinner.propTypes = {
  active: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  className: _react.PropTypes.string
};
Spinner.defaultProps = {
  active: false,
  style: {},
  className: ''
};
Spinner.contextTypes = { theme: _react.PropTypes.object };
exports.default = Spinner;