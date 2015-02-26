'use strict';
angular.module('kdm.config.controllers', [
    'ui.router',
    'kdm.common.services',
    'LocalStorageModule'
])

.controller('kdmConfigCtrl', ['$rootScope', '$scope', 'kdmConfigServices', 'localStorageService',
    function($rootScope, $scope, kdmConfigServices, localStorageService) {
        $scope.serverList = localStorageService.get('serverlist', $scope.serverList);
        if(_.isEmpty($scope.serverList)){
            $scope.serverList = [];
        }
        
             
        

        $scope.deletaServidor = function(item){
            console.log(item.url);
            $scope.serverList.splice($scope.serverList.indexOf(item), 1);
        };

        $scope.adicionaServidor = function(){
            var achou = false;
            console.log($scope.config.urlServidor);
            for(var item in $scope.serverList){
                if(item.url === $scope.config.urlServidor){
                    achou = true;
                    break;
                }
            }
            if (!achou){
                var newItem = {url: $scope.config.urlServidor};
                $scope.serverList.push(newItem);
                localStorageService.set('serverlist', $scope.serverList);
            }

            kdmConfigServices.setBackendServerURL($scope.config.urlServidor);

        };

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
    }
]);

