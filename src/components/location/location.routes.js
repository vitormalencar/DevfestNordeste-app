(function() {
  'use strict';
  angular.module('devfest.location').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.location', {
          url: '/location',
          views: {
            'menuContent': {
              templateUrl: 'components/location/location.view.html',
              controller: 'LocationController as vm'
            }
          }
        })
    }
  ]);
}());
