'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return an object with some default values when no args are provided', function (t) {
  t.deepEqual((0, _layout2.default)({}), { display: 'flex' });
});

(0, _ava2.default)('should correctly handle the inline option', function (t) {
  t.deepEqual((0, _layout2.default)({ inline: true }), { display: 'inline-flex' });
});

(0, _ava2.default)('should handle directions correctly', function (t) {
  t.deepEqual((0, _layout2.default)({ direction: 'horizontal' }), {
    display: 'flex',
    flexDirection: 'row'
  });

  t.deepEqual((0, _layout2.default)({
    direction: 'horizontal',
    reverse: true
  }), {
    display: 'flex',
    flexDirection: 'row-reverse'
  });

  t.deepEqual((0, _layout2.default)({ direction: 'vertical' }), {
    display: 'flex',
    flexDirection: 'column'
  });

  t.deepEqual((0, _layout2.default)({
    direction: 'vertical',
    reverse: true
  }), {
    display: 'flex',
    flexDirection: 'column-reverse'
  });
});

(0, _ava2.default)('should handle flexWrap correctly', function (t) {
  t.deepEqual((0, _layout2.default)({ wrap: true }), {
    display: 'flex',
    flexWrap: 'wrap'
  });

  t.deepEqual((0, _layout2.default)({
    wrap: true,
    reverse: true
  }), {
    display: 'flex',
    flexWrap: 'wrap-reverse'
  });
});

(0, _ava2.default)('should handle the mainAlign correctly', function (t) {
  t.deepEqual((0, _layout2.default)({ mainAlign: 'center' }), {
    display: 'flex',
    justifyContent: 'center'
  });
});

(0, _ava2.default)('should handle the crossAlign correctly', function (t) {
  t.deepEqual((0, _layout2.default)({ crossAlign: 'center' }), {
    display: 'flex',
    alignItems: 'center'
  });
});