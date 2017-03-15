'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _stylesheet = require('./stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _prefixer = require('./prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should have plugins, transforms and a prefixer defined', function (t) {
  t.true(_is_js2.default.object(_stylesheet2.default.plugins));
  t.true(_is_js2.default.object(_stylesheet2.default.transforms));
  t.true(_stylesheet2.default.prefixer instanceof _prefixer2.default);
});