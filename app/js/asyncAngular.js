angular.module('asyncAngular', []);

angular.module('asyncAngular').config(['$controllerProvider', '$compileProvider', '$routeProvider', '$filterProvider', '$provide', function($controllerProvider, $compileProvider, $routeProvider, $filterProvider, $provide){
	var mod = angular.module('asyncAngular');

	mod.controller = $controllerProvider.register;
	mod.directive    = $compileProvider.directive;
	mod.routeProvider      = $routeProvider;
	mod.filter     = $filterProvider.register;
	mod.factory            = $provide.factory;
	mod.service            = $provide.service;
	mod.value            = $provide.value;
	mod.constant            = $provide.constant;
	mod.provider            = $provide.provider;
}]);

angular.module('asyncAngular').factory('async', ['$rootScope', '$q', function($rootScope, $q){

	var deferred = $q.defer();

	var fetch = function(file, success, failure){
		kernel.require(file, function(){

			$rootScope.$apply(function(){
				deferred.resolve();
				if (success) success();
			});
		}, function(){
			$rootScope.$apply(function(){
				deferred.reject();
				if (failure) failure();
			});
		});

		return deferred.promise;
	}

	return {
		fetch: fetch
	}
}]);