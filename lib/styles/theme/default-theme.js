'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('../colors');

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

exports.default = {
  variables: {
    primaryBase: _colors.blue500,
    primaryLight: _colors.blue100,
    primaryDark: _colors.blue700,

    accentBase: _colors.yellowA200,
    accentLight: _colors.yellowA100,
    accentDark: _colors.yellowA400,

    statusBarColor: _colors.grey300,
    appBar: _colors.grey100,
    backgroundColor: _colors.grey50,
    cards: _colors.white500,

    textColor: _colors.blackText,
    secondaryTextColor: _colors.blackSecondaryText,
    disabledColor: _colors.blackDisabled,
    iconColor: _colors.blackIcons,
    hintColor: _colors.blackHint,
    dividerColor: _colors.blackDivider,

    // Other
    errorColor: _colors.orangeA700,

    transitionTime: 140
  },

  label: _theme5.defaultTheme,
  button: _theme.defaultTheme,
  divider: _theme3.defaultTheme,
  progress: _theme6.defaultTheme,
  spinner: _theme7.defaultTheme,
  fab: _theme4.defaultTheme,
  checkbox: _theme2.defaultTheme,
  icon: _theme8.defaultTheme,
  switch: _theme9.defaultTheme,
  radioButton: _theme10.defaultTheme,
  iconButton: _theme11.defaultTheme,
  tabs: _theme12.defaultTheme,
  tab: _theme13.defaultTheme,
  chip: _theme14.defaultTheme,
  expansionPanel: _theme15.defaultTheme
};