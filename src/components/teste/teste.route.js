(function() {
  'use strict';
  angular.module('devfest.teste').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider.state('app.teste', {
        url: '/teste',
        views: {
          'menuContent': {
            templateUrl: 'components/teste/teste.view.html',
            controller: 'TesteController as vm'
          }
        }
      });
    }
  ]);
}());
