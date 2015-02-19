'use strict';
var kdTarefasCtrl = angular.module('kdm.tarefas.controllers', [
	'ionic', 
    'kdm',
    'kdm.common.services',
    'kd.pessoas.reposervices'
]);

kdTarefasCtrl.controller('tarefasCtrl', ['$scope', 'pessoaResourceService', '$ionicLoading',
    function($scope, pessoaResourceService, $ionicLoading) {

        //Mostra "spinnier"
        $ionicLoading.show({
            template: 'Aguarde...'
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
                $ionicLoading.hide();
            }, function(error) {
                console.error(error);
            });
            return promise;
        };

        $scope.buscaTarefas();
    }
]);
