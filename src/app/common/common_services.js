'use strict';

var kdmServices = angular.module('kdm.common.services', ['restangular']);
kdmServices.constant('version', '0.0.1');


kdmServices.factory('kdmConfigServices', [
    // '$rootScope',
    'Restangular',
    // '$q',

    function(Restangular) {
    	
    	var backEndServerURL = 'http://localhost:3030/';
        // backEndServerURL = 'http://192.168.1.246:3030/';
        // backEndServerURL = 'http://infocedi.camara.leg.br/kdapi/';

    	
    	var setBackendServerURL = function(url) {
    		backEndServerURL = url;
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
            getBackendServerURL: getBackendServerURL
        };

    }
]);
