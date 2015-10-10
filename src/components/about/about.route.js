(function() {
  'use strict';
  angular.module('devfest.about').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.about', {
          url: '/about',
          views: {
            'menuContent': {
              templateUrl: 'components/about/about.view.html',
              controller: 'AboutController as vm'
            }
          }
        })
    }
  ]);
}());
