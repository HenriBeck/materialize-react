// eslint-disable-line import/unambiguous, flowtype/require-valid-file-annotation

const path = require("path");
const babelConfig = require('../.babelrc');

module.exports = (storybookBaseConfig) => {
  return Object.assign({}, storybookBaseConfig, {
    module: {
      rules: [{
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: babelConfig.presets,
            plugins: babelConfig.plugins,
          }
        },
        include: [ path.resolve(__dirname, '..') ],
        exclude: [ path.resolve(__dirname, '../node_modules') ],
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
    }
  });
};
