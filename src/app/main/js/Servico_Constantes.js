var consts = angular.module('kdm.servicoConstantes', []);

consts.constant('URLs', {
	urlPesquisa: 'http://srv-cedi-pro.camara.gov.br/kdapi/resumopessoas?termoPesquisa=',
	urlCadastro: 'http://srv-cedi-pro.camara.gov.br/kdapi/pessoa/',
	urlCadastroComFoto: '/foto/1',
});