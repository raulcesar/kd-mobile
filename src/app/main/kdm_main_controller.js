//This is the controller for the "main module" of the appliation.
//In a complex application, each module gets its own folder.
'use strict';
var kdmCtrl = angular.module('kdm.main.controllers', [
    'kdm',
    'kdm.common.services',
    'kd.pessoas.reposervices'
]);

kdmCtrl.controller('kdmCtrl', ['$scope','kdmConfigServices',
    function($scope,kdmConfigServices) {


        $scope.config = {
            urlServidor: kdmConfigServices.getBackendServerURL()
        };
        $scope.aplicarConfig = function() {
            kdmConfigServices.setBackendServerURL($scope.config.urlServidor);
            console.log('a fazer');
        };

       
       
    }
]);

kdmCtrl.controller('PessoasCtrl', [
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
]);

kdmCtrl.controller('PessoaDetailCtrl', [
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
        };

        buscaPessoa($stateParams.pessoaid);


    }
]);



// .controller('PlaylistCtrl', function($scope, $stateParams) {});