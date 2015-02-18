'use strict';
var dependencies = [
  'templates',
  'ionic',
  'ui.router',
  'restangular',
  'zhm.config',
  'zhm.main.states', 
  
  
];

var zhm = angular.module('zhm', dependencies);


//RESTANGULAR initialization.
zhm.config(['RestangularProvider', 'CONFIG', function (RestangularProvider, CONFIG) {
  RestangularProvider.setBaseUrl(CONFIG.BackendBaseUrl);
}]);

//HTTP init
zhm.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
}]);

zhm.run(function($ionicPlatform) {
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
})