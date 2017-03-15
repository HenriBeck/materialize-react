'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _variables = require('./variables');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return a function when called for the first time', function (t) {
  var handler = (0, _variables2.default)();

  t.true(_is_js2.default.function(handler));
});

(0, _ava2.default)('should transform variables that were passed to the initial function', function (t) {
  var handler = (0, _variables2.default)({ variable: 'red' });

  t.deepEqual(handler('var(variable)'), 'red');
});