'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _hexToRgba = require('./hex-to-rgba');

var _hexToRgba2 = _interopRequireDefault(_hexToRgba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return false when no hex string is provided', function (t) {
  t.throws(_hexToRgba2.default);
});

(0, _ava2.default)('should throw an error when a not valid hex string is provided', function (t) {
  t.throws(function () {
    return (0, _hexToRgba2.default)('notAValidHex');
  });
});

(0, _ava2.default)('should default alpha to 1', function (t) {
  t.deepEqual((0, _hexToRgba2.default)('#ffffff'), 'rgba(255, 255, 255, 1)');
});

(0, _ava2.default)('should accept the alpha as the second argument', function (t) {
  t.deepEqual((0, _hexToRgba2.default)('#ffffff', 0.5), 'rgba(255, 255, 255, 0.5)');
});