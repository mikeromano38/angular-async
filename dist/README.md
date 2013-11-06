# angular-async — a module for asynchronous loading of angular components

This is built on top of the awesome module loader: helios kernel https://github.com/asvd/helios-kernel

Just load angular, and angular-async

```html
<script src="lib/angular/angular.js"></script>
<script src="js/angular-async.js"></script>
```

Initialize your app by pointing to your main app module file:

```html
<script>

    //angularAsync.require is just a reference to Helios' kernel.require
    window.onload = function(){
        angularAsync.require('./js/app.js');
    }
</script>
```

Your app file should be set up something like this:

```javascript
/*
    This should look familiar. Just include any files you need to run the code in the init function.
*/
include('./module1.js');
include('./module2.js');
include('./module3.js');

/*
    The init function is fired when all dependencies are loaded
*/
var init = function(){

    var mod = angular.module('myApp', [
            'angularAsync',
            'module1',
            'module2',
            'module3'
        ]);

    //we must manually bootstrap the app here after all the dependencies have loaded
    angular.bootstrap(window.document, ['myApp']);
}
```

Per the Helios API any asynchronous modules need to have their execution code wrapped in an init function

```javascript
var init = function(){

    //your module code goes here

}
```

Your modules can have their own dependencies...

```javascript
include('./some-othermodule.js')

var init = function(){

    //your module code goes here

}
```

If one of your asynchronous modules will create an angular component (such as a controller, filter, service, factory, etc.),
and if that module will be loaded after the application bootstraps,
then you must use the angularAsync object to define and register it. Otherwise Angular will not be able to find it.

```javascript
var init = function(){

    //async controller
    angularAsync.controller('MyAsyncController', ['$scope', function($scope){

    });

    //async filter
    angularAsync.filter('myAsyncFilter', [function(){

    });

    //async service
    angularAsync.service('MyAsyncService', [function(){

    });

    //async directive
    angularAsync.directive('MyAsyncController', [function(){

    });

    //etc... You get the point :)

    /* Methods Available

        - controller
        - directive
        - filter
        - factory
        - service
        - value
        - constant
        - provider

    */

}
```

angularAsync has a service called async that you can inject into your various components for dynamic loading of other components at runtime

```javascript

var myApp = angular.module('myApp', [])

myApp.controller('MyCtrl', ['$scope', 'async', function( $scope, async ){

    //use the fetch method to load a file dynamically
    var mod = async.fetch('./my-other-component.js');

    //This returns a promise with resolve and reject
    //the callbacks are fired within scope
    mod.then(function(){

        //successfully loaded, do something
    }, function(){

        //whoops something went wrong
    });

}]);
```

In this case my-other-component.js might look like this:

```javascript

var init = function(){

    //registering directive after bootstrap
    angularAsync.directive('myDirective', [function(){

        //directive code here
    }])
}
```

Finally, since the async.fetch method returns a promise, it works well with route resolution in angular
Let's say we have a basic app defined here:

```javascript

var myApp = angular.module('myApp', []);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/view1', {
        templateUrl: 'partials/partial1.html',
        controller: 'MyCtrl1'
    });

    //when we hit the second route, we want to load MyCtrl2 asynchronously
    //we can pass the async service to
    $routeProvider.when('/view2', {
        templateUrl: 'partials/partial2.html',
        resolve: {
            deps: ['async', function(async){

                //async.fetch returns a promise, so we can just return it from
                //this dependency and anguar will wait to instantiate the controller
                return async.fetch('./js/controller2.js');

            }]},

        //instantiate MyCtrl2 when full resolved
        controller: 'MyCtrl2'
    });

    $routeProvider.otherwise({redirectTo: '/view1'});
]);
```



