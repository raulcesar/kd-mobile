'use strict';
var dependencies = [
    'templates',
    'ionic',

    'restangular',
    // 'kdm.config',
    'kdm.common.services',
    'kdm.main.states',


];

var kdm = angular.module('kdm', dependencies);

kdm.config(function($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    //RESTANGULAR initialization.
    // kdm.config(['RestangularProvider', 'kdmConfigServices', function (RestangularProvider, kdmConfigServices) {
    //   RestangularProvider.setBaseUrl(kdmConfigServices.getBackendServerURL());
    // }]);

//HTTP init
kdm.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.timeout = 100;

}]);

kdm.run(['Restangular', 'kdmConfigServices', '$ionicPlatform', function(Restangular, kdmConfigServices, $ionicPlatform) {
    Restangular.setBaseUrl(kdmConfigServices.getBackendServerURL());
    Restangular.setDefaultHttpFields({timeout: 1000});

    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }


        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        // if (window.StatusBar) {
        //     // org.apache.cordova.statusbar required
        //     StatusBar.styleDefault();
        // }
    });
}]);
