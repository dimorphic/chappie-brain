'use strict';

// KATALYST global config
var CONFIG = require('../config.js');

// deps
var gulp = require('gulp');
var del = require('del');

//	CLEAN task
gulp.task('clean', function(cb) {
	// del build dir
	return del([
		CONFIG.paths.app.dest,
		CONFIG.paths.app.temp
	], cb);
});
