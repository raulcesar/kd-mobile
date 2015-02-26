'use strict';
angular.module('kdm.agenda.controllers', [
    'kdm.common.services'
])

.controller('kdmAgendaCtrl', ['$scope', 'Browser',
    function($scope, Browser) {
        $scope.openWebPage = function() {
        	console.log('Vou tentar fazer o openURL');
        	
            Browser.openURL()
            .then(function(ret) {
            	console.log('Dentro do resolve da promessa do browser service: ' + ret);
            }, function(error) {
            	console.log('Dentro do reject da promessa do browser service: ' + error);
            }

            );


        };
    }
]);
