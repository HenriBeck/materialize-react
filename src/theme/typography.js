// @flow strict-local

type Typography = {|
  headline: { [key: string]: string | number },
  title: { [key: string]: string | number },
  body: { [key: string]: string | number },
  button: { [key: string]: string | number },
|};

const noWrap = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const commonBase = {
  fontFamily: '\'Roboto\', \'Noto\', sans-serif',
  WebkitFontSmoothing: 'antialiased',
};

const defaultTypography: Typography = {
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

  body: {
    ...commonBase,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20 / 14,
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
};

export type { Typography };

export { defaultTypography };
