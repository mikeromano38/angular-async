include('./filters.js');
include('./services.js');
include('./directives.js');
include('./controller1.js');

var init = function(){
	'use strict';

	console.log('initializing app');
	// Declare app level module which depends on filters, and services
	var mod = angular.module('myApp', [
			'ngRoute',
			'asyncAngular',
			'myApp.filters',
			'myApp.services',
			'myApp.directives',
			'myApp.controllers'
		]);

	mod.config(['$routeProvider', function($routeProvider) {

			$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
			$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', resolve: { deps: ['async', function(async){

				var dep = async.fetch('./js/controller2.js');

				dep.then(function(){
					console.log('controller 2 resolved');
				});

				return dep;

			}]}, controller: 'MyCtrl2'});

			$routeProvider.otherwise({redirectTo: '/view1'});
		}]);

	angular.bootstrap(window.document, ['myApp']);
}

