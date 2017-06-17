'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _timings = require('../../styles/timings');

var _warning = require('../../utils/warning');

var _warning2 = _interopRequireDefault(_warning);

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component to render a material design progress bar.
 *
 * @class
 */
var Progress = exports.Progress = function (_PureComponent) {
  _inherits(Progress, _PureComponent);

  function Progress() {
    _classCallCheck(this, Progress);

    return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
  }

  _createClass(Progress, [{
    key: 'componentDidMount',


    /**
     * Animate the bars to initial values.
     */
    value: function componentDidMount() {
      if (!this.props.indeterminate) {
        if (this.props.progress !== 0) {
          this.animateBar(this.primaryBar, 0, this.props.progress);
        }

        if (this.props.secondaryProgress !== 0) {
          this.animateBar(this.secondaryBar, 0, this.props.secondaryProgress);
        }
      }
    }

    /**
     * Warn if the user changes the mode prop.
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _warning2.default)(nextProps.indeterminate !== this.props.indeterminate, 'You should not change the mode of the progress bar!');
    }

    /**
     * Animate the bars when the props changed.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!this.props.indeterminate) {
        var secondaryProgress = this.props.secondaryProgress;


        if (this.props.progress !== prevProps.progress) {
          this.animateBar(this.primaryBar, prevProps.progress, this.props.progress);
        }

        if (secondaryProgress !== prevProps.secondaryProgress) {
          this.animateBar(this.secondaryBar, prevProps.secondaryProgress, secondaryProgress);
        }
      }
    }

    /**
     * Animate one of the bars.
     *
     * @private
     * @param {Object} elem - The element to animate.
     * @param {Number} prevProgress - The previous progress.
     * @param {Number} newProgress - The new progress to animate too.
     */

  }, {
    key: 'animateBar',
    value: function animateBar(elem, prevProgress, newProgress) {
      var transform = window.getComputedStyle(elem).transform;
      var clampNewValue = Progress.clamp(newProgress);
      var clampPrevValue = Progress.clamp(prevProgress);
      var fullAnimationDuration = this.props.theme.fullAnimationDuration;


      elem.animate({
        transform: [transform, 'matrix(' + clampNewValue / 100 + ', 0, 0, 1, 0, 0)']
      }, {
        fill: 'forwards',
        duration: Math.abs((clampPrevValue - clampNewValue) / 100) * fullAnimationDuration,
        easing: _timings.easeInOutCubic
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;

      var props = {};
      var isIndeterminate = this.props.indeterminate;
      var className = (0, _classnames2.default)(this.props.className, classes.progress, {
        active: isIndeterminate && this.props.active,
        indeterminate: isIndeterminate
      });

      if (isIndeterminate) {
        props['data-active'] = this.props.active;
      } else {
        props['aria-valuenow'] = Progress.clamp(this.props.progress);
        props['aria-valuemin'] = 0;
        props['aria-valuemax'] = 100;
      }

      return _react2.default.createElement(
        'span',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Progress), {
          role: 'progressbar',
          'aria-disabled': this.props.disabled,
          className: className,
          ref: function ref(element) {
            _this2.root = element;
          }
        }, props),
        _react2.default.createElement(
          'div',
          { className: classes.container },
          _react2.default.createElement('div', {
            className: classes.secondaryBar,
            ref: function ref(element) {
              _this2.secondaryBar = element;
            }
          }),
          _react2.default.createElement('div', {
            className: classes.primaryBar,
            ref: function ref(element) {
              _this2.primaryBar = element;
            }
          })
        )
      );
    }
  }], [{
    key: 'clamp',


    /**
     * Make sure the value that the user passed in is valid and is between 0 and 100.
     *
     * @param {Number} value - The value to validate.
     * @returns {Number} - Returns the value when it's valid.
     * Returns the min or max value when it's not valid.
     */
    value: function clamp(value) {
      return Math.max(0, Math.min(value, 100));
    }
  }]);

  return Progress;
}(_react.PureComponent);

Progress.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired,
  indeterminate: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  progress: _propTypes2.default.number,
  secondaryProgress: _propTypes2.default.number,
  className: _propTypes2.default.string,
  active: _propTypes2.default.bool
};
Progress.defaultProps = {
  indeterminate: false,
  progress: 0,
  className: '',
  style: {},
  active: false,
  secondaryProgress: 0,
  disabled: false
};


var layoutFit = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

var styles = {
  '@keyframes progress--bar': {
    '0%': { transform: 'scaleX(1) translateX(-100%)' },
    '50%': { transform: 'scaleX(1) translateX(0%)' },
    '75%': {
      transform: 'scaleX(1) translateX(0%)',
      animationTimingFunction: 'cubic-bezier(.28, .62, .37, .91)'
    },
    '100%': { transform: 'scaleX(0) translateX(0%)' }
  },

  '@keyframes progress--splitter': {
    '0%': { transform: 'scaleX(.75) translateX(-125%)' },
    '30%': {
      transform: 'scaleX(.75) translateX(-125%)',
      animationTimingFunction: 'cubic-bezier(.42, 0, .6, .8)'
    },
    '90%': { transform: 'scaleX(.75) translateX(125%)' },
    '100%': { transform: 'scaleX(.75) translateX(125%)' }
  },

  progress: {
    composes: 'progress',
    display: 'block',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',

    '&.indeterminate $primaryBar': {
      transformOrigin: 'right center',
      animationIterationCount: 'infinite',
      animationDuration: function animationDuration(props) {
        return props.theme.indeterminateDuration;
      }
    },

    '&.indeterminate $primaryBar::after': _extends({}, layoutFit, {
      content: '""',
      transformOrigin: 'center center',
      animationIterationCount: 'infinite',
      height: function height(props) {
        return props.theme.barHeight;
      },
      backgroundColor: function backgroundColor(props) {
        return props.theme.backgroundColor;
      },
      animationDuration: function animationDuration(props) {
        return props.theme.indeterminateDuration;
      }
    }),

    '&.indeterminate.active $primaryBar': { animationName: 'progress--bar' },

    '&.indeterminate.active $primaryBar::after': { animationName: 'progress--splitter' }
  },

  container: {
    position: 'relative',
    width: '100%',
    height: function height(props) {
      return props.theme.barHeight;
    },
    backgroundColor: function backgroundColor(props) {
      return props.theme.backgroundColor;
    }
  },

  primaryBar: _extends({}, layoutFit, {
    transformOrigin: 'left center',
    willChange: 'transform',
    transform: 'scaleX(0)',
    backgroundColor: function backgroundColor(props) {
      return props.disabled ? props.theme.disabledPrimaryBarColor : props.theme.primaryBarColor;
    }
  }),

  secondaryBar: _extends({}, layoutFit, {
    transformOrigin: 'left center',
    willChange: 'transform',
    transform: 'scaleX(0)',
    backgroundColor: function backgroundColor(props) {
      return props.disabled ? props.theme.disabledSecondaryBarColor : props.theme.secondaryBarColor;
    }
  })
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(Progress), 'progress');