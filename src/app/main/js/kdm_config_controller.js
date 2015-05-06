'use strict';
angular.module('kdm.config.controllers', [
    'ui.router',
    'kdm.common.services',
    'LocalStorageModule'
])

.controller('kdmConfigCtrl', ['$rootScope', '$scope', 'kdmConfigServices', 'localStorageService', '$http',
    function($rootScope, $scope, kdmConfigServices, localStorageService, $http) {
        $scope.serverList = localStorageService.get('serverlist');
        if(_.isEmpty($scope.serverList)){
            $scope.serverList = [];
        }
        
        //$scope.serverList = [];

        $scope.deletaServidor = function(item){
            $scope.serverList.splice($scope.serverList.indexOf(item), 1);
            localStorageService.set('serverlist', $scope.serverList);
        };

        $scope.adicionaServidor = function(){
            var achou = false;
            for(var i = 0; i < $scope.serverList.length; i++){
                var item = $scope.serverList[i];
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
            testaServidor();
        };

        function refreshConfig() {
            $scope.config = {
                urlServidor: kdmConfigServices.getBackendServerURL()
            };

        }

        function testaServidor(){
            console.log($scope.config.urlServidor);
            $http.get($scope.config.urlServidor).
              success(function(data) {
                if(data.activeConnections > 0){
                    console.log('sucesso');
                    $scope.icon = "ion-ios-checkmark-outline";
                }
                else{
                    $scope.icon = "ion-ios-close-outline";
                }
              }).
              error(function(data) {
                 $scope.icon = "ion-ios-close-outline";
              });
        }

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState.name === 'kdm.config') {
                refreshConfig();
            }
        });
        refreshConfig();

        $scope.setaServidor = function(servidor){
            $scope.config.urlServidor = servidor;
            testaServidor();
        };

        $scope.abrirBrowser = function(){
            var options = {
              location: 'yes',
              clearcache: 'yes',
              toolbar: 'no'
            };
            var ref = window.open('http://google.com', '_blank', options)
              .then(function(event) {
                ref.show();
              })
              .catch(function(event) {
                console.log('insuccess');
              });

        };


        // $scope.config = {
        //     urlServidor: kdmConfigServices.getBackendServerURL()
        // };
    }
]);

