//This is the controller for the "main module" of the appliation.
//In a complex application, each module gets its own folder.
'use strict';
angular.module('kdm.poctec.controllers', [
    'ionic',
    'ui.router',
    'kdm',
    'kdm.common.services',
    'kd.pessoas.reposervices'
])

.controller('poctecCtrl', ['$scope', '$ionicLoading',
    function($scope, $ionicLoading) {
        $scope.cancel = function() {
            $ionicLoading.hide();
        };
    }
]);




