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
	 '$state',

	function($scope, kdmSessionService, $state){
		kdmSessionService.getListaSessoes().then(function(data) {
			$scope.sessoes = data;
		}, function(error) {
			console.log('erro: ' + error);

		});

		$scope.join = function(session){
			kdmSessionService.inserirParticipante('myname', session).then(function(){
				$state.go('kdm.pokerplan', {'sessioId': session.id});
			});
		};
	}

])

.controller('kdmPokerPlanCtrl',
	['$scope',
	'$rootScope',
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
	'$rootScope',
	'$stateParams',
	
	function($scope,
			$rootScope,
	 		$interval,
	  		$timeout,
	   		kdmSessionService, 
	   		kdmPokerPlanService, 
	   		$famous, 
	   		$timeline, 
	   		$window, 
	   		$ionicModal, 
	   		$ionicPopover,
	   		$stateParams){

		var Easing = $famous['famous/transitions/Easing'];
		var Transitionable = $famous['famous/transitions/Transitionable'];
		var idist = 100, fdist = 10;
		var center = {'x' : $window.innerWidth/2, 'y' : $window.innerHeight/2 - 30};
		$scope.t = new Transitionable(0);
		var esperando = false;
		$scope.jogadores = [];
		$scope.sessaoCorrente = kdmSessionService.getSessaoCorrente();
		$scope.nomeTarefaCorrente = kdmSessionService.getNomeTarefaEstimadaCorrente();

		$scope.$on(kdmSessionService.eventoTodosJogaram, function(){
			mostraJogadas();
		});

		function init(){
			var jogador;

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
		}

		init();

		function animateDraw(){
			var i = 0;
			$interval(function(){
				$scope.t.set(i);
				i += 0.01;
			}, 10, 100);
		}
		function animateUnDraw(){
			var i = 1;
			$interval(function(){
				$scope.t.set(i);
				i -= 0.01;
			}, 10, 100);
		}

	  	$scope.escolheCarta = function($event){
	  		$ionicPopover.fromTemplateUrl('escolhe-carta.html',{
	  			scope: $scope
	  		}).then(function(popover){
	  			$scope.popover = popover;
	  			$scope.popover.show($event);
	  		});
	  	};

	  	$scope.fazJogada = function(valor){
	  		$scope.popover.hide();
	  		kdmPokerPlanService.jogar('myname', valor).then(
	  			function(){
	  				animateDraw();
	  			});
	  	};

	  	function mostraJogadas(){
	  		$scope.resultadoTarefa = kdmSessionService.getResultadoTarefaEstimadaCorrente();
	  		if(kdmPokerPlanService.isMaster('myname')){
	  			$ionicModal.fromTemplateUrl('session-modal-master.html', {
		  			scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modal = modal;
					$scope.modal.show();
				});
	  		}
	  		else{
	  			$ionicModal.fromTemplateUrl('session-modal.html', {
		  			scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modal = modal;
					$scope.modal.show();
				});
	  		}
	  	}

	  	$scope.novaTarefa = function(){
	  		kdmSessionService.preparaProximaTarefa();
	  		$scope.nomeTarefaCorrente = kdmSessionService.getNomeTarefaEstimadaCorrente();
	  		animateUnDraw();
	  		$scope.modal.hide();
	  	};
	}
]);
