(function() {
  'use strict';
  angular
    .module('devfest.about', [])
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$ionicLoading', '$state', 'AboutFactory'];

  function AboutController($ionicLoading, $state, AboutFactory) {
    var vm = this;
    vm.about = [];
    vm.goToUrl = goToUrl;

    $ionicLoading.show({
      template: 'Loading...'
    });

    load();

    ///////////////

    function load() {
      AboutFactory.get().then(function(data) {
        vm.about = data;
        $ionicLoading.hide();
      });
    }

    function goToUrl(url) {
      window.open(url, '_blank', 'location=yes')
    }
  }
})();
