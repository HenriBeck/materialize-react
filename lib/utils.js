'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotDeclaredProps = exports.event = exports.warning = undefined;

var _warning2 = require('./utils/warning.js');

var _warning3 = _interopRequireDefault(_warning2);

var _event2 = require('./utils/event.js');

var _event3 = _interopRequireDefault(_event2);

var _getNotDeclaredProps2 = require('./utils/react/get-not-declared-props');

var _getNotDeclaredProps3 = _interopRequireDefault(_getNotDeclaredProps2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.warning = _warning3.default;
exports.event = _event3.default;
exports.getNotDeclaredProps = _getNotDeclaredProps3.default;