/**
 * Created by raul on 29/04/14.
 */
'use strict';
var mainStates = angular.module('kdm.main.states', [
    'kdm.main.controllers',
    'kdm.famous.controllers',
    'kdm.foundation.controllers',
    'ionic'
]);

mainStates.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // $urlRouterProvider.otherwise('/app/playlists');
        $urlRouterProvider.otherwise('/kdm/mtarefas');



        $stateProvider




        .state('kdmpoctecs', {
            url: '/kdmpoctecs',
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


        .state('kdm', {

            url: '/kdm',
            abstract: true,
            templateUrl: 'main/kdmmenu.html'
            // controller: 'kdmCtrl'

        })

        .state('kdm.config', {

            url: '/config',
            views: {
                'menuContent': {
                    templateUrl: 'main/kdmconfig.html',
                    controller: 'kdmCtrl'
                }
            }
        })

        .state('kdm.mtarefas', {

            url: '/mtarefas',
            views: {
                'menuContent': {
                    templateUrl: 'main/kdmminhastarefas.html',
                    controller: 'kdmCtrl'
                }
            }
        })

        .state('kdm.pessoas', {

            url: '/pessoas',
            views: {
                'menuContent': {
                    templateUrl: 'main/kdmpessoas.html',
                    controller: 'PessoasCtrl'
                }
            }
        })


        .state('kdm.pessoadetail', {
            url: '/pessoas/:pessoaid',
            views: {
                'menuContent': {
                    templateUrl: 'main/pessoaDetail.html',
                    controller: 'PessoaDetailCtrl'
                }
            }
        })

        .state('kdm.agenda', {
            url: '/agenda',
            views: {
                'menuContent': {
                    templateUrl: 'main/kdmagenda.html',
                    controller: 'kdmCtrl'
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
    }
]);