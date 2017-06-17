/* eslint-disable import/no-commonjs */

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
