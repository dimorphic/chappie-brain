'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');

// JS linter: eslint
var eslint = require('gulp-eslint');

gulp.task('eslint', function() {
	// stream I/O
	var input = CONFIG.paths.js.lint;

	// stream SCSS
	var stream = gulp.src(input)
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failOnError());

	// signal task done
	return stream;
});
