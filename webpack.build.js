// deps
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = require('./config').paths;

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
    // build common vendor bundle
	// new webpack.optimize.CommonsChunkPlugin({
	// 	name: 'vendor',
	// 	filename: '[name].js',
	// 	minChunks: Infinity
	// }),
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
	new webpack.optimize.AggressiveMergingPlugin(),

    // copy HTML entry point
    new CopyWebpackPlugin([
        { from: `${PATHS.public}/index.html` },
    ])
);

// expose
module.exports = CONFIG;
