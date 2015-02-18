/**
 * Created by raul on 29/04/14.
 */
'use strict';
var mainStates = angular.module('zhm.main.states', [
    'zhm.main.controllers',
    'zhm.famous.controllers',
    'zhm.foundation.controllers',
    'zhm.ionic.controllers',
    'ionic'
]);

mainStates.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // $urlRouterProvider.otherwise('/app/playlists');
    $urlRouterProvider.otherwise('/ionic/mtarefas');



    $stateProvider

   


        .state('zhm', {
        url: '/zhm',
        templateUrl: 'main/state_main.html',
        data: {
            moduleName: 'Main'
        },
        controller: 'mainCtrl'
    })

    .state('famous', {
        url: '/famous',
        templateUrl: 'main/famous.html',
        data: {
            moduleName: 'Famous'
        },
        controller: 'famousCtrl'
    })

    .state('foundation', {
        url: '/foundation',
        templateUrl: 'main/foundation.html',
        data: {
            moduleName: 'Foundation'
        },
        controller: 'foundationCtrl'
    })

    // .state('ionic', {
    //     url: '/ionic',
    //     abstract: true,
    //     templateUrl: 'main/ionic.html',
    //     controller: 'ionicCtrl'
    // })

    .state('ionic', {

        url: '/ionic',
        abstract: true,
        templateUrl: 'main/ionicmenu.html',
        controller: 'ionicCtrl'

    })

    .state('ionic.mtarefas', {

        url: '/mtarefas',
        views: {
            'menuContent': {
                templateUrl: 'main/ionicminhastarefas.html',
                controller: 'ionicCtrl'
            }
        }
    })

    .state('ionic.pessoas', {

        url: '/pessoas',
        views: {
            'menuContent': {
                templateUrl: 'main/ionicpessoas.html',
                controller: 'ionicCtrl'
            }
        }
    })

    .state('ionic.agenda', {
            url: '/agenda',
            views: {
                'menuContent': {
                    templateUrl: 'main/ionicagenda.html',
                    controller: 'ionicCtrl'
                }
            }
        })

    // .state('app.single', {
    //     url: "/playlists/:playlistId",
    //     views: {
    //         'menuContent': {
    //             templateUrl: "templates/playlist.html",
    //             controller: 'PlaylistCtrl'
    //         }
    //     }


    ;
}]);
