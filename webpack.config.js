const path = require('path');

module.exports = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      components: path.resolve(__dirname, 'src/components'),
      tests: path.resolve(__dirname, 'tests/helpers'),
    },
  },
};
