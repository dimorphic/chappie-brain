'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserReload = browserSync.reload;

// fix routes for SPAs ('cannot GET file' error in BS)
var historyApiFallback = require('connect-history-api-fallback');

//
//	BROWSER:SERVE task
//
gulp.task('browser:serve', function () {
	browserSync({
		logPrefix: 'KAT',
		notify: false,

		// Run as an https by uncommenting 'https: true'
		// Note: this uses an unsigned certificate which on first access
		//       will present a certificate warning in the browser.
		// https: true,

		server: './dist',
		baseDir: './dist',

		middleware: [ historyApiFallback() ],

		port: 8080,
		ui: {
			port: 8081,
			weinre: {
				port: 9090
			}
		}
	});
});

//
//	BROWSER:RELOAD task
//
gulp.task('browser:reload', function() {
	browserReload();
});
