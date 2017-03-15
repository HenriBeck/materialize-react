'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A class to create a prefixer to prefix css properties.
 */
var Prefixer = function () {
  /**
   * Initialize the class so we can access the prefixes later on.
   *
   * @param {String[]} prefixes - A string of prefixes to check for.
   */
  function Prefixer(prefixes) {
    _classCallCheck(this, Prefixer);

    this.prefixes = prefixes || ['moz', 'o', 'ms', 'webkit'];

    this.element = document.createElement('div');

    this.chance = new _chance2.default();
  }

  /**
   * Convert a css property into an valid js property.
   *
   * @param {String} name - The property to transform.
   * @returns {String} - Returns the converted property.
   */


  _createClass(Prefixer, [{
    key: 'prefix',


    /**
     * Check if a css property needs to be prefixed.
     *
     * @param {String} prop - The property to check for.
     * @returns {String} - Returns the prefixed prop if needed elsewise it returns the prop which
     * was passed in.
     */
    value: function prefix(prop) {
      var _this = this;

      var convertedProp = prop.includes('-') ? Prefixer.cssToJS(prop) : prop;

      if (convertedProp in this.element.style) {
        return convertedProp;
      }

      var capitalizedProp = this.chance.capitalize(convertedProp);
      var prefixes = [].concat(_toConsumableArray(this.prefixes));
      var prefixedProp = false;

      prefixes.map(function (prefix) {
        return '' + prefix + capitalizedProp;
      }).forEach(function (prefix) {
        if (prefix in _this.element.style) {
          prefixedProp = prefix;
        }
      });

      if (prefixedProp) {
        return this.chance.capitalize(prefixedProp);
      }

      return convertedProp;
    }
  }], [{
    key: 'cssToJS',
    value: function cssToJS(name) {
      return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
        return m1 + m2.toUpperCase();
      }).replace(/^-/, '');
    }
  }]);

  return Prefixer;
}();

exports.default = Prefixer;