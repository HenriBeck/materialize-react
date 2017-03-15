'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _position = require('./position');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return an empty object when no args are passed', function (t) {
  t.deepEqual((0, _position2.default)(), {});
});

(0, _ava2.default)('should return only the position when only one arg is passed', function (t) {
  t.deepEqual((0, _position2.default)('absolute'), { position: 'absolute' });
});

(0, _ava2.default)('top, bottom, right and left should be the same when two args are passed', function (t) {
  t.deepEqual((0, _position2.default)('absolute', 20), {
    position: 'absolute',
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  });
});

(0, _ava2.default)('top / bottom and right / left should be equal when three args are passed', function (t) {
  t.deepEqual((0, _position2.default)('absolute', 20, 10), {
    position: 'absolute',
    top: 20,
    right: 10,
    bottom: 20,
    left: 10
  });
});

(0, _ava2.default)('should set the fourth argument as the bottom property when provided', function (t) {
  t.deepEqual((0, _position2.default)('absolute', 20, 10, 5), {
    position: 'absolute',
    top: 20,
    right: 10,
    bottom: 5,
    left: 10
  });
});

(0, _ava2.default)('should set the fifth argument as the left property when provided', function (t) {
  t.deepEqual((0, _position2.default)('absolute', 20, 10, 5, 1), {
    position: 'absolute',
    top: 20,
    right: 10,
    bottom: 5,
    left: 1
  });
});