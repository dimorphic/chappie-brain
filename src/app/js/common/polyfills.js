// import 'babel-polyfill'; // do we really need these ?

//
// RAF polyfill
//
window.requestAnimFrame = (() => {
  return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
    function callback(cb) {
      window.setTimeout(cb, 16.6); // up to 60 FPS (1000/60)
    };
})();

window.cancelRequestAnimFrame = (() => {
  return window.cancelAnimationFrame ||
	window.webkitCancelRequestAnimationFrame ||
	window.mozCancelRequestAnimationFrame ||
	window.oCancelRequestAnimationFrame ||
	window.msCancelRequestAnimationFrame ||
	clearTimeout;
})();
