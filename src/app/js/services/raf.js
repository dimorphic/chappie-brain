define(function(require){
	'use strict';

	// deps
	var angular = require('angular');
	var helpers = require('common/helpers');

	// settings
	var MODULE_NAME = 'RAF';

	//
	//	Animate Service
	//
	angular.module(MODULE_NAME, [])
		.factory(MODULE_NAME,
			['$window',
			function($window) {

				// RAF
				var requestAnimationFrame = $window.requestAnimFrame;

				// expose
				return function(tick) {
					requestAnimationFrame(tick);

					/*requestAnimationFrame(function() {
				    	$rootScope.$apply(tick);
					});*/
				};
			}
		]
	);

	return MODULE_NAME;
});
