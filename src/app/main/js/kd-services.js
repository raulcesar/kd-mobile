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
