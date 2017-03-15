'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _prefixer = require('./prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should be able to transform css property into valid js property', function (t) {
  t.deepEqual(_prefixer2.default.cssToJS('user-select'), 'userSelect');
  t.deepEqual(_prefixer2.default.cssToJS('userSelect'), 'userSelect');
});

(0, _ava2.default)('should have prefixes and a element defined on the instance', function (t) {
  var prefixer = new _prefixer2.default();

  t.true(_is_js2.default.array(prefixer.prefixes));
  t.true(prefixer.element instanceof HTMLElement);
});

(0, _ava2.default)('should return the css property when the normal is supported', function (t) {
  var prefixer = new _prefixer2.default();

  prefixer.element = { style: { userSelect: 'none' } };

  t.deepEqual(prefixer.prefix('userSelect'), 'userSelect');
  t.deepEqual(prefixer.prefix('user-select'), 'userSelect');
});

(0, _ava2.default)('should return the prefixed property when the normal property isn\'t supported', function (t) {
  var prefixer = new _prefixer2.default();

  prefixer.element = { style: { webkitUserSelect: 'none' } };

  t.deepEqual(prefixer.prefix('userSelect'), 'WebkitUserSelect');
  t.deepEqual(prefixer.prefix('user-select'), 'WebkitUserSelect');
});

(0, _ava2.default)('should return the property when the normal and no prefixed version is supported', function (t) {
  var prefixer = new _prefixer2.default();

  prefixer.element = { style: {} };

  t.deepEqual(prefixer.prefix('userSelect'), 'userSelect');
  t.deepEqual(prefixer.prefix('user-select'), 'userSelect');
});