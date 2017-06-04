'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _theme = require('../../components/button/theme');

var _theme2 = require('../../components/checkbox/theme');

var _theme3 = require('../../components/divider/theme');

var _theme4 = require('../../components/fab/theme');

var _theme5 = require('../../components/label/theme');

var _theme6 = require('../../components/progress/theme');

var _theme7 = require('../../components/spinner/theme');

var _theme8 = require('../../components/icon/theme');

var _theme9 = require('../../components/switch/theme');

var _theme10 = require('../../components/radio-button/theme');

var _theme11 = require('../../components/icon-button/theme');

var _theme12 = require('../../components/tabs/theme');

var _theme13 = require('../../components/tab/theme');

var _theme14 = require('../../components/chip/theme');

var _theme15 = require('../../components/toolbar/theme');

var _theme16 = require('../../components/drawer/theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  variables: _propTypes2.default.object,
  label: _theme5.schema,
  divider: _theme3.schema,
  button: _theme.schema,
  checkbox: _theme2.schema,
  fab: _theme4.schema,
  progress: _theme6.schema,
  spinner: _theme7.schema,
  icon: _theme8.schema,
  switch: _theme9.schema,
  radioButton: _theme10.schema,
  iconButton: _theme11.schema,
  tabs: _theme12.schema,
  tab: _theme13.schema,
  chip: _theme14.schema,
  toolbar: _theme15.schema,
  drawer: _theme16.schema
});