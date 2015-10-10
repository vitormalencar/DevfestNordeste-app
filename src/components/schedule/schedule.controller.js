(function() {
  'use strict';

  angular
    .module('devfest.Schedule', [])
    .controller('ScheduleController', ScheduleController);

  ScheduleController.$inject = ['$ionicLoading', '$state', 'ScheduleFactory'];

  function ScheduleController($ionicLoading, $state, ScheduleFactory) {
    var vm = this;
    vm.attractions = [];
    vm.goSheduleDetails = goSheduleDetails;

    $ionicLoading.show({
      template: 'Loading...'
    });

    load();

    ///////////////

    function load() {
      ScheduleFactory.get().then(
        function(data) {
          vm.attractions = data;
          $ionicLoading.hide();
        },
        function(error) {
          $ionicLoading.hide();
        });
    }

    function goSheduleDetails(attraction) {
      $state.go('app.schedule_show', {
        'item': attraction
      });
    }

  }
})();
