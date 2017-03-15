'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _prefixer = require('./prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

var _size = require('./plugins/size');

var _size2 = _interopRequireDefault(_size);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _elevation = require('./plugins/elevation');

var _elevation2 = _interopRequireDefault(_elevation);

var _typo = require('./plugins/typo');

var _typo2 = _interopRequireDefault(_typo);

var _layout = require('./plugins/layout');

var _layout2 = _interopRequireDefault(_layout);

var _variables = require('./plugins/variables');

var _variables2 = _interopRequireDefault(_variables);

var _hexToRgba = require('./functions/hex-to-rgba');

var _hexToRgba2 = _interopRequireDefault(_hexToRgba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A class to transform styles with support for plugins and transforms.
 */
var Stylesheet = function () {
  function Stylesheet() {
    _classCallCheck(this, Stylesheet);
  }

  _createClass(Stylesheet, null, [{
    key: 'compilePlugins',


    /**
     * A function to compile the object with some provided plugins.
     *
     * @param {Object} object - The object to compile.
     * @param {String[]} plugins - An array of plugins to use.
     * @returns {Object} - Returns the compiled object.
     */
    value: function compilePlugins(object, plugins) {
      return Object.keys(object).reduce(function (current, key) {
        var value = object[key];

        if (plugins.includes(key) && Stylesheet.plugins[key]) {
          var _Stylesheet$plugins;

          var args = _is_js2.default.array(value) ? value : [value];

          return Object.assign({}, current, (_Stylesheet$plugins = Stylesheet.plugins)[key].apply(_Stylesheet$plugins, _toConsumableArray(args)));
        } else if (_is_js2.default.json(value)) {
          value = Stylesheet.compilePlugins(value, plugins);
        } else if (_is_js2.default.function(value)) {
          value = value(current);
        }

        return Object.assign({}, current, _defineProperty({}, key, value));
      }, {});
    }

    /**
     * A function to transform the values of the object.
     *
     * @param {Object} object - The object to transform.
     * @param {Function[]} transforms - The transforms to call.
     * @returns {Object} - Returns the object with the compiled transforms.
     */

  }, {
    key: 'compileTransforms',
    value: function compileTransforms(object, transforms) {
      return Object.keys(object).reduce(function (current, key) {
        var value = object[key];

        if (_is_js2.default.json(value)) {
          return Object.assign({}, current, _defineProperty({}, key, Stylesheet.compileTransforms(value, transforms)));
        }

        var prefix = Stylesheet.prefixer.prefix(key);
        var newValue = _is_js2.default.string(value) ? transforms.reduce(function (val, func) {
          return func(val);
        }, value) : value;

        return Object.assign({}, current, _defineProperty({}, prefix, newValue));
      }, {});
    }

    /**
     * Compile an object.
     *
     * @param {Object} styles - The styles to compile.
     * @param {Object} options - The options for the transforms.
     * @param {String[]} plugins - An array of the plugins names which will be used.
     * Defaults to all of the plugins.
     * @returns {Object} - Returns the compiled object.
     */

  }, {
    key: 'compile',
    value: function compile(styles) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var plugins = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Object.keys(Stylesheet.plugins);

      var transforms = Object.keys(Stylesheet.transforms).map(function (name) {
        return Stylesheet.transforms[name](options[name] || {});
      });

      return Stylesheet.compileTransforms(Stylesheet.compilePlugins(styles, plugins), transforms);
    }
  }]);

  return Stylesheet;
}();

Stylesheet.plugins = {
  size: _size2.default,
  elevation: _elevation2.default,
  position: _position2.default,
  typo: _typo2.default,
  layout: _layout2.default
};
Stylesheet.transforms = { variables: _variables2.default };
Stylesheet.hexToRgba = _hexToRgba2.default;
Stylesheet.prefixer = new _prefixer2.default();
exports.default = Stylesheet;