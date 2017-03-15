'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return false when the NODE_ENV is production', function (t) {
  process.env.NODE_ENV = 'production';

  t.deepEqual((0, _warning2.default)(false, 'Message'), false);
});

(0, _ava2.default)('should return the condition when the NODE_ENV is not production', function (t) {
  process.env.NODE_ENV = 'development';

  t.deepEqual((0, _warning2.default)(false, 'Message'), false);
});

(0, _ava2.default)('should throw an error if the condition is true with the message', function (t) {
  process.env.NODE_ENV = 'development';

  t.throws(function () {
    return (0, _warning2.default)(true, 'Message');
  });
});