'use strict';
var dependencies = [
  'templates',
  'ionic',
  'ui.router',
  'restangular',
  'kdm.config',
  'kdm.common.services',
  'kdm.main.states', 
  
  
];

var kdm = angular.module('kdm', dependencies);


//RESTANGULAR initialization.
// kdm.config(['RestangularProvider', 'kdmConfigServices', function (RestangularProvider, kdmConfigServices) {
//   RestangularProvider.setBaseUrl(kdmConfigServices.getBackendServerURL());
// }]);

//HTTP init
kdm.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
}]);

kdm.run(['Restangular', 'kdmConfigServices', '$ionicPlatform', function(Restangular, kdmConfigServices, $ionicPlatform) {
  Restangular.setBaseUrl(kdmConfigServices.getBackendServerURL());


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}]);