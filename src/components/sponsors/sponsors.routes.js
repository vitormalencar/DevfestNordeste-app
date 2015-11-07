(function() {
  'use strict';
  angular.module('devfest.sponsors').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.sponsors', {
          url: '/sponsors',
          views: {
            'menuContent': {
              templateUrl: 'components/sponsors/sponsors.view.html',
              controller: 'AboutController as vm'
            }
          }
        })
    }
  ]);
}());
