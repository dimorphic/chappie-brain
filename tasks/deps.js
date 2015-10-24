'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

//
//	COPY:DEPENDENCIES (VENDOR) task
//
gulp.task('copy:dependencies', ['dependencies:css', 'dependencies:js']);

//
//	COPY VENDOR:CSS task
//
gulp.task('dependencies:css', function() {
	// stream I/O
	var input = CONFIG.deps.css;
	var output = CONFIG.paths.css.vendor;

	// @debug
	// CONFIG.debug('dependencies:css', input, output);

	// stream CSS deps
	var stream = gulp.src(input)

	// ...rename all files to .SCSS
	// to allow easy @import in SASS/SCSS files
	// until this gets implemented (HACK)
	.pipe($.rename(function(path) {
		path.basename = '_' + path.basename;
		path.extname = '.scss';
	}))
	.pipe(gulp.dest(output))
	.pipe($.size({ title: 'dependencies:css' }));

	// signal task done
	// return stream;
});

//
//	COPY VENDOR:JS task
//
gulp.task('dependencies:js', function() {
	// stream I/O
	var input = CONFIG.deps.js;
	var output = CONFIG.paths.js.vendor;

	// @debug
	// CONFIG.debug('dependencies:js', input, output);

	// stream JS deps
	var stream = gulp.src(input)
	.pipe(gulp.dest(output))
	.pipe($.size({ title: 'dependencies:js' }));

	// signal task done
	// return stream;
});
