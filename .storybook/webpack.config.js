const babelConfig = require('../.babelrc');

module.exports = function config(baseConfig) {
  return Object.assign({}, baseConfig, {
    module: {
      rules: [{
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: babelConfig.presets,
            plugins: babelConfig.plugins,
          },
        },
      }, {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.+)?$/, // eslint-disable-line unicorn/no-unsafe-regex
        loader: 'file-loader',
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }],
    },
  });
};
