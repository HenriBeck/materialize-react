/* eslint-disable import/no-commonjs */

module.exports = {
  module: {
    loaders: [{
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader',
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css',
      ],
    }],
  },
};
