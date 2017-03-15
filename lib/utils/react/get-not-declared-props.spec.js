'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _getNotDeclaredProps = require('./get-not-declared-props');

var _getNotDeclaredProps2 = _interopRequireDefault(_getNotDeclaredProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should return not declared props when an instance is passed', function (t) {
  t.deepEqual((0, _getNotDeclaredProps2.default)({
    props: {
      prop: 'value',
      declaredProp: 'valid value',
      name: 'test'
    }
  }, {
    propTypes: {
      declaredProp: Number,
      name: String
    }
  }), { prop: 'value' });
});