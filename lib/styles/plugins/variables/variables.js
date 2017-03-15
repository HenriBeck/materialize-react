'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = variables;

var _warning = require('../../../../../../../../../src/utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function variables() {
  var vars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (value) {
    return value.replace(/var\((\w+)\)/g, function (found, name) {
      (0, _warning2.default)(!vars[name], name + ' isn\'t a valid variable!');

      return vars[name];
    }).trim();
  };
}