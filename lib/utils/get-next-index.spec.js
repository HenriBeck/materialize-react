'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _getNextIndex = require('./get-next-index');

var _getNextIndex2 = _interopRequireDefault(_getNextIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var array = new Array(6).fill(1);

(0, _ava2.default)('should return the index if no correct direction is passed', function (t) {
  t.deepEqual((0, _getNextIndex2.default)(array, 2), 2);
});

(0, _ava2.default)('should return the previous index if the direction is left', function (t) {
  t.deepEqual((0, _getNextIndex2.default)(array, 2, 'left'), 1);
});

(0, _ava2.default)('should return the last index if the current is 0 and the direction is left', function (t) {
  t.deepEqual((0, _getNextIndex2.default)(array, 0, 'left'), array.length - 1);
});

(0, _ava2.default)('should return the next index if the direction is right', function (t) {
  t.deepEqual((0, _getNextIndex2.default)(array, 2, 'right'), 3);
});

(0, _ava2.default)('should return 0 if the current is the last index and the direction is right', function (t) {
  t.deepEqual((0, _getNextIndex2.default)(array, array.length - 1, 'right'), 0);
});