'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _elementRect = require('./element-rect');

var _elementRect2 = _interopRequireDefault(_elementRect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var element = document.createElement('div');
var rect = new _elementRect2.default(element);

(0, _ava2.default)('should create the instance', function (t) {
  t.true(rect instanceof _elementRect2.default);
  t.deepEqual(rect.height, 0);
  t.deepEqual(rect.width, 0);
  t.deepEqual(rect.size, 0);
});

(0, _ava2.default)('should have the center function defined', function (t) {
  t.deepEqual(rect.center, {
    x: 0,
    y: 0
  });
});

(0, _ava2.default)('should have the distanceToFarthestCorner function defined', function (t) {
  t.deepEqual(rect.distanceToFarthestCorner({
    x: 4,
    y: 3
  }), 5);
});

(0, _ava2.default)('should have the distanceToFarthestCorner function defined an have default props', function (t) {
  t.deepEqual(rect.distanceToFarthestCorner({}), 0);
});