// @flow strict

module.exports = { // eslint-disable-line import/no-commonjs, import/unambiguous
  module: {
    rules: [{
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
};
