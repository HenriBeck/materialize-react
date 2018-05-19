// @flow strict-local

type CSSStyles = { [key: string]: string | number };
type Typography = {|
  headline1: CSSStyles,
  headline2: CSSStyles,
  headline3: CSSStyles,
  headline4: CSSStyles,
  headline5: CSSStyles,
  headline6: CSSStyles,
  subtitle1: CSSStyles,
  subtitle2: CSSStyles,
  body1: CSSStyles,
  body2: CSSStyles,
  button: CSSStyles,
  caption: CSSStyles,
  overline: CSSStyles,
|};

const commonBase = {
  fontFamily: '\'Roboto\', sans-serif',
  WebkitFontSmoothing: 'antialiased',
};

const fontWeights = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
};

const defaultTypography: Typography = {
  headline1: {
    ...commonBase,
    fontSize: '6rem',
    lineHeight: 1,
    fontWeight: fontWeights.light,
    letterSpacing: '-0.01562em',
  },
  headline2: {
    ...commonBase,
    fontSize: '3.75rem',
    lineHeight: 1,
    fontWeight: fontWeights.light,
    letterSpacing: '-0.00833em',
  },
  headline3: {
    ...commonBase,
    fontSize: '3rem',
    lineHeight: '3.125rem',
    fontWeight: fontWeights.regular,
    letterSpacing: 'normal',
  },
  headline4: {
    ...commonBase,
    fontSize: '2.125rem',
    lineHeight: '2.5rem',
    fontWeight: fontWeights.regular,
    letterSpacing: '0.00735em',
  },
  headline5: {
    ...commonBase,
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: fontWeights.regular,
    letterSpacing: 'normal',
  },
  headline6: {
    ...commonBase,
    fontSize: '1.25rem',
    lineHeight: '2rem',
    fontWeight: fontWeights.medium,
    letterSpacing: '0.0125em',
  },
  subtitle1: {
    ...commonBase,
    fontSize: '1rem',
    lineHeight: '1.75rem',
    fontWeight: fontWeights.regular,
    letterSpacing: '0.00937em',
  },
  subtitle2: {
    ...commonBase,
    fontSize: '.875rem',
    lineHeight: '1.375rem',
    fontWeight: fontWeights.medium,
    letterSpacing: '.00714em',
  },
  body1: {
    ...commonBase,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: fontWeights.regular,
    letterSpacing: '.03125em',
  },
  body2: {
    ...commonBase,
    fontSize: '.875rem',
    lineHeight: '1.25rem',
    fontWeight: fontWeights.regular,
    letterSpacing: '.01786em',
  },
  button: {
    ...commonBase,
    fontSize: '.875rem',
    lineHeight: '2.25rem',
    fontWeight: fontWeights.medium,
    letterSpacing: '.08929em',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  caption: {
    ...commonBase,
    fontSize: '.75rem',
    lineHeight: '1.25rem',
    fontWeight: fontWeights.regular,
    letterSpacing: '.03333em',
  },
  overline: {
    ...commonBase,
    fontSize: '.75rem',
    lineHeight: '2rem',
    fontWeight: fontWeights.medium,
    letterSpacing: '.16667em',
    textDecoration: 'none',
    textTransform: 'uppercase',

  },
};

export type { Typography };

export { defaultTypography };
