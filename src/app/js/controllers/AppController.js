define(function(require){
	'use strict';

	var AppController = function AppController($timeout) {
		var vm = this;

		// ---------------
        // PUBLIC METHODS
        // ---------------

		// ---------------
        // PRIVATE METHODS
        // ---------------
		var _activate = function() {
			// console.log('App controller up!');
		};

		// ...and call it
		_activate();
	};

	// inject modules
	AppController.$inject = ['$timeout'];

	// expose
	return AppController;
});
