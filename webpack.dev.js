// deps
const path = require('path');
const webpack = require('webpack');

const PATHS = require('./config').paths;

// extend base config
const CONFIG = Object.assign({}, require('./webpack.base'));

// web / dev server settings
const HOST = 'localhost';
const PORT = 9090;

//
//	MULTIPLE ENTRY POINTS
//	add webpack hot and dev server paths
//
CONFIG.entry.unshift(
	'webpack/hot/dev-server',
	`webpack-dev-server/client?http://${HOST}:${PORT}`
);

//
//	DEVELOPMENT PLUGINS
//
CONFIG.plugins.push(
	// new webpack.optimize.OccurenceOrderPlugin(), // use only in prod/build ?
	new webpack.HotModuleReplacementPlugin()
	// new webpack.NoErrorsPlugin() // don't emit assets on errors
);

// LINT ?
/*
CONFIG.eslint = {
    // parser: 'babel-eslint',
	configFile: `${PATHS.app}/js/.eslintrc`
    // emitErrors: true
    // failOnError: true
};
*/

//
//	WEB DEV SERVER
//
CONFIG.devServer = {
	host: HOST,
	port: PORT,

	contentBase: PATHS.public,

	hot: true,
	inline: true,
	progress: true,

	historyApIFallback: true,

	stats: {
		colors: true,
		version: false,
		timings: true
	}
};

// expose
module.exports = CONFIG;
