define(function(require){
	'use strict';

	// deps
	require('statsjs');

	// use stats.js
	var Stats = window.Stats;

	//
	//	create stats meter
	//	types: FPS, MS, MB
	//
	var createMeter = function(meterType, position) {
		// meter types
		var METERS = {
			'fps': 0,
			'ms': 1,
			'mb': 2
		};

		// meter default position if none passed
		position = position || { top: 0, left: 0};

		// error checks
		if (!meterType || !position) {
			throw new Error('Need type (FPS / MS / MB) & position for meter, bro.');
		}

		if ((typeof METERS[meterType] === 'undefined')) {
			throw new Error('Unknown meter type bro.');
		}

		console.log('[debug] Creating meter ' + meterType.toUpperCase() + ' ...');

		// create new stats meter
		var meter = new Stats();

		// set meter type
		meter.setMode( METERS[meterType] ); // 0: fps, 1: ms, 2: mb

		// assign meter position
		meter.domElement.style.position = 'absolute';

		for (var POS in position) {
			if (position.hasOwnProperty(POS)) {
				meter.domElement.style[POS] = position[POS] + 'px';
			}
		}

		document.body.appendChild( meter.domElement );

		return meter;
	};

	// expose
	return {
		createMeter: createMeter
	};
});
