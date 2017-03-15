'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _elevation = require('./elevation');

var _elevation2 = _interopRequireDefault(_elevation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return boxShadow none when elevation is 0', function (t) {
  t.deepEqual((0, _elevation2.default)(0), { boxShadow: 'none' });
});

(0, _ava2.default)('should return an object with boxShadow property when elevation is between 1 and 7', function (t) {
  var elevations = [1, 2, 3, 4, 5, 6, 7];

  t.plan(7);

  elevations.forEach(function (number) {
    t.true(Boolean((0, _elevation2.default)(number).boxShadow));
  });
});

(0, _ava2.default)('should return boxShadow none when elevation is not a valid number/elevation', function (t) {
  t.deepEqual((0, _elevation2.default)('string'), { boxShadow: 'none' });

  t.deepEqual((0, _elevation2.default)(20), { boxShadow: 'none' });
});