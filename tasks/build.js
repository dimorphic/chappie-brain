'use strict';

// deps
var gulp = require('gulp');
var runSequence = require('run-sequence');

//
// BUILD:DEV task
//
gulp.task('build:dev', ['clear:terminal', 'watch'], function(cb) {
	runSequence(
		'clean',
		'copy:dependencies',
		[
		  'css:dev',
		  'js:dev',
		  'copy'
		],
		'browser:serve',
	cb);
});

//
// BUILD:PROD task
//
gulp.task('build:prod', function(cb) {
	runSequence(
		'clean',
		'copy:dependencies',
		[
			'css:prod',
			'js:prod',
			'copy'
		],
	cb);
});

//
// BUILD task
//
gulp.task('build', ['build:prod']);
