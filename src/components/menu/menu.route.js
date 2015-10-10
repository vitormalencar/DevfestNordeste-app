(function() {
  'use strict';
  angular.module('devfest.menu').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'components/menu/menu.view.html',
        controller: 'MenuController as vm'
      });
    }
  ]);
}());
