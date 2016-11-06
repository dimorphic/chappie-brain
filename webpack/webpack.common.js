// deps
const webpack = require('webpack');
const helpers = require('./helpers');

// plugins
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

// config
const CONFIG = require('../config');
const METADATA = CONFIG.METADATA;

module.exports = {
  metadata: METADATA,

  entry: {
    'polyfills': './src/polyfills.ts',
    'main': './src/bootstrap.ts',
  },

  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src'),
    modulesDirectories: [
      './src/app',
      './src/assets',
      'node_modules'
    ],
  },

  module: {
    // preLoaders
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
        ]
      }
    ],

    // loadersß
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },

      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [
          helpers.root('src/index.html')
        ]
      }
    ]
  },

  // plugins
  plugins: [
    new ForkCheckerPlugin(),

    new webpack.optimize.OccurenceOrderPlugin(true),

    new webpack.optimize.CommonsChunkPlugin({
      name: helpers.reverse(['polyfills', 'main']),
      minChunks: Infinity
    }),

    new CopyWebpackPlugin([
      {
        from: 'src/assets/images',
        to: 'assets/images'
      },
      {
        from: 'src/assets/favicon',
        to: 'assets/favicon'
      }
    ]),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: helpers.packageSort(['polyfills', 'main']),
    })
  ],

  postcss: function () {
    return [autoprefixer];
  },

  // node mocks
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
}
