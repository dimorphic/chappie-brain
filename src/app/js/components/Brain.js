define(function(require){
	'use strict';

	// deps
	var angular = require('angular');

	// settings
	var MODULE_NAME = 'Brain';
	var controller = require('controllers/BrainController');

	//
	//	Brain directive
	//
	angular.module(MODULE_NAME, [])
		.directive(MODULE_NAME.toLowerCase(),
			['$window',
			function($window) {
				// DOM link
				var link = function(scope, element, attr, ctrl) {
					console.log('Brain link ok!');

					// ... also bind to window resize event
					angular.element($window).bind('resize', function() {
						// console.log('resize bro!');
						ctrl.onScreenResize();
					});
				};

				// return directive config
				return {
					restrict: 'E',
					templateUrl: `templates/${MODULE_NAME}.tpl.html`,
					link: link,
					controller: controller,
					controllerAs: 'brain'
				};
			}
		]
	);

	return MODULE_NAME;
});
