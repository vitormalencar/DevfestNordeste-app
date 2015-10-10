(function() {
  'use strict';
  angular.module('devfest.Schedule').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.schedule', {
          url: '/schedule',
          views: {
            'menuContent': {
              templateUrl: 'components/schedule/schedule.view.html',
              controller: 'ScheduleController as vm'
            }
          }
        })
        .state('app.schedule_show', {
          url: '/schedule_show',
          params: {
            item: null
          },
          views: {
            'menuContent': {
              templateUrl: 'components/schedule/schedule_show.view.html',
              controller: 'ScheduleShowController as vm'
            }
          }
        });
    }
  ]);
}());
