const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const loaders = require('./loaders');

module.exports = {
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
        './src/index',
    ],
    parser: './src/parsers/index',
  },
  output: {
    path: path.resolve(__dirname, '../'),
    filename: '[name].js',
    publicPath: '/public/',
  },
  module: {
    loaders: [
      loaders.jsHot,
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
    includePaths: ['node_modules', path.resolve(__dirname, '../src/style')]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
