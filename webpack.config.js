const path = require('path');
const webpack = require('webpack');

var isDev = process.env.NODE_ENV === 'development';
var devtool = 'source-map';

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: devtool,
  // context: path.join(__dirname, 'app'),
  resolve: {
    root: [__dirname,path.join(__dirname, 'app'), path.join(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx', '.json']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  entry: {
    // vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'axios', 'lodash'],
    app: ['./app/app']
  },
  output: {

    path: path.join(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/public/'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: [/node_modules/, /styles/],
        loaders: ['babel'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
}

if (isDev) {
  webpackConfig.devtool = 'cheap-module-eval-source-map';
  webpackConfig.entry.app.unshift('webpack-hot-middleware/client');
  webpackConfig.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  )

} else {
  webpackConfig.devtool = 'source-map';

  webpackConfig.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      comments: false,
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })

  )
}

module.exports = webpackConfig;
