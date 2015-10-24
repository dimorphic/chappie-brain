'use strict';

// deps
var gutil = require('gulp-util');
var helpers = require('./helpers');

//
//  KATALYST global config
//
var CONFIG = {};

//
//  APP DEPENDENCIES paths (vendor)
//
// ...used for selective copy of files
// to app sources vendor dir
//
CONFIG.deps = {
	css: [],

	js: [
		'src/vendor/requirejs/require.js',

        'src/vendor/jquery/dist/jquery.js',
		'src/vendor/angular/angular.js', // YEA BABY!
		'src/vendor/noisejs/index.js',

		'src/vendor/stats.js/build/stats.min.js'
	]
};

//
//  APP SOURCES paths
//
CONFIG.paths = {
	// APP base dirs
	app: {
		src: 		'src/', 	// app sources dir
	    dest: 		'dist/', 	// app build dir
		temp:		'.tmp/' 	// app temp dir (if needed)
	},

	// CSS
	css: {
		src: 		'src/app/scss/**/*.scss',
		vendor: 	'src/app/scss/vendor/',
		temp:		'.tmp/css/',
		dest: 		'dist/css/'
	},

	// JS
    js: {
        src: [
					'src/app/js/**/*.js',
					'src/app/js/**/*.jsx'
		],

		vendor: 	'src/app/js/vendor/',

		lint: [
					'src/app/js/**/*.js',
					'src/app/js/**/*.jsx',
					'!src/app/js/vendor/**'
		],

		temp:		'.tmp/js/',
		dest: 		'dist/js/'
    },

	// TEMPLATES
	templates: {
		src: 		'src/www/**/*.html',
		dest: 		'dist/'
	},

	// FAVICONS
	favicons: {
		src: 		'src/www/assets/favicons/**/*',
		dest: 		'dist/assets/favicons/'
	},

	// FONTS
	fonts: {
		src: 		'src/www/assets/fonts/**/*',
		dest: 		'dist/assets/fonts/'
	},

	// IMAGES
	images: {
		src: 		'src/www/assets/images/**/*',
		dest: 		'dist/assets/images/'
	},

	// SVG (icons)
	svg: {
		src: 		'src/assets/svg/**/*.svg',
		dest: 		''
	}
};

// expose
module.exports = {
    paths: CONFIG.paths,
    deps: CONFIG.deps
};
