'use strict';

angular.module('kdm.pokerplan.services', [])

.factory('kdmSessionService', [
	'$q', '$timeout',
	function($q, $timeout){
		var sessoes = [
				{
					'id' : 0,
					'projeto' : 'kd',
					'sprint' : 'Subir o KD para produção',
					'responsavel' : 'CEDI',
					'joined' : ['Raul', 'Alezina'],
					'master' : 'alezina'
				},

				{
					'id' : 1,
					'projeto' : 'projeto1',
					'sprint' : 'Alguma coisa',
					'responsavel' : 'CENIN',
					'joined' : ['user1', 'user2'],
					'master' : 'user1'
				}
		];
		var idSessaoAtual;

		var getListaSessoes = function(){
			var deferred = $q.defer();

			$timeout(function() {
				deferred.resolve(sessoes);
			}, 0);

			// return sessoes;

			return deferred.promise;
		};

		var updateListaSessoes = function(list){
			sessoes = list;
		};

		var setIDSessaoAtual = function(i){
			idSessaoAtual = i;
		};
		var getSessaoAtual = function(){
			return sessoes[idSessaoAtual];
		};
		return {
			getListaSessoes : getListaSessoes,
			updateListaSessoes : updateListaSessoes,
			setIDSessaoAtual : setIDSessaoAtual,
			getSessaoAtual : getSessaoAtual
		};
	}
	]
)

.factory('kdmPokerPlanService', 
	function(){
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
		var tarefaEstimadaCorrente;
		var tarefaEstimadaCorrenteIndex = 0;
		var sessaoCorrente;
		var jogadaCorrente = {};

		var setSessaoCorrente = function(sc){
			sessaoCorrente = sc;
		};

		var setTarefaEstimada = function(tarefaEstimada){
			tarefasEstimadas.push(tarefaEstimada);
			tarefaEstimadaCorrente = tarefaEstimada;
		};

		var getTarefaEstimadaCorrente = function(){
			return tarefasEstimadas[tarefaEstimadaCorrenteIndex];
		};

		var getProximaTarefaTarefaEstimada = function(){
			tarefaEstimadaCorrenteIndex++;
			return tarefasEstimadas[tarefaEstimadaCorrenteIndex];
		};

		var setTarefas = function(tarefas){
			tarefasEstimadas = tarefas;
		};

		var getTarefasEstimadas = function(){
			return tarefasEstimadas;
		};

		var setJogada = function(user, j){
			tarefasEstimadas[tarefaEstimadaCorrenteIndex].jogadas[user] = j;
			jogadaCorrente[user] = j;

			for(var i = 0; i < sessaoCorrente.joined.length; i++){
				if(sessaoCorrente.joined[i] !== 'myname'){
					jogadaCorrente[sessaoCorrente.joined[i]] = j;
					tarefasEstimadas[tarefaEstimadaCorrenteIndex].jogadas[sessaoCorrente.joined[i]] = j;
				}
			}
		};

		var getJogadasMao = function(){
			return jogadaCorrente;
		};

		var getNumeroTarefasEstimadas = function(){
			return tarefaEstimadaCorrenteIndex;
		};

		var setResultadoMao = function(result){
			tarefasEstimadas[tarefaEstimadaCorrenteIndex].resultado = result;
		};

		return {
			setTarefaEstimada : setTarefaEstimada,
			getTarefasEstimadas:getTarefasEstimadas,
			getTarefaEstimadaCorrente : getTarefaEstimadaCorrente,
			setSessaoCorrente : setSessaoCorrente,
			setJogada : setJogada,
			getJogadasMao : getJogadasMao,
			setTarefas: setTarefas,
			getProximaTarefaTarefaEstimada: getProximaTarefaTarefaEstimada,
			getNumeroTarefasEstimadas: getNumeroTarefasEstimadas,
			setResultadoMao: setResultadoMao
		};
	}
);