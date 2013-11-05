var init = function(){
	'use strict';

	/* Controller 1 */

	angular.module('myApp.controllers', []).
		controller('MyCtrl1', ['$scope', 'async', function($scope, async) {
			console.log('controller1')

			$scope.getController = function(){
				var module = async.fetch('./js/controller2.js');

				module.then(function(){
					console.log('loaded from controller');
				})
			}
		}])

	console.log(angular.module('myApp.controllers'));
}