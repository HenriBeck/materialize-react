const commonBase = {
  fontFamily: '\'Roboto\', \'Noto\', sans-serif',
  WebkitFontSmoothing: 'antialiased',
};

const commonCode = {
  fontFamily: '\'Roboto Mono\', \'Consolas\', \'Menlo\', monospace',
  WebkitFontSmoothing: 'antialiased',
};

const noWrap = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

export default {
  noWrap: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  display4: {
    ...commonBase,
    ...noWrap,
    fontSize: 112,
    fontWeight: 300,
    letterSpacing: '-.044em',
    lineHeight: 120 / 112,
  },

  display3: {
    ...commonBase,
    ...noWrap,
    fontSize: 56,
    fontWeight: 400,
    letterSpacing: '-.026em',
    lineHeight: 60 / 56,
  },

  display2: {
    ...commonBase,
    fontSize: 45,
    fontWeight: 400,
    letterSpacing: '-.018em',
    lineHeight: 48 / 45,
  },

  display1: {
    ...commonBase,
    fontSize: 34,
    fontWeight: 400,
    letterSpacing: '-.01em',
    lineHeight: 40 / 34,
  },

  headline: {
    ...commonBase,
    fontSize: 24,
    fontWeight: 400,
    letterSpacing: '-.012em',
    lineHeight: 32 / 24,
  },

  title: {
    ...commonBase,
    ...noWrap,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 28 / 20,
  },

  subhead: {
    ...commonBase,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24 / 16,
  },

  body1: {
    ...commonBase,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20 / 14,
  },

  body2: {
    ...commonBase,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 24 / 14,
  },

  caption: {
    ...commonBase,
    ...noWrap,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: '0.011em',
    lineHeight: 20 / 12,
  },

  menu: {
    ...commonBase,
    ...noWrap,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 24 / 13,
  },

  button: {
    ...commonBase,
    ...noWrap,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.018em',
    lineHeight: 24 / 14,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  code1: {
    ...commonCode,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20 / 14,
  },

  code2: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 20 / 14,
  },

  label: {
    ...commonBase,
    ...noWrap,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1,
  },
};
