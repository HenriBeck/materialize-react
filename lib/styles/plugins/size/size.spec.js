'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return nothing when no args are passed', function (t) {
  t.deepEqual((0, _size2.default)(), {});
});

(0, _ava2.default)('should return an object with height and width being equal with only one argument', function (t) {
  var styles = (0, _size2.default)(10);

  t.deepEqual(styles.width, styles.height);
});

(0, _ava2.default)('should return an object with width and height when 2 args are passed', function (t) {
  t.deepEqual((0, _size2.default)(10, 20), {
    width: 10,
    height: 20
  });
});