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

export const display4 = {
  ...commonBase,
  ...noWrap,
  fontSize: 112,
  fontWeight: 300,
  letterSpacing: '-.044em',
  lineHeight: 120 / 112,
};

export const display3 = {
  ...commonBase,
  ...noWrap,
  fontSize: 56,
  fontWeight: 400,
  letterSpacing: '-.026em',
  lineHeight: 60 / 56,
};

export const display2 = {
  ...commonBase,
  fontSize: 45,
  fontWeight: 400,
  letterSpacing: '-.018em',
  lineHeight: 48 / 45,
};

export const display1 = {
  ...commonBase,
  fontSize: 34,
  fontWeight: 400,
  letterSpacing: '-.01em',
  lineHeight: 40 / 34,
};

export const headline = {
  ...commonBase,
  fontSize: 24,
  fontWeight: 400,
  letterSpacing: '-.012em',
  lineHeight: 32 / 24,
};

export const title = {
  ...commonBase,
  ...noWrap,
  fontSize: 20,
  fontWeight: 400,
  lineHeight: 28 / 20,

};

export const subhead = {
  ...commonBase,
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 24 / 16,
};

export const body1 = {
  ...commonBase,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 20 / 14,
};

export const body2 = {
  ...commonBase,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 24 / 14,
};

export const caption = {
  ...commonBase,
  ...noWrap,
  fontSize: 12,
  fontWeight: 400,
  letterSpacing: '0.011em',
  lineHeight: 20 / 12,

};

export const menu = {
  ...commonBase,
  ...noWrap,
  fontSize: 13,
  fontWeight: 500,
  lineHeight: 24 / 13,
};

export const button = {
  ...commonBase,
  ...noWrap,
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: '0.018em',
  lineHeight: 24 / 14,
};

export const code1 = {
  ...commonCode,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 20 / 14,
};

export const code2 = {
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 20 / 14,
};

export const label = {
  ...commonBase,
  ...noWrap,
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 16 / 12,
};
