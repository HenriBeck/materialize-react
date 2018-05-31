module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      targets: {
        chrome: 63,
        firefox: 58,
        ios: 11
      },
      useBuiltIns: false,
      debug: process.env.NODE_ENV === 'build',
    }],
    '@babel/preset-flow',
  ],

  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
  ],

  comments: false,
};
