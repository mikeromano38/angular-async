var init = function(){
	'use strict';

	/* Controller 1 */

	angular.module('myApp.controllers', []).
		controller('MyCtrl1', [function() {
			console.log('controller1')
		}])

	console.log(angular.module('myApp.controllers'));
}