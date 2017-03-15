'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _theme = require('../../../../../../../../src/components/button/theme');

var _theme2 = require('../../../../../../../../src/components/checkbox/theme');

var _theme3 = require('../../../../../../../../src/components/divider/theme');

var _theme4 = require('../../../../../../../../src/components/fab/theme');

var _theme5 = require('../../../../../../../../src/components/label/theme');

var _theme6 = require('../../../../../../../../src/components/progress/theme');

var _theme7 = require('../../../../../../../../src/components/spinner/theme');

var _theme8 = require('../../../../../../../../src/components/icon/theme');

var _theme9 = require('../../../../../../../../src/components/switch/theme');

var _theme10 = require('../../../../../../../../src/components/radio-button/theme');

var _theme11 = require('../../../../../../../../src/components/icon-button/theme');

var _theme12 = require('../../../../../../../../src/components/tabs/theme');

var _theme13 = require('../../../../../../../../src/components/tab/theme');

var _theme14 = require('../../../../../../../../src/components/chip/theme');

var _theme15 = require('../../../../../../../../src/components/expansion-panel/theme');

exports.default = _react.PropTypes.shape({
  variables: _react.PropTypes.shape({
    primaryBase: _react.PropTypes.string,
    primaryLight: _react.PropTypes.string,
    primaryDark: _react.PropTypes.string,

    accentBase: _react.PropTypes.string,
    accentLight: _react.PropTypes.string,
    accentDark: _react.PropTypes.string,

    backgroundColor: _react.PropTypes.string,

    textColor: _react.PropTypes.string,
    secondaryTextColor: _react.PropTypes.string,
    dividerColor: _react.PropTypes.string,
    disabledColor: _react.PropTypes.string,
    iconColor: _react.PropTypes.string,
    hintColor: _react.PropTypes.string,

    // Other
    errorColor: _react.PropTypes.string,

    defaultTransitionTime: _react.PropTypes.number
  }),

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
  expansionPanel: _theme15.schema
});