define(function(require){
	'use strict';

	//
	// RAF polyfill
	//
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function ( callback ) {
				window.setTimeout( callback, 16.6 ); // up to 60 FPS (1000/60)
			};
	})();

	window.cancelRequestAnimFrame = (function() {
		return window.cancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout;
	})();

	//
	// get random color helper
	//
	var _getRandomColor = function() {
		var color = '#' + Math.random().toString(16).substr(2, 6);

		return color;
	};

	//
	// get random char helper
	//
	var _getRandomChar = function() {
		var chars = '<>!"%^&,.?()_=';
		var randomAction = chars[Math.floor(Math.random() * chars.length)];

		return randomAction;
	};


	// expose
	return {
		getRandomColor: _getRandomColor,
		getRandomChar: _getRandomChar
	};
});
