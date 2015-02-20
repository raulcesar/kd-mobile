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
    '$timeout',
    '$stateParams',
    '$ionicLoading',
    'kdmConfigServices',
    'pessoaResourceService',
    'Camera',
    function($scope, $timeout, $stateParams, $ionicLoading, kdmConfigServices, pessoaResourceService, Camera) {
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


        $scope.atualizaFoto = function() {
            console.log('Getting camera');
            $ionicLoading.show({
                template: 'getting camera'
            });
            $timeout(function() {
                $ionicLoading.hide();
            }, 3000);
            Camera.getPicture().then(function(imageURI) {
                console.log('dentro do then do getPicture');
                $ionicLoading.show({
                    template: 'dentro do then do getPicture: ' + imageURI
                });
                $timeout(function() {
                    $ionicLoading.hide();
                }, 3000);
                console.log(imageURI);
            }, function(err) {
                $ionicLoading.show({
                    template: 'dentro do error do getPicture'
                });
                $timeout(function() {
                    $ionicLoading.hide();
                }, 3000);

                console.log('dentro do error do getPicture');
                console.err(err);
            });
        };

        //TODO: Avaliar o que é melhor... buscar aqui dentro ou carregar na lista e so passar o estado quando trouxer a pessoa.
        function buscaPessoa(idPessoa) {
            var promise = pessoaResourceService.getPessoa(idPessoa);
            promise.then(function(pessoaCompleta) {
                $scope.pessoaCompleta = pessoaCompleta;
                $ionicLoading.hide();
            }, function(error) {
                var msg = 'ocorreu erro ao tentar buscar detalhes de pessoa: ' + error;
                console.log(msg);
                $ionicLoading.hide();


            });
            return promise;
        }

        buscaPessoa($stateParams.pessoaid);


    }
]);
