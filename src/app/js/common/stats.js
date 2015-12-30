// deps
import Stats from 'stats.js';

//
//	create stats meter
//	types: FPS, MS, MB
//
// const statsMeter = exports.meter = (meterType, pos) => {
export default function statsMeter(meterType, pos) {
    // meter types
    const METERS = {
        'fps': 0,
        'ms': 1,
        'mb': 2
    };

    // meter default position if none passed
    const position = pos || { top: 0, left: 0 };

    // error checks
    if (!meterType || !position) {
        throw new Error('Need type (FPS / MS / MB) & position for meter, bro.');
    }

    if ((typeof METERS[meterType] === 'undefined')) {
        throw new Error('Unknown meter type bro.');
    }

    console.log('[debug] Creating meter ' + meterType.toUpperCase() + ' ...');

    // create new stats meter
    const meter = new Stats();

    // set meter type (0: fps, 1: ms, 2: mb)
    meter.setMode(METERS[meterType]);

    // assign meter position
    meter.domElement.style.position = 'absolute';

    for (const POS in position) {
        if (position.hasOwnProperty(POS)) {
            meter.domElement.style[POS] = position[POS] + 'px';
        }
    }

    document.body.appendChild(meter.domElement);

    return meter;
}
