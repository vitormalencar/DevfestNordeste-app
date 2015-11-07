(function() {
  'use strict';

  angular
    .module('devfest.sponsors',[])
    .controller('SponsorsController', SponsorsController);

  SponsorsController.$inject = ['$ionicLoading', 'SponsorsFactory'];

  function SponsorsController($ionicLoading, SponsorsFactory) {
    var vm = this;

    $ionicLoading.show({
      template: 'Loading...'
    });

    load();

    ///////////////

    function load() {
      SponsorsFactory.get().then(
        function(data) {
          console.log(data);
          $ionicLoading.hide();
        },
        function(error) {
          console.log(error);
          $ionicLoading.hide();
        });
    }

    function goToUrl(url) {
      window.open(url, '_blank', 'location=yes')
    }

  }
})();
