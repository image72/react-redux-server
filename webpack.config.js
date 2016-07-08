const path = require('path');
const webpack = require('webpack');

var isDev = process.env.NODE_ENV === 'development';
var devtool = 'source-map';

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: devtool,
  resolve: {
    root: path.join(__dirname, 'app'),
    extensions: ['', '.js', '.jsx', '.json']
  },
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'axios', 'lodash'],
    app: ['./app/app']
  },
  output: {

    path: path.join(__dirname, 'public'),
    filename: '[name].js',
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
//
//
// module.exports = {
//   devtool: 'cheap-module-eval-source-map',
//   entry: [
//     // 'eventsource-polyfill', // necessary for hot reloading with IE
//     'webpack-hot-middleware/client',
//     './app/app'
//   ],
//   output: {
//     path: path.join(__dirname, 'public'),
//     filename: 'bundle.js',
//     publicPath: '/static/'
//   },
//   plugins: [
//     /**
//      * This is where the magic happens! You need this to enable Hot Module Replacement!
//      */
//     new webpack.HotModuleReplacementPlugin(),
//     /**
//      * NoErrorsPlugin prevents your webpack CLI from exiting with an error code if
//      * there are errors during compiling - essentially, assets that include errors
//      * will not be emitted. If you want your webpack to 'fail', you need to check out
//      * the bail option.
//      */
//     new webpack.NoErrorsPlugin(),
//     /**
//      * DefinePlugin allows us to define free variables, in any webpack build, you can
//      * use it to create separate builds with debug logging or adding global constants!
//      * Here, we use it to specify a development build.
//      */
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify('development')
//     }),
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.js?/,
//         exclude: [/node_modules/, /styles/],
//         loaders: ['babel'],
//         include: path.join(__dirname, 'app')
//       },
//       {
//         test: /\.scss$/,
//         loader: 'style!css!sass'
//       }
//     ]
//   },
//   resolve: {
//     root: path.resolve('app')
//   }
// };
