'use strict';
angular.module('kdm.pokerplan.controllers', 
	['ionic',
	'ui.router',
	 'kdm',
	 'kdm.pokerplan.services',
	 'famous.angular',
	 ])

.controller('kdmPokerPlanSessionsCtrl',
	['$scope',
	 'kdmSessionService',

	function($scope, kdmSessionService){
		kdmSessionService.getListaSessoes().then(function(data) {
			$scope.sessoes = data;
		}, function(error) {
			console.log('erro: ' + error);

		});

		$scope.join = function(i){
			$scope.sessoes[i].joined.push('myname');
			kdmSessionService.setIDSessaoAtual(i);
		};
	}

])

.controller('kdmPokerPlanCtrl',
	['$scope',
	'$interval',
	'$timeout',
	'kdmSessionService',
	'kdmPokerPlanService',
	'$famous',
	'$timeline',
	'$window',
	'$ionicModal',
	'$ionicPopover',
	'$ionicPopup',
	
	function($scope,
	 		$interval,
	  		$timeout,
	   		kdmSessionService, 
	   		kdmPokerPlanService, 
	   		$famous, 
	   		$timeline, 
	   		$window, 
	   		$ionicModal, 
	   		$ionicPopover,
	   		$ionicPopup){

		var Easing = $famous['famous/transitions/Easing'];
		var Transitionable = $famous['famous/transitions/Transitionable'];
		$scope.jogadores = [];
		var idist = 100, fdist = 10;
		var center = {'x' : $window.innerWidth/2, 'y' : $window.innerHeight/2 - 30};
		$scope.t = new Transitionable(0);
		var draw = false;
		$scope.dados = {};
		$scope.dados.nomeNovaTarefa = '';
		$scope.isMaster = true;
		$scope.tarefaEstimada = {};

		function init(){
			var jogador;
			$scope.sessaoAtual = kdmSessionService.getSessaoAtual();
			kdmPokerPlanService.setSessaoCorrente($scope.sessaoAtual);

			var dRot = (Math.PI*2)/6;

			var count = 1;
			for(var i = 0; i < 6; i++){
				jogador = { 'rotation' : $timeline([[0, count*dRot],[1, count*dRot]]),
							'pos'  : $timeline([
												[0, [Math.cos(count*dRot +Math.PI/2)*idist + center.x, Math.sin(count*dRot +Math.PI/2)*idist + center.y, 0],  Easing.inOutQuad],
									 			[1, [Math.cos(count*dRot +Math.PI/2)*fdist + center.x, Math.sin(count*dRot +Math.PI/2)*fdist + center.y, 0]]
									 			])};
				$scope.jogadores.push(jogador);
				count ++;
			}

			$scope.tarefaEstimada = kdmPokerPlanService.getTarefaEstimadaCorrente();
			
		}

		init();

		$scope.clickHandler = function(){
			if(draw){
				animateUnDraw();
			}
			else{
				animateDraw();
			}
		};

		function animateDraw(){
			var i = 0;
			$interval(function(){
				$scope.t.set(i);
				i += 0.01;
			}, 10, 100);
			draw = true;			
		}
		function animateUnDraw(){
			var i = 1;
			$interval(function(){
				$scope.t.set(i);
				i -= 0.01;
			}, 10, 100);
			draw = false;	
		}

		$scope.pronto = function(jogada){
			kdmPokerPlanService.setJogada('myname', jogada);
			$scope.popover.hide();
			animateDraw();
			$scope.jogadas = kdmPokerPlanService.getJogadasMao();
			$timeout(function() {
				if($scope.isMaster){
					$ionicModal.fromTemplateUrl('session-modal-master.html', function($ionicModal) {
	        			$scope.modal = $ionicModal;
	        			$scope.openModal();
	    			}, {
	    				scope: $scope,
	    				animation: 'slide-in-up'
	  				});
				}
				else{
					$ionicModal.fromTemplateUrl('session-modal.html', function($ionicModal) {
	        			$scope.modal = $ionicModal;
	        			$scope.openModal();
	    			}, {
	    				scope: $scope,
	    				animation: 'slide-in-up'
	  				});
				}
			}, 1000);
		};		

	    $scope.openModal = function() {
	    	$scope.modal.show();
	  	};
	  	$scope.closeModal = function() {
	   		$scope.modal.hide();
	  	};

	  	$scope.escolheCarta = function($event){
	  		$ionicPopover.fromTemplateUrl('escolhe-carta.html',{
	  			scope: $scope
	  		}).then(function(popover){
	  			$scope.popover = popover;
	  			$scope.popover.show($event);
	  		});
	  	};

	  	$scope.novaTarefa = function(){
	  		$scope.finalizarMao();
	  		$scope.tarefaEstimada = kdmPokerPlanService.getProximaTarefaTarefaEstimada();
	  		$scope.closeModal();
	  		animateUnDraw();
	  	};

	  	$scope.finalizarMao = function(){
	  		var tarefaAtual = kdmPokerPlanService.getTarefaEstimadaCorrente();
	  		var soma = 0;
	  		for(var i = 0; i < $scope.sessaoAtual.joined.length; i++){
	  			soma += tarefaAtual.jogadas[$scope.sessaoAtual.joined[i]];
	  		}
	  		tarefaAtual.resultado = soma/$scope.sessaoAtual.joined.length;
	  		kdmPokerPlanService.getTarefaEstimadaCorrente().resultado = tarefaAtual.resultado;
	  	};

	  	$scope.finalizar = function(){
	  		$scope.finalizarMao();
	  		var tarefas = kdmPokerPlanService.getTarefasEstimadas();
	  		for(var i = 0; i < kdmPokerPlanService.getNumeroTarefasEstimadas(); i++){
	  			console.log(tarefas.resultado);
	  		}
	  	};

	  	$scope.enviarTarefas = function(){
	  		 kdmPokerPlanService.setTarefas($scope.listaTarefas);
	  		 $scope.closeModal();
	  	};
	}
]);
