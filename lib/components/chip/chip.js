'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chip = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _getNotDeclaredProps = require('../../utils/react/get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

var _layout = require('../../styles/plugins/layout');

var _layout2 = _interopRequireDefault(_layout);

var _typo = require('../../styles/plugins/typo');

var _typo2 = _interopRequireDefault(_typo);

var _elevation = require('../../styles/plugins/elevation');

var _elevation2 = _interopRequireDefault(_elevation);

var _jss = require('../../styles/jss');

var _jss2 = _interopRequireDefault(_jss);

var _connectWithTheme = require('../../styles/theme/connect-with-theme');

var _connectWithTheme2 = _interopRequireDefault(_connectWithTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A material design chip component.
 *
 * @class
 */
var Chip = exports.Chip = function (_PureComponent) {
  _inherits(Chip, _PureComponent);

  function Chip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Chip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chip.__proto__ || Object.getPrototypeOf(Chip)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isFocused: false }, _this.keyDown = false, _this.handleDelete = function () {
      _this.props.onDelete(_this.props.id);
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      _this.setState({ isFocused: true });
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.setState({ isFocused: false });
    }, _this.handleKeyDown = function (ev) {
      _this.props.onKeyDown(ev);

      if (ev.keyCode === 46 && !_this.keyDown) {
        _this.keyDown = true;

        _this.handleDelete();
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.keyDown = false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Call the onDelete prop with the id of the chip.
   */


  /**
   * When the chip receives focus, change the isFocused state to true.
   *
   * @private
   */


  /**
   * When the chip loses focus, change the isFocused state to false.
   *
   * @private
   */


  /**
   * Handle the keyDown event.
   * If the delete key (keyCode = 46) is pressed and it's the first event that we receive,
   * we need to call the handleDelete function.
   *
   * @private
   */


  /**
   * Reset the keyDown property.
   *
   * @private
   */


  _createClass(Chip, [{
    key: 'renderImage',


    /**
     * Render the image of the chip.
     * Either an img element or a circle with some text in it.
     *
     * @returns {JSX} - Returns the JSX.
     */
    value: function renderImage() {
      var props = { className: this.props.classes.img };

      if (_is_js2.default.json(this.props.img)) {
        return _react2.default.createElement(
          'span',
          props,
          this.props.img.text
        );
      }

      return _react2.default.createElement('img', _extends({
        alt: 'chip',
        src: this.props.img
      }, props));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          deletable = _props.deletable;

      var eventHandlers = {
        onKeyDown: deletable ? this.handleKeyDown : this.props.onKeyDown,
        onKeyUp: deletable ? this.handleKeyUp : this.props.onKeyUp,
        onFocus: deletable ? this.handleFocus : this.props.onFocus,
        onBlur: deletable ? this.handleBlur : this.props.onBlur
      };

      return _react2.default.createElement(
        'button',
        _extends({}, (0, _getNotDeclaredProps2.default)(this, Chip), {
          className: classes.chip + ' ' + this.props.className,
          tabIndex: this.props.deletable ? 0 : -1,
          'data-size': this.props.mini ? 'mini' : 'normal'
        }, eventHandlers),
        _react2.default.createElement('span', { className: classes.shadow + ' ' + (this.state.isFocused && classes.shadowActive) }),
        this.props.img && this.renderImage(),
        _react2.default.createElement(
          'span',
          { className: classes.label },
          this.props.children
        ),
        this.props.deletable && _react2.default.createElement(_icon2.default, {
          icon: 'close-circle',
          className: classes.delete,
          onTouchStart: this.handleDelete,
          onMouseDown: this.handleDelete
        })
      );
    }
  }]);

  return Chip;
}(_react.PureComponent);

Chip.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  id: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node.isRequired,
  img: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  mini: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  deletable: _propTypes2.default.bool,
  onDelete: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func
};
Chip.defaultProps = {
  img: '',
  className: '',
  deletable: false,
  style: {},
  mini: false,
  onDelete: function onDelete() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {}
};


var styles = {
  chip: _extends({
    composes: 'chip',
    position: 'relative',
    backgroundColor: function backgroundColor(props) {
      return props.theme.bgColor;
    },
    borderRadius: function borderRadius(props) {
      return props.theme.height / 2;
    },
    height: function height(props) {
      return props.theme.height;
    },
    outline: 0,
    border: 0,
    padding: function padding(props) {
      return '0 ' + (props.deletable ? 0 : 12) + 'px 0 ' + (props.img ? 0 : 12) + 'px';
    }
  }, (0, _layout2.default)({
    direction: 'horizontal',
    inline: true,
    crossAlign: 'center'
  })),

  img: {
    composes: 'chip--img',
    height: function height(props) {
      return props.theme.height;
    },
    width: function width(props) {
      return props.theme.height;
    },
    borderRadius: '50%',
    textTransform: 'uppercase',
    backgroundColor: function backgroundColor(props) {
      return _is_js2.default.json(props.img) ? props.img.color : 'transparent';
    },
    lineHeight: function lineHeight(props) {
      return props.theme.height;
    },
    textAlign: 'center',
    margin: '0 8px 0 0',
    color: function color(props) {
      return _is_js2.default.json(props.img) ? props.img.textColor : 'inherit';
    }
  },

  delete: {
    composes: 'chip--delete',
    height: function height(props) {
      return props.theme.deleteIconSize;
    },
    width: function width(props) {
      return props.theme.deleteIconSize;
    },
    lineHeight: function lineHeight(props) {
      return props.theme.deleteIconSize;
    },
    fontSize: function fontSize(props) {
      return props.theme.deleteIconFontSize;
    },
    margin: '0 4px',
    cursor: 'pointer',
    zIndex: 1
  },

  label: _extends({
    composes: 'chip--label'
  }, (0, _typo2.default)('body1'), {
    color: function color(props) {
      return props.theme.color;
    },
    userSelect: 'none'
  }),

  shadow: {
    composes: 'chip--shadow',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    boxShadow: function boxShadow(props) {
      return (0, _elevation2.default)(props.theme.focusedElevation);
    },
    opacity: 0,
    transition: function transition(props) {
      return 'opacity ' + props.theme.transitionTime + 'ms linear';
    },
    borderRadius: 'inherit'
  },

  shadowActive: { opacity: 1 }
};

exports.default = (0, _connectWithTheme2.default)((0, _jss2.default)(styles)(Chip), 'chip');