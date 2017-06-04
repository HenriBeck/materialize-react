'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var commonBase = {
  fontFamily: '\'Roboto\', \'Noto\', sans-serif',
  WebkitFontSmoothing: 'antialiased'
};

var commonCode = {
  fontFamily: '\'Roboto Mono\', \'Consolas\', \'Menlo\', monospace',
  WebkitFontSmoothing: 'antialiased'
};

var noWrap = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

exports.default = {
  noWrap: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },

  display4: _extends({}, commonBase, noWrap, {
    fontSize: 112,
    fontWeight: 300,
    letterSpacing: '-.044em',
    lineHeight: 120
  }),

  display3: _extends({}, commonBase, noWrap, {
    fontSize: 56,
    fontWeight: 400,
    letterSpacing: '-.026em',
    lineHeight: 60
  }),

  display2: _extends({}, commonBase, {
    fontSize: 45,
    fontWeight: 400,
    letterSpacing: '-.018em',
    lineHeight: 48
  }),

  display1: _extends({}, commonBase, {
    fontSize: 34,
    fontWeight: 400,
    letterSpacing: '-.01em',
    lineHeight: 40
  }),

  headline: _extends({}, commonBase, {
    fontSize: 24,
    fontWeight: 400,
    letterSpacing: '-.012em',
    lineHeight: 32
  }),

  title: _extends({}, commonBase, noWrap, {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 28
  }),

  subhead: _extends({}, commonBase, {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24
  }),

  body1: _extends({}, commonBase, {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20
  }),

  body2: _extends({}, commonBase, {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 24
  }),

  caption: _extends({}, commonBase, noWrap, {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: '0.011em',
    lineHeight: 20
  }),

  menu: _extends({}, commonBase, noWrap, {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 24
  }),

  button: _extends({}, commonBase, noWrap, {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.018em',
    lineHeight: 24,
    textTransform: 'uppercase',
    textAlign: 'center'
  }),

  code1: _extends({}, commonCode, {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20
  }),

  code2: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 20
  },

  label: _extends({}, commonBase, noWrap, {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16
  })
};