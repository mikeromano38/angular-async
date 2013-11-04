# async-angular — a module for asynchronous loading of angular components

This is build on top of the awesome module loader: helios kernel https://github.com/asvd/helios-kernel

Just load helios, angular and async-angular

    <script src="lib/helios-kernel/kernel.js"></script>
    <script src="lib/angular/angular.js"></script>
    <script src="js/asyncAngular.js"></script>

Initialise your app by pointing to your main module file

    <script>
        window.onload = function(){
            kernel.require('./js/app.js');
        }
    </script>
