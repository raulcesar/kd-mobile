'use strict';
var dependencies = [
  'templates',
  'ionic',
  'ui.router',
  'restangular',
  'kdm.config',
  'kdm.main.states', 
  
  
];

var kdm = angular.module('kdm', dependencies);


//RESTANGULAR initialization.
kdm.config(['RestangularProvider', 'CONFIG', function (RestangularProvider, CONFIG) {
  RestangularProvider.setBaseUrl(CONFIG.BackendBaseUrl);
}]);

//HTTP init
kdm.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
}]);

kdm.run(['Restangular', 'CONFIG', '$ionicPlatform', function(Restangular, CONFIG, $ionicPlatform) {
  Restangular.setBaseUrl(CONFIG.BackendBaseUrl);


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