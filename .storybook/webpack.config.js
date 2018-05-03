// @flow strict

const path = require("path");

module.exports = (storybookBaseConfig) => {
  return Object.assign({}, storybookBaseConfig, {
    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
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
