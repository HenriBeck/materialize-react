'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getNotDeclaredProps = require('../../../../../../../../src/utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _stylesheet = require('../../../../../../../../src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _timings = require('../../../../../../../../src/styles/timings');

var _warning = require('../../../../../../../../src/utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_PureComponent) {
  _inherits(Progress, _PureComponent);

  function Progress() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Progress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Progress.__proto__ || Object.getPrototypeOf(Progress)).call.apply(_ref, [this].concat(args))), _this), _this.barAnimation = null, _this.indeterminateAnimation = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Progress, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Check if the component is in normal mode and if the progress is not 0
      // elsewise check if the component is in indeterminate mode and active
      // to start the indeterminate animation
      if (this.isNormal && Progress.clamp(this.props.progress) !== 0) {
        this.animateBar(0, this.props.progress);
      } else if (this.isIndeterminate && this.props.active) {
        this.startIndeterminate();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var modeChanged = nextProps.mode !== this.props.mode;

      (0, _warning2.default)(modeChanged, 'You should not change the mode of the progress bar!');

      return !modeChanged;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var animOptions = {
        duration: this.context.theme.variables.defaultTransitionTime,
        fill: 'forwards'
      };

      if (this.isNormal && prevProps.progress !== this.props.progress) {
        this.animateBar(prevProps.progress, this.props.progress);
      }

      if (this.isIndeterminate && prevProps.active !== this.props.active) {
        if (!this.barAnimation && !this.indeterminateAnimation) {
          this.startIndeterminate();
        } else {
          this.bar.animate({ opacity: this.props.active ? [0, 1] : [1, 0] }, animOptions);
        }
      }
    }
  }, {
    key: 'animateBar',


    /**
     * Animate the progress bar to the new value.
     *
     * @param {Number} prevProgress - The previous progress.
     * We need it to compute the animation duration.
     * @param {Number} progress - The progress to animate to.
     * @returns {Object} - Returns the animation object.
     */
    value: function animateBar(prevProgress, progress) {
      // Get the current progress
      // We get it in a matrix form so we have to
      var transform = window.getComputedStyle(this.bar).transform;
      var clampNew = Progress.clamp(progress);
      var clampPrev = Progress.clamp(prevProgress);

      // Animate the bar
      this.bar.animate({
        transform: [transform, 'matrix(' + clampNew / 100 + ', 0, 0, 1, 0, 0)']
      }, {
        fill: 'forwards',
        // Compute the duration based on the difference
        duration: Math.abs((clampNew - clampPrev) / 100) * 800,
        easing: _timings.easeInOutCubic
      });
    }

    /**
     * Start the indeterminate animation.
     *
     * @returns {undefined} - Returns nothing.
     */

  }, {
    key: 'startIndeterminate',
    value: function startIndeterminate() {
      var animationOptions = {
        duration: 2 * 1000,
        iterations: Infinity
      };

      this.barAnimation = this.bar.animate([{
        offset: 0,
        transform: 'scaleX(1) translateX(-100%)'
      }, {
        offset: 0.5,
        transform: 'scaleX(1) translateX(0%)'
      }, {
        offset: 0.75,
        transform: 'scaleX(1) translateX(0%)',
        easing: 'cubic-bezier(.28,.62,.37,.91)'
      }, {
        offset: 1,
        transform: 'scaleX(0) translateX(0%)'
      }], animationOptions);

      this.indeterminateAnimation = this.indeterminate.animate([{
        offset: 0,
        transform: 'scaleX(.75) translateX(-125%)'
      }, {
        offset: 0.3,
        transform: 'scaleX(.75) translateX(-125%)',
        easing: 'cubic-bezier(.42,0,.6,.8)'
      }, {
        offset: 0.9,
        transform: 'scaleX(.75) translateX(125%)'
      }, {
        offset: 1,
        transform: 'scaleX(.75) translateX(125%)'
      }], animationOptions);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles;
      var props = {};

      if (this.isNormal) {
        props['aria-valuenow'] = Progress.clamp(this.props.progress);
        props['aria-valuemin'] = 0;
        props['aria-valuemax'] = 100;
      }

      if (this.isIndeterminate) {
        props['data-active'] = this.props.active;
      }

      return _react2.default.createElement(
        'span',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Progress), {
          role: 'progressbar',
          'data-mode': this.props.mode,
          className: 'progress ' + this.props.className,
          style: styles.root
        }, props),
        _react2.default.createElement('span', {
          style: styles.bar,
          className: 'progress--bar',
          ref: function ref(element) {
            _this2.bar = element;
          }
        }),
        this.isIndeterminate && _react2.default.createElement('span', {
          style: styles.indeterminate,
          className: 'progress--indeterminate',
          ref: function ref(element) {
            _this2.indeterminate = element;
          }
        })
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return this.context.theme.progress;
    }

    /**
     * Check if the component is in normal mode.
     *
     * @returns {Boolean} - Returns whether the component is in the normal mode.
     */

  }, {
    key: 'isNormal',
    get: function get() {
      return this.props.mode === 'normal';
    }

    /**
     * Check if the component is in indeterminate mode.
     *
     * @returns {Boolean} - Returns whether the component is in the indeterminate mode.
     */

  }, {
    key: 'isIndeterminate',
    get: function get() {
      return this.props.mode === 'indeterminate';
    }

    /**
     * Compile the styles for the component.
     *
     * @returns {Object} - Returns the styles.
     */

  }, {
    key: 'styles',
    get: function get() {
      return _stylesheet2.default.compile({
        root: _extends({
          display: 'block',
          position: 'relative',
          size: ['100%', this.theme.barHeight],
          backgroundColor: this.theme.bgColor,
          overflow: 'hidden'
        }, this.props.style),

        bar: {
          position: ['absolute', 0],
          size: ['100%', this.theme.barHeight],
          backgroundColor: this.theme.barColor,
          transform: 'scaleX(0.5)',
          transformOrigin: this.isIndeterminate ? 'right center' : 'left center'
        },

        indeterminate: {
          backgroundColor: this.theme.backgroundColor,
          height: this.theme.barHeight,
          position: ['absolute', 0],
          transformOrigin: 'center center'
        }
      }, { variables: this.context.theme.variables });
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
  mode: _react.PropTypes.oneOf(['normal', 'indeterminate']),
  progress: _react.PropTypes.number,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  active: _react.PropTypes.bool
};
Progress.defaultProps = {
  mode: 'normal',
  progress: 0,
  className: '',
  style: {},
  active: false
};
Progress.contextTypes = { theme: _react.PropTypes.object };
exports.default = Progress;