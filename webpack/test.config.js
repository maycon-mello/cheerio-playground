const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const loaders = require('./loaders');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      loaders.js,
      loaders.json,
      loaders.globalStyle,
      loaders.css,
      loaders.sass,
      loaders.woff,
      loaders.ttf,
      loaders.file,
    ],
  },
  postcss: () => [autoprefixer],
  sassLoader: {
    includePaths: [path.resolve(__dirname, '../src/style')]
  }
};
