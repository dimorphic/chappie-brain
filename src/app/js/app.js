define(function(require){
	'use strict';

	// deps
	var angular = require('angular');

	// components
	var COMPONENTS = [
		require('services/raf'),

		require('components/Brain'),
		require('components/Braincell')
	];

	// define app main module
	var app = angular.module('app', COMPONENTS);
	app.controller('AppController', require('controllers/AppController'));
});
