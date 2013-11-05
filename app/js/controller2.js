var init = function(){
	'use strict';

	/* Controller 2 */

	angular._async.controller('MyCtrl2', ['MyService', function(MyService) {
			console.log('controller2');
			console.log(MyService);
		}])

	angular._async.service('MyService', [function() {
		this.awesome = true;
	}])

	console.log(angular.module('myApp.controllers'));
}