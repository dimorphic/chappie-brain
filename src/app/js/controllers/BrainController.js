define(function(require){
	'use strict';

	// deps
	var stats = require('common/stats');

	// models
	var Memory = require('models/Memory');

	//
	// #DEBUG: do you even lift, bro?
	//
	var benchmark = true;

	// performance stats meters
	var fpsMeter, msMeter, mbMeter = null;

	if (benchmark) {
		fpsMeter = stats.createMeter('fps', { top: 0, left: 0 });
		msMeter = stats.createMeter('ms', { top: 0, left: 80 });
		// mbMeter = stats.createMeter('mb', { top: 0, left: 160 });
	}

	//
	//	Brain component
	//
	var BrainController = function BrainController($scope, $timeout, $interval, raf) {
		var vm = this;

		// ---------------
        // PUBLIC METHODS
        // ---------------
		vm.redrawCounter = 0;
		vm.memory = [];

		// ---------------
        // PRIVATE METHODS
        // ---------------
		var memory = null;

		// animation options
		var ANIMATION = {
			// play with this!
			alive: 1, // brain is 'alive' (randomize memory activity) ?
			updateMode: 0,		// 0 - full memory
								// 1 - single memory

			// animation settings
			useRAF: true,		// steroids mode on?
			updateDelay: 1000,	// ignored if RAF true, slowpoke

			// trackers
			updateTimer: null	// update timer (raf / interval)
		};

		//
		//	update memory
		//
		var update = function() {
			// console.log('update memory!');

			// @TODO: $timeout might boost things up
			// $timeout(function() {
			memory.update();
			++vm.redrawCounter;
			$scope.$apply();
			// });
		};

		//
		//	redraw
		//
		var redraw = function() {
			// console.log('redraw!');

			// request another frame?
			if (ANIMATION.useRAF) {
				ANIMATION.updateTimer = raf(redraw);
			}

			// benchmark start
			if (benchmark) {
				fpsMeter.begin();
				msMeter.begin();
				// mbMeter.begin();
			}

			// update & render
			update();

			// benchmark end
			if (benchmark) {
				fpsMeter.end();
				msMeter.end();
				// mbMeter.end();
			}
		};

		var _activate = function() {
			// create new memory
			memory = new Memory({
				updateMode: ANIMATION.updateMode
			});

			// set memory
			vm.memory = memory;

			// start animation (rebuild memory)
			if (ANIMATION.useRAF) {
				ANIMATION.updateTimer = raf(redraw);
			} else {
				ANIMATION.updateTimer = setInterval(redraw, ANIMATION.updateDelay);
			}

			// randomize memory activity
			if (ANIMATION.alive) {
				setInterval(function() {
					console.log('gen noise!');
					memory.generateNoise();
				}, 6000);
			}
		};

		//
		//	screen resize handler
		//
		vm.onScreenResize = function() {
			console.log('resize bro!');

			// rebuild/reboot memory
			vm.memory = [];
			memory.boot();

			$timeout(function() {
				vm.memory = memory;
			});
		};

		// ...and call it
		_activate();
	};

	// inject modules
	BrainController.$inject = ['$scope', '$timeout', '$interval', 'RAF'];

	// expose
	return BrainController;
});
