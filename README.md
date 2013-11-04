# async-angular — a module for asynchronous loading of angular components

This is build on top of the awesome module loader: helios kernel https://github.com/asvd/helios-kernel

Just load helios, angular, angular-route, and async-angular

    <script src="lib/helios-kernel/kernel.js"></script>
    <script src="lib/angular/angular.js"></script>
    <script src="lib/angular/angular-route.js"></script>
    <script src="js/asyncAngular.js"></script>

Initialise your app by pointing to your main module file

    <script>
        window.onload = function(){
            kernel.require('./js/app.js');
        }
    </script>

Your app file should be set up like this:

    /*
        This should look familiar. Just include any files you need to run the code in the init function.
    */
    include('./filters.js');
    include('./services.js');
    include('./directives.js');
    include('./controllers.js');

    /*
        The init function is fired when all dependencies are loaded
    */
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

    			/*
    			    Here is some magic. You can use the resolve method on the route definition and pass it async-angular's async service
    			*/
    			$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', resolve: { deps: ['async', function(async){

                    /*
                        Fetch returns a promise. Just return that promise from the resolve method and angular will wait to instantiate MyCtrl2 until the dependency resolves.
                    */
    				return async.fetch('./js/controller2.js', function(){
    					console.log('loaded controller 2');
    				});

    			}]}, controller: 'MyCtrl2'});

    			$routeProvider.otherwise({redirectTo: '/view1'});
    		}]);

    	angular.bootstrap(window.document, ['myApp']);
    }

Your controller2.js file would look like this.

    /*
        Again, we wrap it in an init because that's how Helios does it.
    */
    var init = function(){
    	'use strict';

    	/*
    	    We're going to get the asyncAngular module here and call the controller method to create a controller at runtime. We have to do this because
    	    only the asyncAngular module has references to the various angular providers, outside of the config block. The asyncAngular module also has
    	    directive, provider, service, factory, and filter methods. It also has a reference to routeProvider.
    	 */

    	angular.module('asyncAngular').controller('MyCtrl2', [function() {
    			console.log('controller2');
    		}])
    }