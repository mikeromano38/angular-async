var init = function(){
	'use strict';

	/* Controller 2 */

	angular.module('asyncAngular').controller('MyCtrl2', [function() {
			console.log('controller2');
		}])

	console.log(angular.module('myApp.controllers'));
}