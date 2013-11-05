var init = function(){
	'use strict';

	/* Controller 2 */

	angularAsync.controller('MyCtrl2', ['MyService', function(MyService) {
			console.log('controller2');
			console.log(MyService);
		}])

	angularAsync.service('MyService', [function() {
		this.awesome = true;
	}])

	console.log(angular.module('myApp.controllers'));
}