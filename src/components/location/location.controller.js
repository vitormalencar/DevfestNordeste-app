(function() {
  'use strict';

  angular
    .module('devfest.location', [])
    .controller('LocationController', LocationController);

  LocationController.$inject = ['$ionicLoading', '$scope', 'LocationFactory'];

  function LocationController($ionicLoading, $scope, LocationFactory) {
    var vm = this;
    vm.location = [];
    vm.map = {};


    $ionicLoading.show({
      template: 'Loading...'
    });

    activate();

    function activate() {
      LocationFactory.getLocation().then(
        function(data) {
          vm.location = data;
          $ionicLoading.hide();
        },
        function(error) {
          $ionicLoading.hide();
        });
    }

    $scope.$on('mapInitialized', function(map) {
      vm.map = map;
    });
  }
})();
