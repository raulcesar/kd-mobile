'use strict';

angular.module('kdm.pokerplan.services', [])

.factory('kdmSessionService', 
	function(){
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
			return sessoes;
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
)

.factory('kdmPokerPlanService', 
	function(){
		var tarefasEstimadas = [];
		var tarefaEstimadaCorrente;
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
			return tarefaEstimadaCorrente;
		};

		var getTarefasEstimadas = function(){
			return tarefasEstimadas;
		};

		var setJogada = function(user, j){
			tarefaEstimadaCorrente.jogadas[user] = j;
			jogadaCorrente[user] = j;

			for(var i = 0; i < sessaoCorrente.joined.length; i++){
				if(sessaoCorrente.joined[i] !== 'myname'){
					jogadaCorrente[sessaoCorrente.joined[i]] = j;
					tarefaEstimadaCorrente.jogadas[sessaoCorrente.joined[i]] = j;
				}
			}
		};

		var getJogadasMao = function(){
			return jogadaCorrente;
		};

		return {
			setTarefaEstimada : setTarefaEstimada,
			getTarefasEstimadas:getTarefasEstimadas,
			getTarefaEstimadaCorrente : getTarefaEstimadaCorrente,
			setSessaoCorrente : setSessaoCorrente,
			setJogada : setJogada,
			getJogadasMao : getJogadasMao
		};
	}
);