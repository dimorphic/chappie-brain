// require("babel-core/register");

// deps
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ENV
const ENV = process.env.NODE_ENV || 'development';

// app paths
const PATHS = require('./config').paths;

// app chunk files bundles
const BUNDLES = {
	js: '[name].js',
	css: '[name].css',
	img: '[path][name].[ext]'
};

//
//	DEFAULT PLUGINS
//
const PLUGINS = [
	new webpack.DefinePlugin({
		'__DEV__': JSON.stringify(ENV === 'development' || false),
		'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) }
	}),
	new ExtractTextPlugin(BUNDLES.css)
];

//
//  DEFAULT PRELOADERS
//
const PRELOADERS = [
    {
		test: /\.js$|.jsx$/,
		loader: 'eslint'
    }
];

//
//	DEFAULT LOADERS
//
const LOADERS = [
    // HTML
	{
		test: /\.html$/,
		loaders: ['html']
	},

	// IMAGES / SVG
	{
    	test: /.*\.(gif|png|jpe?g|svg)$/i,
    	loaders: [
      		`file?hash=sha512&digest=hex&name=${BUNDLES.img}`,
      		'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
    	]
  	},

	// CSS / SCSS
	{
		test: /\.(scss|css)$/,
		loaders: [
			'style-loader',
			'css-loader',
			'autoprefixer-loader?browsers=last 2 versions',
			'sass-loader?outputStyle=expanded'
            /*
            @TODO: add modules / node / bower import paths?
            + [
                `includePaths[]=${PATHS.app}/scss`,
                'includePaths[]=' + (path.resolve( __dirname, 'node_modules', 'src'))
            ].join('&')
            */
		]
		// include: `${PATHS.app}/scss`,
	},

	// JS + ES6
	{
		test: /\.js$|.jsx$/,
		loader: 'babel',
		query: {
            cacheDirectory: true,
			presets: ['es2015', 'stage-2']
		},
		include: `${PATHS.app}/js`,
		exclude: [
			path.join( __dirname, 'node_modules' ),
			path.join( __dirname, 'bower_components' )
		]
	}
];

//
//	DEFAULT / BASE CONFIG
//
const CONFIG = {
	context: PATHS.app,

	entry: [
		`${PATHS.app}/js/main.js`
		// vendors paths?
	],

	output: {
		path: `${PATHS.build}`,
		filename: BUNDLES.js,
		publicPath: '/'
	},

	// misc
	cache: (ENV === 'development'),
	debug: (ENV === 'development'),
	devtool: (ENV === 'development') ? 'eval' : '',

	// plugins & loaders
	plugins: PLUGINS,
	module: {
        preLoaders: PRELOADERS,
		loaders: LOADERS
	},

    eslint: {
    	configFile: `${PATHS.app}/js/.eslintrc`
    },

	resolve: {
		root: [ PATHS.app ],
		extensions: [
			'',
			'.js',
			'.jsx',
			'.css',
			'.scss',
		],

        /* @TODO: check imports of vendor assets
		modulesDirectories: [
			`${PATHS.app}/assets`,   // static assets
			`${PATHS.app}/scss`,     // css styles

			// fallbacks
            `${PATHS.app}/vendor`, // bower alias ?
			'node_modules',
		]
        */
	}
};

// expose
module.exports = CONFIG;
