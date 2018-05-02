module.exports = {
  extends: [
    'henribeck',
    'henribeck/client',
    'henribeck/react',
    'henribeck/flow',
  ],

  // Because we use flow, react/require-default-props doesn't play well with it
  rules: { 'react/require-default-props': 'off' },

  overrides: [{
    files: [ "*.spec.js"],

    env: { node: true },
  }]
};
