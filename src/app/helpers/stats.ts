import * as StatsJS from 'stats.js';

function createMeter(meterType: string, meterPosition: Object): void {
  // meter types
  const METERS = {
    fps: 0,
    ms: 1,
    mb: 2
  };

  // meter default position
  const position = meterPosition || { top: 0, left: 0};

  // error checks
	if (!meterType) {
		throw new Error('Need type (FPS / MS / MB) for meter, bro.');
	}

	if ((typeof METERS[meterType] === 'undefined')) {
		throw new Error('Unknown meter type bro.');
	}

	console.log('[STATS] Creating meter ' + meterType.toUpperCase() + ' ...');

  // create new stats meter
	const meter = new StatsJS();

	// set meter type
	meter.showPanel( METERS[meterType] ); // 0: fps, 1: ms, 2: mb

	// assign meter position
	meter.domElement.style.position = 'absolute';

	for (var POS in position) {
		if (position.hasOwnProperty(POS)) {
			meter.domElement.style[POS] = position[POS] + 'px';
		}
	}

  // insert in DOM
	document.body.appendChild( meter.dom );

	return meter;
}

export default { createMeter };
