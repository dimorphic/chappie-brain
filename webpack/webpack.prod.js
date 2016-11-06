const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

// plugins
const autoprefixer = require('autoprefixer');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// env
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const HMR = helpers.hasProcessFlag('hot');

commonConfig.module.loaders.push(
  {
    test: /\.(scss|css)$/,
    loader:
      ExtractTextPlugin.extract(
        'style-loader',
        'css-loader?minimize!postcss-loader!sass-loader?outputStyle=expanded' +
        '&includePaths[]=' + helpers.root('src') + '/assets/scss' +
        '&includePaths[]=' + helpers.root('src') + '/app' +
        '&includePaths[]=' + helpers.root('node_modules')
      ),
  }
);

module.exports = webpackMerge(commonConfig, {
  debug: false,
  devtool: 'source-map',

  // output
  output: {
    path: helpers.root('build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    publicPath: '/',
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
    }),
    new UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8 : true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),

    new ExtractTextPlugin("/assets/css/style.css"),
  ],

  postcss: function () {
    return [autoprefixer];
  },

  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  },

  node: {
    global: 'window',
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
