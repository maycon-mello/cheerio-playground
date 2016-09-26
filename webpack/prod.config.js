const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const loaders = require('./loaders');
const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/index',
    parser: './src/parsers/worker',
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    publicPath: '/static/',
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
