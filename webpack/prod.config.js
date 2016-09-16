const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const loaders = require('./loaders');

module.exports = {
  devtool: 'source-map',
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
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    })
  ],
};
