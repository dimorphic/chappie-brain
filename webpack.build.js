// deps
const path = require('path');
const webpack = require('webpack');

// const PATHS = require('./config').paths;

// extend base config
const CONFIG = Object.assign({}, require('./webpack.base'));

// app chunk files bundles
const BUNDLES = {
	js: '[name].[hash].js',
	css: '[name].[hash].css',
	img: '[path][name].[hash].[ext]'
};

//
//	PRODUCTION PLUGINS
//
CONFIG.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
		name: 'vendor',
		filename: '[name].[hash].js',
		minChunks: Infinity
	}),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			// @DEBUG: warn dangerous optimizations / code
			warnings: false,

			screw_ie8: true
		},
		output: {
			comments: false
		}
	}),
	new webpack.optimize.AggressiveMergingPlugin()
);

// expose
module.exports = CONFIG;
