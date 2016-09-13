const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: [
        './src/index',
    ],
    parser: './src/parsers/index',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/public/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src'),
    },{
      test: /\.json$/,
      loader: 'json-loader'
    },{
      test: /\.global\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader?sourceMap',
      ]
    },{
      test: /^((?!\.global).)*\.scss$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'sass'
      ]
    }],
  },
  postcss: function () {
    return [autoprefixer];
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/style")]
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
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
};
