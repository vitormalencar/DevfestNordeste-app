(function() {
  'use strict';

  angular
    .module('devfest.speakers', [])
    .controller('SpeakersController', SpeakersController);

  SpeakersController.$inject = ['$ionicLoading', '$state', 'SpeakersFactory'];

  function SpeakersController($ionicLoading, $state, SpeakersFactory) {
    var vm = this;
    vm.speakers = {};

    vm.goToUrl = goToUrl;

    load();

    function load() {
      SpeakersFactory.get().then(
        function(data) {
          vm.speakers = data;
        }
      )
    }

    function goToUrl(url) {
      window.open(url, '_blank', 'location=yes')
    }
  }
})();
