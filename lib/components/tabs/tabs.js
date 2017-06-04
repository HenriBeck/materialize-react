'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stylesheet = require('/src/styles/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _timings = require('/src/styles/timings');

var _getNextIndex = require('/src/utils/get-next-index');

var _getNextIndex2 = _interopRequireDefault(_getNextIndex);

var _tab = require('../tab');

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_PureComponent) {
  _inherits(Tabs, _PureComponent);

  function Tabs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = { selectedTab: _this.props.initialTabId }, _this.tabs = {}, _this.oldValue = '', _this.focusedTab = null, _this.keyDown = false, _this.handleTabChanged = function (tabId) {
      _this.setState({ selectedTab: tabId });
    }, _this.handleFocus = function (ev) {
      _this.props.onFocus(ev);

      _this.focusedTab = _this.state.selectedTab;

      _this.tabs[_this.focusedTab].focus();
    }, _this.handleBlur = function (ev) {
      _this.props.onBlur(ev);

      _this.tabs[_this.focusedTab].blur();
    }, _this.handleKeyDown = function (ev) {
      _this.props.onKeyDown(ev);

      if (!_this.keyDown) {
        if (ev.keyCode === 13 || ev.keyCode === 32) {
          if (_this.state.selectedTab !== _this.focusedTab) {
            _this.setState({ selectedTab: _this.focusedTab });
          }
        } else if (ev.keyCode === 37 || ev.keyCode === 39) {
          var tabs = Object.keys(_this.tabs);
          var index = tabs.findIndex(function (tab) {
            return tab === _this.focusedTab;
          });
          var direction = ev.keyCode === 37 ? 'left' : 'right';
          var nextIndex = (0, _getNextIndex2.default)(tabs, index, direction);

          _this.tabs[_this.focusedTab].blur();
          _this.focusedTab = tabs[nextIndex];
          _this.tabs[_this.focusedTab].focus();
        }

        _this.keyDown = true;
      }
    }, _this.handleKeyUp = function (ev) {
      _this.props.onKeyUp(ev);

      _this.keyDown = false;
    }, _this.renderTabs = function () {
      return _react.Children.map(_this.props.children, function (elem) {
        var props = {
          active: _this.state.selectedTab === elem.props.id,
          ref: function ref(element) {
            _this.tabs[elem.props.id] = element;
          },
          onPress: _this.handleTabChanged
        };

        return _react2.default.cloneElement(elem, props);
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.noBar) {
        var _tabs$props$initialTa = this.tabs[this.props.initialTabId].position,
            width = _tabs$props$initialTa.width,
            left = _tabs$props$initialTa.left;

        var relativeLeft = left - this.rootRect.left;

        this.bar.style.transform = 'scaleX(' + width + ') translateX(' + relativeLeft / width * 100 + '%)';

        this.oldValue = 'scaleX(' + width + ') translateX(' + relativeLeft / width * 100 + '%)';
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, _ref2) {
      var selectedTab = _ref2.selectedTab;

      if (!this.props.noBar && this.state.selectedTab !== selectedTab) {
        var _tabs$state$selectedT = this.tabs[this.state.selectedTab].position,
            width = _tabs$state$selectedT.width,
            left = _tabs$state$selectedT.left;


        this.animateBar(width, left);
      }

      this.props.onTabChange(this.state.selectedTab);

      this.tabs[selectedTab].blur();

      this.focusedTab = this.state.selectedTab;

      this.tabs[this.focusedTab].focus();
    }
  }, {
    key: 'animateBar',
    value: function animateBar(width, left) {
      var relativeLeft = left - this.rootRect.left;
      var translateY = relativeLeft / width * 100;
      var value = 'scaleX(' + width + ') translateX(' + translateY + '%)';

      this.bar.animate({
        transform: [this.oldValue, value]
      }, {
        duration: this.context.theme.variables.transitionTime * 1.5,
        fill: 'forwards',
        easing: _timings.easeInOutQuad
      });

      this.oldValue = value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles;

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        _react2.default.createElement(
          'div',
          {
            role: 'tablist',
            tabIndex: '0',
            className: 'tabs',
            style: styles.root,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            ref: function ref(element) {
              _this2.root = element;
            }
          },
          this.renderTabs(),
          !this.props.noBar && _react2.default.createElement('span', {
            className: 'tabs--bar',
            style: styles.bar,
            ref: function ref(element) {
              _this2.bar = element;
            }
          })
        )
      );
    }
  }, {
    key: 'rootRect',
    get: function get() {
      return this.root.getBoundingClientRect();
    }
  }, {
    key: 'styles',
    get: function get() {
      return _stylesheet2.default.compile({
        root: _extends({
          position: 'relative',
          layout: { direction: 'horizontal' },
          overflow: 'hidden',
          outline: 0
        }, this.props.style),

        bar: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          size: [1, 2],
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          backgroundColor: this.context.theme.tabs.barColor
        }
      });
    }
  }]);

  return Tabs;
}(_react.PureComponent);

Tabs.propTypes = {
  children: function children(_ref3) {
    var children = _ref3.children;

    var validationError = null;

    _react.Children.forEach(children, function (elem) {
      if (elem.type !== _tab2.default) {
        validationError = new Error('All children of the Tabs Component need to be Tab Components!');
      }
    });

    if (_react.Children.count(children) <= 1) {
      validationError = new Error('You need to pass atleast two Tab Components to the Tabs Component!');
    }

    return validationError;
  },

  initialTabId: _react.PropTypes.string.isRequired,
  noBar: _react.PropTypes.bool,
  onTabChange: _react.PropTypes.func,
  style: _react.PropTypes.object,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func
};
Tabs.defaultProps = {
  children: '',
  noBar: false,
  onTabChange: function onTabChange() {},
  style: {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {}
};
Tabs.contextTypes = { theme: _react.PropTypes.object };
exports.default = Tabs;