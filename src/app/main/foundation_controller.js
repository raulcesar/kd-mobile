//This is the controller for the "main module" of the appliation.
//In a complex application, each module gets its own folder.
'use strict';
var foundationCtrl = angular.module('zhm.foundation.controllers', ['mm.foundation']);

foundationCtrl.controller('foundationCtrl', ['$scope',
    function($scope) {



        $scope.user = {
            'name': 'raul',
            'email': 'raul.teixeira@gmail.com'
        };

        console.log('Entered foundation controller');




    }
]);