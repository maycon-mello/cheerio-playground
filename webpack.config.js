const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/',
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
      test: /\.global\.css$/,
      loaders: [
        'style-loader',
        'css-loader?sourceMap'
      ]
    },{
      test: /^((?!\.global).)*\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      ]
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
