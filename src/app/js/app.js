define(function(require){
	'use strict';

	// deps
	var $ = require('jquery');

	// components
	var Brain = require('components/Brain');
	var Ear = require('components/Ear');

	// pointers
	var BRAIN, EAR;

	//
	// VOICE COMMANDS
	//
	var COMMANDS = {
		'hello *term': function(term) {
			// interpret user term / query
			BRAIN.interpret(term);
		}
	};

	//
	// DOM ready
	//
	$(function() {
		// initialize Brain
		BRAIN = new Brain('#app');
		EAR = new Ear(COMMANDS, { autoRestart: false });  // should be true

		// restart listening for voice inputs (mic tends to fail sometimes on local)
		// note: need HTTPS to stop the browser for asking mic permissions
		$('#start-voice').on('click', function() {
			BRAIN.animation.alive = 0;
			EAR.listen();
		});
	});
});
