define(function(require){
	'use strict';

	// deps
	require('annyang');
	var $ = require('jquery'); // @TODO: replace with Object.assign polyfill

	//
	//	Ear
	//
	var Ear = function(commands, options) {
		this.engine = window.annyang;

		// default options
		this.config = $.extend({
			autoRestart: false, // should be true, on HTTPS
			continuous: true
		}, options);

		// activate debug
		this.debug();

		// add commands to listen for
		this.engine.addCommands(commands);

		// start listening
		// this.listen();
	};

	//
	//	Ear listen helper
	//
	Ear.prototype.listen = function() {
		if (!this.engine || !this.engine.start) {
			throw new Error('Need a Speech engine bro!');
		}

		console.log('[Ear] Listening...');

		// note: need HTTPS to stop the browser for asking mic permissions
		this.engine.start(this.config);
	};

	//
	//	Ear debug helper
	//
	Ear.prototype.debug = function() {
		if (!this.engine) {
			throw new Error('Need a Speech engine bro!');
		}

		// log each mached result
		this.engine.addCallback('resultMatch', function(userSaid, cmdText, phrases) {
			console.log(`[Ear] i heard: ${userSaid} (${cmdText})`);
			console.log('[Ear] phrases:', phrases);
			console.log(' ');
		});
	};

	// expose
	return Ear;
});
