'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

//
//	COPY main task
//
gulp.task('copy', [
	'copy:templates',
	'copy:img'
]);

//
//	COPY:TEMPLATES task
//
gulp.task('copy:templates', function() {
	// stream I/O
	var input = CONFIG.paths.templates.src;
	var output = CONFIG.paths.templates.dest;

	// @debug
	// CONFIG.debug('copy:templates', input, output);

	// stream templates
	var stream = gulp.src(input)
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});

//
//	COPY:IMAGES task
//
gulp.task('copy:img', function() {
	// stream I/O
	var input = CONFIG.paths.images.src;
	var output = CONFIG.paths.images.dest;

	// @debug
	// CONFIG.debug('copy:img', input, output);

	// stream images
	var stream = gulp.src(input)
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});
