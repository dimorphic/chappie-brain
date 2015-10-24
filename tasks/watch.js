'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');
var helpers = require('../helpers');

// helpers
var notify = helpers.notify;

//
// watch paths
//
var paths = {
	static: {
		src: [
			CONFIG.paths.templates.src,
			CONFIG.paths.images.src,
			CONFIG.paths.fonts.src,
			CONFIG.paths.favicons.src,
		],
		tasks: ['copy', 'browser:reload']
	},

	js: {
		src: [CONFIG.paths.js.src],
		tasks: ['js:dev', 'browser:reload']
	},

	scss: {
		src: [CONFIG.paths.css.src],
		tasks: ['css:dev']
	}
};

//
//	WATCH task
//
gulp.task('watch', function() {
	// notify watch mode
	notify('WATCHING OVER:');

	// respawn gulp on changes
	gulp.watch(['gulpfile.js', 'config.js', 'tasks/**/*.js'], ['kill:gulp']);

	// build watch list
	for (var path in paths) {
		notify(' - ' + path);
		gulp.watch(paths[path].src, paths[path].tasks);
	}
});
