'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _typo = require('./typo');

var _typo2 = _interopRequireDefault(_typo);

var _typography = require('./typography');

var _typography2 = _interopRequireDefault(_typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return nothing when it\'s not a valid typography', function (t) {
  t.throws(function () {
    return (0, _typo2.default)();
  });

  t.throws(function () {
    return (0, _typo2.default)('string');
  });
});

(0, _ava2.default)('should return the typo object when a valid typography is provided', function (t) {
  t.plan(Object.keys(_typography2.default).length);

  Object.keys(_typography2.default).forEach(function (key) {
    t.deepEqual((0, _typo2.default)(key), _typography2.default[key]);
  });
});