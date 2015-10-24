'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');
var runSequence = require('run-sequence');

// JS transformers:
// babel, uglify
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

// JS package manager / bundler
var requireJS = require('gulp-requirejs');

//
//	JS:TRANSFORM
//	do any transforms here (es 6-to-5, react, etc)
//
gulp.task('js:transform', function() {
	// stream I/O
	var input = CONFIG.paths.js.src;
	var output = CONFIG.paths.js.temp;

	// stream SCSS
	var stream = gulp.src(input)
	.pipe(babel({
		ignore: [CONFIG.paths.js.vendor]
	}))
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});

//
//	JS:COPY task
//
gulp.task('js:copy', function() {
	// stream I/O
	var input = CONFIG.paths.js.temp + '**/*.js';
	var output = CONFIG.paths.js.dest;

	// stream SCSS
	var stream = gulp.src(input)
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});

//
//	JS:BUNDLE task (aka 'compile' task)
//
gulp.task('js:bundle', function() {
	// bundler settings
	var requireConfig = {
        name: 'main',
		out: 'main.js',
		optimize: 'none',
		baseUrl: CONFIG.paths.js.temp,
        mainConfigFile: CONFIG.paths.js.temp + 'main.js'
    };

	// stream I/O
	var input = CONFIG.paths.js.temp + 'vendor/require.js';
	var output = CONFIG.paths.js.dest;

	// copy requirejs vendor lib
	var requireLib = gulp.src(input)
		.pipe(gulp.dest(output + 'vendor/'));

	// go bundle stuff!
    requireJS(requireConfig)
		.pipe(uglify())
		.pipe(gulp.dest(output));
});

//
//	JS:DEV task
//
gulp.task('js:dev', function(cb) {
	runSequence(
		'eslint',
		'js:transform',
		'js:copy',
	cb);
});

//
//	JS:PROD task
//
gulp.task('js:prod', function(cb) {
	runSequence(
		'eslint',
		'js:transform',
		'js:bundle',
	cb);
});
