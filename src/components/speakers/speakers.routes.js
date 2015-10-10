(function() {
  'use strict';
  angular.module('devfest.speakers').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.speakers', {
          url: '/speakers',
          views: {
            'menuContent': {
              templateUrl: 'components/speakers/speakers.view.html',
              controller: 'SpeakersController as vm'
            }
          }
        })
    }
  ]);
}());
