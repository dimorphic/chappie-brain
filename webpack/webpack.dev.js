// deps
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

// plugins
const DefinePlugin = require('webpack/lib/DefinePlugin');

// env
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8000;
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');

commonConfig.module.loaders.push(
  {
    test: /\.(jpg|png)$/,
    loaders: [
      'url-loader?limit=100000'
    ],
  },

  {
    test: /\.(css|scss)$/,
    loaders: [
      'style',
      'css',
      'postcss',
      'sass'
    ],
  }
);

module.exports = webpackMerge(commonConfig, {
  debug: true,
  // devtool: 'cheap-module-eval-source-map',
  devtool: '#cheap-source-map',

  // output
  output: {
    path: helpers.root('build'),
    publicPath: '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
   },

   // plugins
   plugins: [
     new DefinePlugin({
       'ENV': JSON.stringify(ENV),
       'HMR': HMR,
       'process.env': {
         'ENV': JSON.stringify(ENV),
         'NODE_ENV': JSON.stringify(ENV),
         'HMR': HMR,
       }
     })
   ],

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

   // dev server config
  devServer: {
    port: PORT,
    host: HOST,
    contentBase: helpers.root('src'),
    historyApiFallback: true,
    inline: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
   },
  },
});
