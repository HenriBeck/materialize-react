'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parallax = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component to render a parallax effect.
 *
 * @class
 */
var Parallax = exports.Parallax = function (_PureComponent) {
  _inherits(Parallax, _PureComponent);

  function Parallax() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Parallax);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Parallax.__proto__ || Object.getPrototypeOf(Parallax)).call.apply(_ref, [this].concat(args))), _this), _this.onScroll = function () {
      if (_this.isVisible) {
        var _this$root$getBoundin = _this.root.getBoundingClientRect(),
            height = _this$root$getBoundin.height,
            top = _this$root$getBoundin.top;

        var imageHeight = _this.image.getBoundingClientRect().height;
        var overflowImageHeight = imageHeight - height;
        var _window = window,
            innerHeight = _window.innerHeight;

        var scrollPos = Math.abs((innerHeight - height - top) / (innerHeight - height));
        var transform = Math.min(scrollPos * overflowImageHeight, overflowImageHeight);

        _this.image.style.transform = 'translate3D(0, ' + -transform + 'px, 0)';
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Parallax, [{
    key: 'componentDidMount',


    /**
     * Add the event listener for when the user scrolls.
     */
    value: function componentDidMount() {
      window.addEventListener('scroll', this.onScroll);
    }

    /**
     * Remove the event listener again.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll);
    }

    /**
     * Check if the root element is currently completely visible.
     *
     * @private
     * @returns {Boolean} - Returns whether the component is visible.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Parallax), {
          role: 'presentation',
          className: this.props.classes.root + ' ' + this.props.className,
          ref: function ref(element) {
            _this2.root = element;
          }
        }),
        _react2.default.createElement('img', {
          width: '100%',
          src: this.props.img,
          className: this.props.classes.image,
          alt: 'parallax',
          ref: function ref(element) {
            _this2.image = element;
          },
          style: this.props.imgStyle
        }),
        _react2.default.createElement(
          'div',
          { className: this.props.classes.content },
          this.props.children
        )
      );
    }
  }, {
    key: 'isVisible',
    get: function get() {
      var _root$getBoundingClie = this.root.getBoundingClientRect(),
          top = _root$getBoundingClie.top,
          bottom = _root$getBoundingClie.bottom;

      return top >= 0 && bottom <= window.innerHeight;
    }

    /**
     * Update the image position on a scroll event.
     * Only update it when the root element is completely visible.
     *
     * @private
     */

  }]);

  return Parallax;
}(_react.PureComponent);

Parallax.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  img: _propTypes2.default.string.isRequired,
  imgStyle: _propTypes2.default.object,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};
Parallax.defaultProps = {
  imgStyle: {},
  children: '',
  className: ''
};


var styles = {
  root: {
    composes: 'parallax',
    position: 'relative',
    overflow: 'hidden'
  },

  image: {
    composes: 'parallax--image',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 'auto',
    left: 0,
    transition: 'transform 8ms ' + _timings.easeInOutCubic,
    zIndex: 0,
    willChange: 'transform'
  },

  content: {
    composes: 'parallax--content',
    zIndex: 1
  }
};

exports.default = (0, _jss2.default)(styles)(Parallax);