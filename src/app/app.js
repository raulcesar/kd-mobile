'use strict';
var dependencies = [
    'templates',
    'ionic',

    'restangular',
    'LocalStorageModule',
    // 'kdm.config',
    'kdm.common.services',
    'kdm.main.states',


];

var kdm = angular.module('kdm', dependencies);

kdm.config(function($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    });
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

kdm.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setStorageType('sessionStorage');
    localStorageServiceProvider
        .setPrefix('kdm');
});

kdm.run(['Restangular', 'kdmConfigServices', '$ionicPlatform', function(Restangular, kdmConfigServices, $ionicPlatform) {
    Restangular.setBaseUrl(kdmConfigServices.getBackendServerURL());
    Restangular.setDefaultHttpFields({timeout: 1000});

    $ionicPlatform.ready(function() {

        if (navigator.notification) { // Override default HTML alert with native dialog
          window.alert = function (message) {
              navigator.notification.alert(
                  message,    // message
                  null,       // callback
                  'KD-Mobile', // title
                  'OK'        // buttonName
              );
          };
        }

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        // window.open = cordova.InAppBrowser.open;


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
