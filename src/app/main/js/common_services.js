'use strict';

var kdmServices = angular.module('kdm.common.services', ['restangular']);
kdmServices.constant('version', '0.0.1');


kdmServices.factory('kdmConfigServices', [
    '$rootScope',
    'Restangular',
    // '$q',

    function($rootScope, Restangular) {
        var eventos = {
            backendServerURLAtualizado: 'evtkdmBackendServerURLAtualizado'
        };

    	
    	var backEndServerURL = 'http://localhost:3030/';
        // backEndServerURL = 'http://192.168.1.246:3030/';
        backEndServerURL = 'http://infocedi.camara.leg.br/kdapi/';

    	
    	var setBackendServerURL = function(url) {
    		backEndServerURL = url;
            $rootScope.$broadcast(eventos.backendServerURLAtualizado, backEndServerURL);
    		Restangular.setBaseUrl(backEndServerURL);
    	};

    	var getBackendServerURL = function() {
    		return backEndServerURL;
    	};

        // config.constant('CONFIG', {
        //   BackendBaseUrl: 'http://localhost:3030/',
        //   BuildVersion:'<!--BuildVersion-->'
        // });


        return {
            setBackendServerURL: setBackendServerURL,
            getBackendServerURL: getBackendServerURL,
            eventos: eventos
        };

    }
]);

kdmServices.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();
      if (!navigator || !navigator.camera) {
        q.resolve('Nao temos camera');
        return q.promise;
      }
      console.log('chamei o servico camera getPicture');
      console.log('Objeto navigator: ' + navigator);
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        console.log('Vou resolver a promessa');
        q.resolve(result);
      }, function(err) {
        console.log('Vou rejeitar a promessa');
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
