'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _timings = require('../../styles/timings');

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A material design spinner.
 *
 * @class
 */
var Spinner = exports.Spinner = function (_PureComponent) {
  _inherits(Spinner, _PureComponent);

  function Spinner() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Spinner);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Spinner.__proto__ || Object.getPrototypeOf(Spinner)).call.apply(_ref, [this].concat(args))), _this), _this.animationOptions = {
      duration: _this.props.theme.expandContractDuration / 2,
      easing: _timings.easeInOutCubic,
      fill: 'forwards'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Spinner, [{
    key: 'componentDidMount',


    /**
     * Fade the spinner in if the active prop is passed.
     */
    value: function componentDidMount() {
      if (this.props.active) {
        this.root.classList.add('active');

        this.fadeIn();
      }
    }

    /**
     * Fade the spinner in/out when the active prop changes.
     */

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
    key: 'fadeIn',


    /**
     * Fade the spinner in.
     *
     * @private
     */
    value: function fadeIn() {
      this.root.classList.add('active');

      this.root.animate({ opacity: [0, 1] }, this.animationOptions);
    }

    /**
     * Fade the spinner out.
     *
     * @private
     */

  }, {
    key: 'fadeOut',
    value: function fadeOut() {
      var _this2 = this;

      this.anim = this.root.animate({ opacity: [1, 0] }, this.animationOptions);

      this.anim.onfinish = function () {
        return _this2.root.classList.remove('active');
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var classes = this.props.classes;


      return _react2.default.createElement(
        'div',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Spinner), {
          className: classes.spinner + ' ' + this.props.className,
          ref: function ref(element) {
            _this3.root = element;
          }
        }),
        _react2.default.createElement(
          'div',
          {
            className: classes.container,
            ref: function ref(element) {
              _this3.container = element;
            }
          },
          _react2.default.createElement(
            'div',
            { className: classes.layer },
            _react2.default.createElement('div', { className: classes.clipper + ' ' + classes.clipperLeft }),
            _react2.default.createElement('div', { className: classes.clipper + ' ' + classes.clipperRight })
          )
        )
      );
    }
  }]);

  return Spinner;
}(_react.PureComponent);

Spinner.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired,
  active: _propTypes2.default.bool,
  className: _propTypes2.default.string
};
Spinner.defaultProps = {
  active: false,
  style: {},
  className: ''
};


var styles = {
  '@keyframes spinner--container-rotate': { to: { transform: 'rotate(360deg)' } },

  '@keyframes spinner--fill-unfill-rotate': {
    '12.5%': { transform: 'rotate(135deg)' },
    '25%': { transform: 'rotate(270deg)' },
    '37.5%': { transform: 'rotate(405deg)' },
    '50%': { transform: 'rotate(540deg)' },
    '62.5%': { transform: 'rotate(675deg)' },
    '75%': { transform: 'rotate(810deg)' },
    '87.5%': { transform: 'rotate(945deg)' },
    '100%': { transform: 'rotate(1080deg)' }
  },

  '@keyframes spinner--left-spin': {
    '0%': { transform: 'rotate(130deg)' },
    '50%': { transform: 'rotate(-5deg)' },
    '100%': { transform: 'rotate(130deg)' }
  },

  '@keyframes spinner--right-spin': {
    '0%': { transform: 'rotate(-130deg)' },
    '50%': { transform: 'rotate(5deg)' },
    '100%': { transform: 'rotate(-130deg)' }
  },

  spinner: {
    composes: 'spinner',
    display: 'inline-block',
    position: 'relative',
    width: function width(props) {
      return props.theme.size;
    },
    height: function height(props) {
      return props.theme.size;
    },
    padding: 8,
    boxSizing: 'border-box',

    '&.active $container': { animationName: 'spinner--container-rotate' },

    '&.active $layer': { animationName: 'spinner--fill-unfill-rotate' },

    '&.active $clipperLeft::after': { animationName: 'spinner--left-spin' },

    '&.active $clipperRight::after': { animationName: 'spinner--right-spin' }
  },

  container: {
    composes: 'spinner--container',
    width: '100%',
    height: '100%',
    direction: 'ltr',
    animationDuration: function animationDuration(props) {
      return props.theme.containerRotationDuration + 'ms';
    },
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
  },

  layer: {
    composes: 'spinner--layer',
    position: 'absolute',
    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
    animationTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    animationIterationCount: 'infinite',
    animationDuration: function animationDuration(props) {
      return props.theme.fullCycleDuration;
    },
    borderColor: function borderColor(props) {
      return props.theme.color;
    },

    '&::after': {
      content: '""',
      boxSizing: 'border-box',
      position: 'absolute',
      top: 0,
      borderColor: 'inherit',
      borderRadius: '50%',
      left: '45%',
      width: '10%',
      borderTopStyle: 'solid',
      borderWidth: function borderWidth(props) {
        return props.theme.strokeWidth;
      }
    }
  },

  clipper: {
    composes: 'spinner--clipper',
    display: 'inline-block',
    position: 'relative',
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    borderColor: 'inherit',

    '&::after': {
      content: '""',
      boxSizing: 'border-box',
      position: 'absolute',
      top: 0,
      borderColor: 'inherit',
      borderRadius: '50%',
      bottom: 0,
      width: '200%',
      borderStyle: 'solid',
      borderBottomColor: 'transparent',
      animationTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      animationIterationCount: 'infinite',
      borderWidth: function borderWidth(props) {
        return props.theme.strokeWidth;
      },
      animationDuration: function animationDuration(props) {
        return props.theme.expandContractDuration;
      }
    }
  },

  clipperLeft: {
    composes: 'left',

    '&::after': {
      left: 0,
      borderRightColor: 'transparent',
      transform: 'rotate(129deg)'
    }
  },

  clipperRight: {
    composes: 'right',

    '&::after': {
      left: '-100%',
      borderLeftColor: 'transparent',
      transform: 'rotate(-129deg)'
    }
  }
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(Spinner), 'spinner');