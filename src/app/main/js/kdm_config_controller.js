'use strict';
angular.module('kdm.config.controllers', [
    'ui.router',
    'kdm.common.services'
])

.controller('kdmConfigCtrl', ['$rootScope', '$scope', 'kdmConfigServices', '$state',

    function($rootScope, $scope, kdmConfigServices) {

        function refreshConfig() {
            $scope.config = {
                urlServidor: kdmConfigServices.getBackendServerURL()
            };

        }

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState.name === 'kdm.config') {
                refreshConfig();
            }
        });
        refreshConfig();

       


        // $scope.config = {
        //     urlServidor: kdmConfigServices.getBackendServerURL()
        // };
        $scope.aplicarConfig = function() {
            kdmConfigServices.setBackendServerURL($scope.config.urlServidor);
            console.log('a fazer');
        };
    }
]);

