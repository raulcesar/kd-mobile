//This is the controller for the "main module" of the appliation.
//In a complex application, each module gets its own folder.
'use strict';
var main = angular.module('kdm.main.controllers', []);

main.controller('mainCtrl', ['$scope',
    function($scope) {



        $scope.user = {
            'name': 'raul',
            'email': 'raul.teixeira@gmail.com'
        };

        console.log('Entered main controller');



    }
]);