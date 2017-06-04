'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.defaultVars = undefined;

var _colors = require('../colors');

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

var defaultVars = exports.defaultVars = {
  primaryBase: _colors.blue500,
  primaryLight: _colors.blue100,
  primaryDark: _colors.blue700,

  accentBase: _colors.yellowA200,
  accentLight: _colors.yellowA100,
  accentDark: _colors.yellowA400,

  statusBarColor: _colors.grey300,
  appBar: _colors.grey100,
  backgroundColor: _colors.grey50,

  textColor: _colors.blackText,
  secondaryTextColor: _colors.blackSecondaryText,
  disabledColor: _colors.blackDisabled,
  iconColor: _colors.blackIcons,
  hintColor: _colors.blackHint,
  dividerColor: _colors.blackDivider,

  // Other
  errorColor: _colors.orangeA700,

  transitionTime: 140
};

var defaultTheme = exports.defaultTheme = {
  // label,
  button: _theme.defaultTheme,
  // divider,
  // progress,
  // spinner,
  // fab,
  // checkbox,
  icon: _theme8.defaultTheme,
  // switch: switchTheme,
  // radioButton,
  // iconButton,
  // tabs,
  // tab,
  chip: _theme14.defaultTheme
};