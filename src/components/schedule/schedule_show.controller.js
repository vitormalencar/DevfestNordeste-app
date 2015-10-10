(function() {
  'use strict';

  angular
    .module('devfest.Schedule')
    .controller('ScheduleShowController', ScheduleShowController);

  ScheduleShowController.$inject = ['$stateParams'];

  function ScheduleShowController($stateParams) {
    var vm = this;
    vm.attraction = {};

    load();

    //////////////////

    function load() {
      vm.attraction = $stateParams.item;
    }
  }
})();
