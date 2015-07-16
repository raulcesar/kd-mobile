'use strict';

angular.module('kdm.pokerplan.services', [])

.factory('kdmSessionService', [
	'$q', 
	'$timeout',
	'$rootScope',

	function($q, $timeout, $rootScope){
		var eventoTodosJogaram = 'eventoTodosJogaram';
		var eventoRepetirEstimativa = 'eventoRepetirEstimativa';

		var tarefasEstimadas = [
			{
				'nome' : 'tarefa1',
				'jogadas' : [],
				'resultado' : 0
			},
			{
				'nome' : 'tarefa2',
				'jogadas' : [],
				'resultado' : 0
			},
			{
				'nome' : 'tarefa3',
				'jogadas' : [],
				'resultado' : 0
			}
		];
		var sessoes = [
				{
					'id' : 0,
					'projeto' : 'kd',
					'sprint' : 'Subir o KD para produção',
					'responsavel' : 'CEDI',
					'joined' : ['Raul', 'Alezina'],
					'master' : 'myname',
					'tarefas' : tarefasEstimadas
				},

				{
					'id' : 1,
					'projeto' : 'projeto1',
					'sprint' : 'Alguma coisa',
					'responsavel' : 'CENIN',
					'joined' : ['user1', 'user2'],
					'master' : 'user1',
					'tarefas' : tarefasEstimadas
				}
		];
		var idSessaoCorrente;
		var idTarefaEstimadaCorrente = 0;

		var getListaSessoes = function(){
			var deferred = $q.defer();

			$timeout(function() {
				deferred.resolve(sessoes);
			}, 0);

			return deferred.promise;
		};

		var inserirParticipante = function(name, session){
			var deferred = $q.defer();
			$timeout(function() {
				for(var i = 0; i < sessoes.length; i++){
					if(sessoes[i].id === session.id){
						sessoes[i].joined.push(name);
						idSessaoCorrente = session.id;
					}
				}
				deferred.resolve();
			}, 0);

			return deferred.promise;
		};

		var updateListaSessoes = function(list){
			var deferred = $q.defer();

			$timeout(function() {
				deferred.resolve(list);
			}, 0);

			return deferred.promise;
		};

		var inserirJogada = function(name, value){
			var deferred = $q.defer();
			var jogada;

			$timeout(function() {
				jogada = {'nome': name, 'valor': value};
				sessoes[idSessaoCorrente].tarefas[idTarefaEstimadaCorrente].jogadas.push(jogada);

				deferred.resolve();
			}, 0);

			$timeout(function(){
				for(var i = 0; i < sessoes[idSessaoCorrente].joined.length; i++){
					if(sessoes[idSessaoCorrente].joined[i] !== name){
						jogada = {'nome': sessoes[idSessaoCorrente].joined[i], 'valor': 3};
						sessoes[idSessaoCorrente].tarefas[idTarefaEstimadaCorrente].jogadas.push(jogada);
					}
				}
				calculaResultadoTarefa();
				$rootScope.$broadcast(eventoTodosJogaram);

			}, 0);

			return deferred.promise;
		};

		var calculaResultadoTarefa = function(){
			var sum = 0;
			
			for(var i = 0; i < sessoes[idSessaoCorrente].tarefas[idTarefaEstimadaCorrente].jogadas.length; i++){
				sum += sessoes[idSessaoCorrente].tarefas[idTarefaEstimadaCorrente].jogadas[i].valor;
			}
			sessoes[idSessaoCorrente].tarefas[idTarefaEstimadaCorrente].resultado = 
							Math.round(sum/sessoes[idSessaoCorrente].tarefas[idTarefaEstimadaCorrente].jogadas.length);
		};

		var getSessionMaster = function(){
			return sessoes[idSessaoCorrente].master;
		};

		var getResultadoTarefaEstimadaCorrente = function(){
			var resultado = {
					'jogadas': sessoes[idSessaoCorrente].tarefas[idTarefaEstimadaCorrente].jogadas,
					'valor': sessoes[idSessaoCorrente].tarefas[idTarefaEstimadaCorrente].resultado
				};

			return resultado;
		};

		var getNomeTarefaEstimadaCorrente = function(){
			return sessoes[idSessaoCorrente].tarefas[idTarefaEstimadaCorrente].nome;
		};

		var getSessaoCorrente = function(){
			return sessoes[idSessaoCorrente];
		};

		var preparaProximaTarefa = function(){
			idTarefaEstimadaCorrente ++;
		};

		return {
			getListaSessoes : getListaSessoes,
			updateListaSessoes : updateListaSessoes,
			inserirParticipante: inserirParticipante,
			inserirJogada: inserirJogada,
			calculaResultadoTarefa: calculaResultadoTarefa,
			getSessionMaster: getSessionMaster,
			getNomeTarefaEstimadaCorrente: getNomeTarefaEstimadaCorrente,
			getResultadoTarefaEstimadaCorrente: getResultadoTarefaEstimadaCorrente,
			getSessaoCorrente: getSessaoCorrente,
			preparaProximaTarefa: preparaProximaTarefa,
			//eventos
			eventoTodosJogaram: eventoTodosJogaram,
			eventoRepetirEstimativa: eventoRepetirEstimativa
		};
	}]
)

.factory('kdmPokerPlanService', [
	'kdmSessionService',

	function(kdmSessionService){
		var jogar = function(name, value){
			return kdmSessionService.inserirJogada(name, value);
		};

		var isMaster = function(name){
			if(name === kdmSessionService.getSessionMaster()){
				return true;
			}
			return false;
		};

		return {
			jogar: jogar,
			isMaster: isMaster
		};
	}]
);