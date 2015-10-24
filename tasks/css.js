'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');
var helpers = require('../helpers');
var browserSync = require('browser-sync');

// CSS transformers:
// sass, autoprefixer, minifyCSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Browsers support for autoprefixer
var BROWSER_SUPPORT = {
	browsers: ['last 2 versions'],
	cascade: false
};

//
//	SASS COMPILE task
//
gulp.task('sass', function(cb) {
	// stream I/O
	var input = CONFIG.paths.css.src;
	var output = CONFIG.paths.css.temp;

	// stream SCSS
	var stream = gulp.src(input)
	.pipe(sass().on('error', function(err){
		browserSync.notify('[error] SASS compile fail', 3000);
		helpers.onSassError(err, cb);
	}))
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});

//
//	CSS - DEV mode build
//
gulp.task('css:dev', ['sass'], function() {
	// stream I/O
	var input = CONFIG.paths.css.temp + '**/*.css';
	var output = CONFIG.paths.css.dest;

	// stream CSS
	var stream = gulp.src(input)
	.pipe(autoprefixer(BROWSER_SUPPORT))
	.pipe(gulp.dest(output))
	.pipe(browserSync.stream({ match: '**/*.css' }));

	// signal task done
	return stream;
});

//
//	CSS - PRODUCTION mode build
//
gulp.task('css:prod', ['sass'], function() {
	// stream I/O
	var input = CONFIG.paths.css.temp + '**/*.css';
	var output = CONFIG.paths.css.dest;

	// stream CSS
	var stream = gulp.src(input)
	.pipe(autoprefixer(BROWSER_SUPPORT))
	.pipe(minifyCSS({
		keepSpecialComments: 0
	}))
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});
