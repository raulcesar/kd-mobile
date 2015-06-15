/**
 * Created by raul on 29/04/14.
 */
'use strict';
var mainStates = angular.module('kdm.main.states', [
    'ui.router',
    'kdm.poctec.controllers',
    'kdm.famous.controllers',
    // 'kdm.foundation.controllers',
    

    'kdm.config.controllers',
    'kdm.pessoa.controllers',
    'kdm.tarefas.controllers',
    'kdm.agenda.controllers',
    'kdm.pokerplan.controllers',

    // 'kdm.common.services',
    // 'ionic'
]);

mainStates.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // $urlRouterProvider.otherwise('/app/playlists');
        $urlRouterProvider.otherwise('/kdm/mtarefas');



        $stateProvider
        .state('kdmpoctecs', {
            url: '/kdmpoctecs',
            templateUrl: 'main/views/state_main.html',
            data: {
                moduleName: 'Main'
            },
            controller: 'poctecCtrl'
        })

        .state('famous', {
            url: '/famous',
            templateUrl: 'main/views/famous.html',
            data: {
                moduleName: 'Famous'
            },
            controller: 'famousCtrl'
        })

        // .state('foundation', {
        //     url: '/foundation',
        //     templateUrl: 'main/views/foundation.html',
        //     data: {
        //         moduleName: 'Foundation'
        //     },
        //     controller: 'foundationCtrl'
        // })


        .state('kdm', {

            url: '/kdm',
            abstract: true,
            templateUrl: 'main/views/kdmmenu.html'

        })

        .state('kdm.config', {

            url: '/config',
            views: {
                'menuContent': {
                    templateUrl: 'main/views/kdmconfig.html',
                    controller: 'kdmConfigCtrl'
                }
            }
        })

        .state('kdm.mtarefas', {

            url: '/mtarefas',
            views: {
                'menuContent': {
                    templateUrl: 'main/views/kdmminhastarefas.html',
                    controller: 'tarefasCtrl'
                }
            }
        })

        .state('kdm.pessoas', {

            url: '/pessoas',
            views: {
                'menuContent': {
                    templateUrl: 'main/views/kdmpessoas.html',
                    controller: 'PessoasCtrl'
                }
            }
        })


        .state('kdm.pessoadetail', {
            url: '/pessoas/:pessoaid',
            views: {
                'menuContent': {
                    templateUrl: 'main/views/pessoaDetail.html',
                    controller: 'PessoaDetailCtrl'
                }
            }
        })

        .state('kdm.agenda', {
            url: '/agenda',
            views: {
                'menuContent': {
                    templateUrl: 'main/views/kdmagenda.html',
                    controller: 'kdmAgendaCtrl'
                }
            }
        })

        .state('kdm.pokerplansessions',{
            url: '/pokerplansessions',
            views: {
                'menuContent': {
                    templateUrl: 'main/views/kdmpokerplansessions.html',
                    controller: 'kdmPokerPlanSessionsCtrl'
                }
            }
        })

        .state('kdm.pokerplan',{
            url: '/pokerplan',
            views: {
                'menuContent': {
                    templateUrl: 'main/views/kdmpokerplan.html',
                    controller: 'kdmPokerPlanCtrl'
                }
            }
        });
    }
]);
