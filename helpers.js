'use strict';

// deps
var _ = require('lodash');
var gutil = require('gulp-util');
var tracer = require('tracer');

//
//	HANDLERS
//
var handlers = {
	onLintError: function(err, cb) { },

	onSassError: function(err, cb) {
		var errMessage = gutil.colors.red('SCSS breakpoint in: ' + err.messageFormatted.replace('\nCurrent dir:', ''));
		gutil.log(errMessage);
		gutil.beep(); gutil.beep();
		cb();
	}
};

//
//	BETTER CONSOLE LOGGER helper
//
var logger = tracer.colorConsole({
    format: [
		// default format
        "{{timestamp}} <{{title}}> {{message}} [{{file}}:{{line}}]",

		// error format
        { error : "{{timestamp}} <{{title}}> {{message}} [in {{file}}:{{line}}]\nCall Stack:\n{{stack}}" }
    ],
	dateformat: '[HH:MM:ss]'
});

//
//	CONSOLE NOTIFY helper
//
var notify = function(message, obj) {
	// log message
	gutil.log(gutil.colors.red.bold(message));

	// parse obj properties
	for (var prop in obj) {
		// log property
		gutil.log(gutil.colors.magenta('[' + prop + ']:'));

		for (var l2Prop in obj[prop]) {
			// log value
			gutil.log(gutil.colors.magenta('  - ' + obj[prop][l2Prop]));
		}
	}
};

//
//	POPUP NOTIFY helper
//
var popup = function() {
	console.log('popup notify !');

	// notify({
	// 	icon: false,
    //     title: 'Katalyst - copy:img',
    // 	subtitle: 'copy:templates',
	//
    //     message: 'DONE'
	// });
};

//
// TASK DEBUG helper
//
var taskDebug = function(taskName, input, output) {
	taskName = (taskName) ? taskName : 'taskName N/A';

	console.log(' ');
	console.log(gutil.colors.cyan('>> [' + taskName + '] IN: '), input);
	console.log(gutil.colors.magenta('<< [' + taskName + '] OUT @ '), output);
	console.log(' ');
};

//
//	ADD PREFIX to object properties
//
var addPrefix = function(prefix, obj) {
	if (!prefix || !obj) {
		console.log('Need prefix and/or object!', prefix, obj);
		return void 0;
	}

	// map object values
	var newObj = _.mapValues(obj, function(value) {
		// is property an object also ?
	    if (_.isObject(value)) {

			// iterate it
			return addPrefix(prefix, value);

	    } else {
	        return prefix + value;
	    }
	});

	// return mapped object
	return newObj;
};

// expose
module.exports = {
	onSassError: handlers.onSassError,

	logger: logger,
	notify: notify,
	taskDebug: taskDebug,
	addPrefix: addPrefix
};
