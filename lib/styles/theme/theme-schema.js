'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _theme = require('../../components/background/theme');

var _theme2 = require('../../components/button/theme');

var _theme3 = require('../../components/divider/theme');

var _theme4 = require('../../components/label/theme');

var _theme5 = require('../../components/spinner/theme');

var _theme6 = require('../../components/icon/theme');

var _theme7 = require('../../components/switch/theme');

var _theme8 = require('../../components/icon-button/theme');

var _theme9 = require('../../components/progress/theme');

var _theme10 = require('../../components/fab/theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  variables: _propTypes2.default.object,
  background: _theme.schema,
  label: _theme4.schema,
  divider: _theme3.schema,
  button: _theme2.schema,
  spinner: _theme5.schema,
  icon: _theme6.schema,
  iconButton: _theme8.schema,
  switch: _theme7.schema,
  progress: _theme9.schema,
  fab: _theme10.schema
});