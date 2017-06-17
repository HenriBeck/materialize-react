'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.defaultVars = undefined;

var _colors = require('../colors');

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

var _theme11 = require('../../components/checkbox/theme');

var defaultVars = exports.defaultVars = {
  primaryBase: _colors.blue500,
  primaryLight: _colors.blue100,
  primaryDark: _colors.blue700,

  accentBase: _colors.yellowA200,
  accentLight: _colors.yellowA100,
  accentDark: _colors.yellowA400,

  statusBarColor: _colors.black500,
  appBar: _colors.grey900,
  backgroundColor: '#303030',

  textColor: _colors.whiteText,
  secondaryTextColor: _colors.whiteSecondaryText,
  disabledColor: _colors.whiteDisabled,
  iconColor: _colors.whiteIcons,
  hintColor: _colors.whiteHint,
  dividerColor: _colors.whiteDivider,

  // Other
  errorColor: _colors.orangeA700,

  transitionTime: 140
};

var defaultTheme = exports.defaultTheme = {
  background: _theme.defaultTheme,
  label: _theme4.defaultTheme,
  button: _theme2.defaultTheme,
  divider: _theme3.defaultTheme,
  spinner: _theme5.defaultTheme,
  icon: _theme6.defaultTheme,
  switch: _theme7.defaultTheme,
  iconButton: _theme8.defaultTheme,
  progress: _theme9.defaultTheme,
  fab: _theme10.defaultTheme,
  checkbox: _theme11.defaultTheme
};