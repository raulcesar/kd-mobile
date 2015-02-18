//This is the controller for the "main module" of the appliation.
//In a complex application, each module gets its own folder.
'use strict';
var famousCtrl = angular.module('kdm.famous.controllers', [
	'famous.angular'
	]);

famousCtrl.controller('famousCtrl', ['$scope',
    function($scope) {



        $scope.user = {
            'name': 'raul',
            'email': 'raul.teixeira@gmail.com'
        };
        console.log('Entered famous_controller');




    }
]);