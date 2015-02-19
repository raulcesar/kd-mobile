var config = angular.module('kdm.config', []);

config.constant('CONFIG', {
  BackendBaseUrl: 'http://localhost:3030/',
  BuildVersion:'Rauls-MacBook-Pro.local-UTC-2015-02-19_19:20:32'
});


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
'use strict';

angular.module('kdm.common.directives', [])
  .constant('version', '0.0.1');

'use strict';

angular.module('kdm.common.filters', [])
  .constant('version', '0.0.1');

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

//This is the controller for the "main module" of the appliation.
//In a complex application, each module gets its own folder.
'use strict';
var famousCtrl = angular.module('kdm.famous.controllers', [
	'famous.angular'
	]);

famousCtrl.controller('famousCtrl', ['$scope',
    function($scope) {



        $scope.user = {
            'name': 'raul',
            'email': 'raul.teixeira@gmail.com'
        };
        console.log('Entered famous_controller');




    }
]);
//This is the controller for the "main module" of the appliation.
//In a complex application, each module gets its own folder.
'use strict';
var foundationCtrl = angular.module('kdm.foundation.controllers', ['mm.foundation']);

foundationCtrl.controller('foundationCtrl', ['$scope',
    function($scope) {



        $scope.user = {
            'name': 'raul',
            'email': 'raul.teixeira@gmail.com'
        };

        console.log('Entered foundation controller');




    }
]);
/**
 * Created by raul on 18/02/2015
 */
'use strict';

var kdPessoasRepoServices = angular.module('kd.pessoas.reposervices', ['restangular']);
    

var resourceResumoPessoas = 'resumopessoas';
var resourcePessoaCompleta = 'pessoa';
var resourceTipoEscolaridade = 'pessoatipoescolaridade';
var resourceCargos = 'pessoacargo';
var resourceSituacoes = 'pessoasituacao';
var resourceAtribuicoes = 'pessoaatribuicao';
var resourceFuncaoChefia = 'funcaochefia';
var resourceCargoAtribuicao = 'cargoatribuicao';
var resourcePessoaHistoricoLotacao = 'historicolotacao';
var resourcePessoaHistoricoFormacao = 'historicoformacao';
var resourceInstituicaoEnsino = 'instituicaoensino';
var resourceCursoFormacao = 'cursoformacao';

var resourcePessoaEndereco = 'endereco';
var resourceTarefas = 'tarefas';

kdPessoasRepoServices.constant('version', '0.0.1');

kdPessoasRepoServices.config(['RestangularProvider',
    function(RestangularProvider) {

        //  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        //    var extractedData = data;
        //    if (operation === "getList") {
        //      extractedData = pessoaTran`sformFunction(data)
        //    }
        //
        //    return extractedData;
        //
        //  });

        RestangularProvider.addElementTransformer(
            resourceResumoPessoas,
            false,
            function(element) {
                element.nomePonto = function() {
                    var ponto = (element.ponto) ? ' (' + element.ponto + ')' : '';
                    return element.nome + ponto;
                };

                element.resumoCargo = function() {
                    return (element.cargoAtribuicao && element.cargoAtribuicao.cargo) ? element.cargoAtribuicao.cargo : '';
                };

                element.resumoAtribuicao = function() {
                    return (element.cargoAtribuicao && element.cargoAtribuicao.atribuicao) ? element.cargoAtribuicao.atribuicao : '';
                };

                element.resumoFuncao = function() {
                    return (element.funcaoChefia) ? element.funcaoChefia.descFuncao : '';
                };



                return element;
            });

        RestangularProvider.addElementTransformer(
            resourceFuncaoChefia,
            false,
            function(element) {
                element.descComCodigo = element.funcaoCadastro.fc + ' - ' + element.funcaoCadastro.funcao + ' ( ' + element.funcaoCadastro.codfuncao + ' )';

                return element;
            });

        RestangularProvider.addElementTransformer(
            resourceCargoAtribuicao,
            false,
            function(element) {
                element.descricao = element.cargo.descricao + '/' + element.atribuicao.descricao;
                return element;
            });

    }
]);



kdPessoasRepoServices.factory('pessoaResourceService', [
    '$rootScope',
    'Restangular',
    '$q',
    function($rootScope, Restangular, $q) {


        var fotoFixCacheSufix = '?decache=' + Math.random();

        var getFotoUrl = function(BackendBaseUrl, idPessoa) {
            var fotoPrefix = BackendBaseUrl + 'pessoa/';
            var fotoSuffix = '/foto/1';
            return fotoPrefix + idPessoa + fotoSuffix + fotoFixCacheSufix;
        };


        var getSituacoes = function() {
            var restObject = Restangular.all(resourceSituacoes);
            return restObject.getList();
        };

        var getAtribuicoes = function() {
            var restObject = Restangular.all(resourceAtribuicoes);
            return restObject.getList();
        };


        var getFuncoesChefia = function() {
            var restObject = Restangular.all(resourceFuncaoChefia);
            return restObject.getList();
        };

        var getCargosAtribuicoes = function() {
            var restObject = Restangular.all(resourceCargoAtribuicao);
            return restObject.getList();
        };

        var getResumoPessoas = function(pesquisa) {
            var pessoaRest = Restangular.all(resourceResumoPessoas);
            pesquisa = pesquisa || {};
            var objFiltro = {};

            console.log('termoPesquisa: ' + pesquisa.termoPesquisa + ' setor: ' + JSON.stringify(pesquisa.setor));
            if (pesquisa.termoPesquisa) {
                objFiltro.termoPesquisa = pesquisa.termoPesquisa;
            }

            if (pesquisa.setores) {
                objFiltro.idSetor = pesquisa.setores;
            }

            if (pesquisa.situacoes) {
                objFiltro.idSituacao = pesquisa.situacoes;
            }

            if (pesquisa.grupos) {
                objFiltro.codigoGrupo = pesquisa.grupos;
            }


            if (pesquisa.periodoIni && pesquisa.periodoFim) {

                for (var i = pesquisa.periodos.length - 1; i >= 0; i--) {

                    var codigoPeriodo = pesquisa.periodos[i];
                    if (codigoPeriodo === 'ANIVERSARIO') {
                        objFiltro.periodoAniIni = pesquisa.periodoIni;
                        objFiltro.periodoAniFim = pesquisa.periodoFim;
                    }

                    if (codigoPeriodo === 'CEDIINI') {
                        objFiltro.periodoEntrouCediIni = pesquisa.periodoIni;
                        objFiltro.periodoEntrouCediFim = pesquisa.periodoFim;
                    }

                    if (codigoPeriodo === 'CEDIFIM') {
                        objFiltro.periodoSaiuCediIni = pesquisa.periodoIni;
                        objFiltro.periodoSaiuCediFim = pesquisa.periodoFim;
                    }

                }
            }

            console.log('objeFiltro: ' + JSON.stringify(objFiltro));

            if (_.isEmpty(objFiltro)) {
                return pessoaRest.getList();
            } else {
                return pessoaRest.getList(objFiltro);

            }
        };

        var getTiposEscolaridades = function() {
            return Restangular.all(resourceTipoEscolaridade).getList();
        };

        var getInstituicoesEnsino = function() {
            return Restangular.all(resourceInstituicaoEnsino).getList();
        };

        var getCursosFormacao = function() {
            return Restangular.all(resourceCursoFormacao).getList();
        };

        var salvarCursoFormacao = function(cursoFormacao) {
            if (_.isUndefined(cursoFormacao)) {
                throw new Error('um objeto cursoFormacao e obrigatorio para salvarCursoFormacao.');
            }

            if (Restangular.configuration.isRestangularized(cursoFormacao)) {
                return cursoFormacao.save();
            }

            return Restangular.all(resourceCursoFormacao).post(cursoFormacao);
        };


        var getCargos = function() {
            return Restangular.all(resourceCargos).getList();
        };

        var excluiPessoa = function(idPessoa) {
            if (_.isUndefined(idPessoa)) {
                throw new Error('idPessoa obrigatorio ao executar excluiPessoa');
            }
            return Restangular.one(resourcePessoaCompleta, idPessoa).remove();
        };

        var getPessoa = function(idPessoa) {
            if (_.isUndefined(idPessoa)) {
                throw new Error('idPessoa obrigatorio para petPessoa');
            }
            return Restangular.one(resourcePessoaCompleta, idPessoa).get();
        };

        var salvarPessoa = function(pessoa) {
            if (_.isUndefined(pessoa)) {
                throw new Error('um objeto pessoa e obrigatorio para salvarPessoa.');
            }

            if (Restangular.configuration.isRestangularized(pessoa)) {
                return pessoa.save();
            } else {
                var basePessoa = Restangular.all(resourcePessoaCompleta);
                return basePessoa.post(pessoa);
            }


        };

        var getHistoricoLotacoesPessoa = function(idPessoa) {
            return Restangular.one(resourcePessoaCompleta, idPessoa).all(resourcePessoaHistoricoLotacao).getList();
        };


        var salvarHistoricoLotacoesPessoa = function(historicoLotacao) {
            if (_.isUndefined(historicoLotacao)) {
                throw new Error('um objeto historicoLotacao e obrigatorio para salvarHistoricoLotacoesPessoa.');
            }
            if (!historicoLotacao.pessoa || !historicoLotacao.pessoa.id || historicoLotacao.pessoa.id === 0) {
                throw new Error('um objeto historicoLotacao tem que ter uma pessoa (com id valido) associada.');
            }



            if (Restangular.configuration.isRestangularized(historicoLotacao)) {
                return historicoLotacao.save();
            } else {
                // var basePessoa = Restangular.one(resourcePessoaCompleta, 1404);
                // basePessoa.all(resourcePessoaHistoricoLotacao).post(historicoLotacao);
                var baseHistoricoLotacao = Restangular.one(resourcePessoaCompleta, historicoLotacao.pessoa.id).all(resourcePessoaHistoricoLotacao);
                // // var baseHistoricoLotacao = Restangular.all(resourcePessoaHistoricoLotacao);
                return baseHistoricoLotacao.post(historicoLotacao);
            }
        };


        var getEnderecosPessoa = function(idPessoa) {
            return Restangular.one(resourcePessoaCompleta, idPessoa).all(resourcePessoaEndereco).getList();
        };


        var salvarEnderecoPessoa = function(endereco) {
            if (_.isUndefined(endereco)) {
                throw new Error('um objeto endereco e obrigatorio para salvarEnderecoPessoa.');
            }
            if (!endereco.pessoa || !endereco.pessoa.id || endereco.pessoa.id === 0) {
                throw new Error('um objeto endereco tem que ter uma pessoa (com id valido) associada.');
            }



            if (Restangular.configuration.isRestangularized(endereco)) {
                return endereco.save();
            } else {
                // var basePessoa = Restangular.one(resourcePessoaCompleta, 1404);
                // basePessoa.all(resourcePessoaHistoricoLotacao).post(historicoLotacao);
                var baseHistoricoLotacao = Restangular.one(resourcePessoaCompleta, endereco.pessoa.id).all(resourcePessoaEndereco);
                // // var baseHistoricoLotacao = Restangular.all(resourcePessoaHistoricoLotacao);
                return baseHistoricoLotacao.post(endereco);
            }
        };

        var getTarefasPessoa = function(idPessoa) {
            return Restangular.all(resourceTarefas).getList({Responsavel: idPessoa});
        };

        var getHistoricoFormacaoPessoa = function(idPessoa) {
            return Restangular.one(resourcePessoaCompleta, idPessoa).all(resourcePessoaHistoricoFormacao).getList();
        };

        var salvarHistoricoFormacaoPessoa = function(historicoFormacao) {
            if (_.isUndefined(historicoFormacao)) {
                throw new Error('um objeto historicoFormacao e obrigatorio para salvarHistoricoFormacaoPessoa.');
            }
            if (!historicoFormacao.pessoa || !historicoFormacao.pessoa.id || historicoFormacao.pessoa.id === 0) {
                throw new Error('um objeto historicoFormacao tem que ter uma pessoa (com id valido) associada.');
            }


            //Tratar dependencias
            //Cada dependencia será tratada por uma "promessa".
            //Caso a dependencia já exista, a promessa é criada aqui meramente proforma e já é "resolvida" imediatamente.
            //Caso a dependencia NÃO exista, a promessa é o retorno do salvamento dela, que por utilizar o Restangular, já é uma promessa.
            var promessaCursoFormacao;
            //Primeiro verifica dependencias:

            if (historicoFormacao.cursoFormacao && !historicoFormacao.cursoFormacao.id) {
                //Curso ainda NÃO existe, portanto a promessa da dependencia CURSO vai ser o retoro do "salvarCursoFormacao"
                promessaCursoFormacao = salvarCursoFormacao(historicoFormacao.cursoFormacao);
            } else {
                //Curso JÁ existe, portanto a promessa da dependencia CURSO vai ser criada aqui e já resolvida como sendo o PRÓPRIO objeto cursoFormacao
                var deferred = $q.defer();
                promessaCursoFormacao = deferred.promise;
                deferred.resolve(historicoFormacao.cursoFormacao);
            }

            return promessaCursoFormacao.then(function(data) {
                //Com a resolução desta promessa, eu seto o ID do objeto "cursoFormacao".
                historicoFormacao.cursoFormacao.id = data.id;

                //Como esta é a última promessa de dependencia, agora parto para o salvamento do historico em si.
                if (Restangular.configuration.isRestangularized(historicoFormacao)) {
                    return historicoFormacao.save();
                } else {
                    var baseHistoricoFormacao = Restangular.one(resourcePessoaCompleta, historicoFormacao.pessoa.id).all(resourcePessoaHistoricoFormacao);
                    return baseHistoricoFormacao.post(historicoFormacao);
                }


            }, function(err) {
                console.log('erro ao salvar historico de formacao: ' + err);
            });

        };


        //return API


        return {
            getResumoPessoas: getResumoPessoas,
            excluiPessoa: excluiPessoa,
            getPessoa: getPessoa,
            salvarPessoa: salvarPessoa,
            getTiposEscolaridades: getTiposEscolaridades,
            getCargos: getCargos,
            getSituacoes: getSituacoes,
            getAtribuicoes: getAtribuicoes,
            getFuncoesChefia: getFuncoesChefia,
            getCargosAtribuicoes: getCargosAtribuicoes,
            getInstituicoesEnsino: getInstituicoesEnsino,
            getCursosFormacao: getCursosFormacao,
            salvarCursoFormacao: salvarCursoFormacao,
            getHistoricoLotacoesPessoa: getHistoricoLotacoesPessoa,
            salvarHistoricoLotacoesPessoa: salvarHistoricoLotacoesPessoa,
            getHistoricoFormacaoPessoa: getHistoricoFormacaoPessoa,
            salvarHistoricoFormacaoPessoa: salvarHistoricoFormacaoPessoa,
            getEnderecosPessoa: getEnderecosPessoa,
            salvarEnderecoPessoa: salvarEnderecoPessoa,
            getFotoUrl: getFotoUrl,

            getTarefasPessoa:getTarefasPessoa

        };
    }
]);

'use strict';
angular.module('kdm.agenda.controllers', [
])

.controller('kdmAgendaCtrl', ['$scope', 

    function($scope) {

    }
]);


'use strict';
angular.module('kdm.config.controllers', [
    'ui.router',
    'kdm.common.services'
])

.controller('kdmConfigCtrl', ['$rootScope', '$scope', 'kdmConfigServices', '$state',

    function($rootScope, $scope, kdmConfigServices) {

        function refreshConfig() {
            $scope.config = {
                urlServidor: kdmConfigServices.getBackendServerURL()
            };

        }

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState.name === 'kdm.config') {
                refreshConfig();
            }
        });
        refreshConfig();

       


        // $scope.config = {
        //     urlServidor: kdmConfigServices.getBackendServerURL()
        // };
        $scope.aplicarConfig = function() {
            kdmConfigServices.setBackendServerURL($scope.config.urlServidor);
            console.log('a fazer');
        };
    }
]);


'use strict';

angular.module('kdm.pessoa.controllers', [
    'ionic',
    'ui.router',
    'kdm',
    'kdm.common.services',
    'kd.pessoas.reposervices'
])


.controller('PessoasCtrl', [
    '$scope',
    'kdmConfigServices',
    'pessoaResourceService',
    function($scope, kdmConfigServices, pessoaResourceService) {
        $scope.minhasTarefas = [];


        $scope.fotoUrl = function(idPessoa) {
            return pessoaResourceService.getFotoUrl(kdmConfigServices.getBackendServerURL(), idPessoa);
        };

        $scope.pesquisaPessoa = function() {
            console.log('teste');

        };
        $scope.pesquisa = {};

        $scope.pesquisaPessoa = function() {
            // $scope.marcadosExcluidos = 0;
            // pessoaCadastroService.ativaPessoa();
            if (_.isEmpty($scope.pesquisa.termoPesquisa)) {
                //Alerta alguma coisa.
                $scope.resultadoResumoPessoas = [];
                return;
            }



            // A funcao getPessoas do servico retorna uma 'promessa'.
            // Eu então chamo o 'then' que vincula as funcoes de sucesso e erro à finalizacao desta 'promessa'.
            // Resumo: as funcoes serão executadas quando a promessa for resolvida.
            var promise = pessoaResourceService.getResumoPessoas($scope.pesquisa);
            promise.then(function(data) {
                console.log('dentro do pesquisaPessoa');
                //Monta resultado com indice
                // $scope.indicePorId = kdUtils.buildIndex(data, 'id', '$index');
                $scope.resultadoResumoPessoas = data;
                // var toggleAnimatable = function() {
                //     $scope.animatable = 'animate-repeat';
                // };

                // $timeout(toggleAnimatable, 0.3);
            }, function(error) {
                console.error(error);
            });
            return promise;
        };





    }
])

.controller('PessoaDetailCtrl', [
    '$scope',
    '$stateParams',
    '$ionicLoading',
    'kdmConfigServices',
    'pessoaResourceService',
    function($scope, $stateParams, $ionicLoading, kdmConfigServices, pessoaResourceService) {
        $scope.hello = 'hello';
        console.log('entrei');
        $scope.pessoaid = $stateParams.pessoaid;
        $scope.pessoaCompleta = {};

        //Mostra "spinnier"
        $ionicLoading.show({
            template: 'Aguarde...'
        });

        //Seta URL da foto.
        $scope.fotoUrl = pessoaResourceService.getFotoUrl(kdmConfigServices.getBackendServerURL(), $stateParams.pessoaid);



        //TODO: Avaliar o que é melhor... buscar aqui dentro ou carregar na lista e so passar o estado quando trouxer a pessoa.
        function buscaPessoa(idPessoa) {
            var promise = pessoaResourceService.getPessoa(idPessoa);
            promise.then(function(pessoaCompleta) {
                $scope.pessoaCompleta = pessoaCompleta;
                $ionicLoading.hide();
            }, function(error) {
                var msg = 'ocorreu erro ao tentar buscar detalhes de pessoa: ' + error;
                console.log(msg);
                throw new Error(msg);
            });
            return promise;
        }

        buscaPessoa($stateParams.pessoaid);


    }
]);

//This is the controller for the "main module" of the appliation.
//In a complex application, each module gets its own folder.
'use strict';
angular.module('kdm.poctec.controllers', [
    'ionic',
    'ui.router',
    'kdm',
    'kdm.common.services',
    'kd.pessoas.reposervices'
])

.controller('poctecCtrl', ['$scope', '$ionicLoading',
    function($scope, $ionicLoading) {
        $scope.cancel = function() {
            $ionicLoading.hide();
        };
    }
]);





'use strict';
var kdTarefasCtrl = angular.module('kdm.tarefas.controllers', [
	'ionic', 
    'kdm',
    'kdm.common.services',
    'kd.pessoas.reposervices'
]);

kdTarefasCtrl.controller('tarefasCtrl', ['$scope', 'pessoaResourceService', '$ionicLoading', 'kdmConfigServices', 
    function($scope, pessoaResourceService, $ionicLoading, kdmConfigServices) {

        //Mostra "spinnier"
        $ionicLoading.show({
            template: 'Aguarde...'
            // templateUrl: 'main/views/loading.html'
        });

        $scope.buscaTarefas = function() {
            // $scope.marcadosExcluidos = 0;
            // pessoaCadastroService.ativaPessoa();
            // if (_.isEmpty($scope.pesquisa.termoPesquisa)) {
            //     //Alerta alguma coisa.
            //     $scope.resultadoResumoPessoas = [];
            //     return;
            // }

            

            // A funcao getPessoas do servico retorna uma 'promessa'.
            // Eu então chamo o 'then' que vincula as funcoes de sucesso e erro à finalizacao desta 'promessa'.
            // Resumo: as funcoes serão executadas quando a promessa for resolvida.
            var promise = pessoaResourceService.getTarefasPessoa(6486);
            promise.then(function(data) {
                console.log('dentro do pesquisaPessoa');
                //Monta resultado com indice
                // $scope.indicePorId = kdUtils.buildIndex(data, 'id', '$index');
                $scope.tarefas = data;
                $scope.error = undefined;
                $ionicLoading.hide();
            }, function(error) {
                console.error(error);
                console.error(error.headers());
                $ionicLoading.hide();
                $scope.error = 'Erro ao buscar tarefas. Servidor: ' + kdmConfigServices.getBackendServerURL();
            });
            return promise;
        };

        $scope.buscaTarefas();
    }
]);

/**
 * Created by raul on 29/04/14.
 */
'use strict';
var mainStates = angular.module('kdm.main.states', [
    'ui.router',
    'kdm.poctec.controllers',
    'kdm.famous.controllers',
    'kdm.foundation.controllers',
    

    'kdm.config.controllers',
    'kdm.pessoa.controllers',
    'kdm.tarefas.controllers',
    'kdm.agenda.controllers'
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

        .state('foundation', {
            url: '/foundation',
            templateUrl: 'main/views/foundation.html',
            data: {
                moduleName: 'Foundation'
            },
            controller: 'foundationCtrl'
        })


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
