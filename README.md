# async-angular — a module for asynchronous loading of angular components

This is build on top of the awesome module loader: helios kernel https://github.com/asvd/helios-kernel

Just load helios, angular, and async-angular

```html
<script src="lib/helios-kernel/kernel.js"></script>
<script src="lib/angular/angular.js"></script>
<script src="js/asyncAngular.js"></script>
```

Initialise your app by pointing to your main app module file

```html
<script>
    window.onload = function(){
        kernel.require('./js/app.js');
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
            'asyncAngular',
            'module1',
            'module2',
            'module3'
        ]);

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

If one of your asynchronous modules will create an angular component such as a controller, filter, service, factory, etc.
You must use the angular._async object to define and register it. Otherwise Angular will not be able to find it.

```javascript
var init = function(){

    //async controller
    angular._async.controller('MyAsyncController', ['$scope', function($scope){

    });

    //async filter
    angular._async.filter('MyAsyncController', [function(){

    });

    //async service
    angular._async.filter('MyAsyncController', [function(){

    });

    //async directive
    angular._async.directive('MyAsyncController', [function(){

    });

    //etc... You get the point :)

}
```
