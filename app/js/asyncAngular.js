angular.module( 'asyncAngular', [] );

angular.module( 'asyncAngular' ).config( ['$controllerProvider', '$compileProvider', '$routeProvider', '$filterProvider', '$provide', function( $controllerProvider, $compileProvider, $routeProvider, $filterProvider, $provide ){
	var mod = angular._async = angular.module( 'asyncAngular' );

	mod.controller = $controllerProvider.register;
	mod.directive    = $compileProvider.directive;
	mod.filter     = $filterProvider.register;
	mod.factory            = $provide.factory;
	mod.service            = $provide.service;
	mod.value            = $provide.value;
	mod.constant            = $provide.constant;
	mod.provider            = $provide.provider;

}]);

angular.module( 'asyncAngular' ).factory( 'async', ['$rootScope', '$q', function($rootScope, $q){

	var fetched = {};

	var fetch = function( file, success, failure ){
		var deferred = $q.defer();

		if ( !fetched[file] ){

			kernel.require(file, function(){

				$rootScope.$apply(function(){
					fetched[file] = true;
					deferred.resolve();
					if (success) success();
				});
			}, function(){
				$rootScope.$apply(function(){
					fetched[file] = false;
					deferred.reject();
					if (failure) failure();
				});
			});

		} else {
			deferred.resolve();
		}

		return deferred.promise;
	}

	return {
		fetch: fetch
	}
}]);