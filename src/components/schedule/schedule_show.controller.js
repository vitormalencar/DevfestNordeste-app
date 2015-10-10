(function() {
  'use strict';

  angular
    .module('devfest.Schedule')
    .controller('ScheduleShowController', ScheduleShowController);

  ScheduleShowController.$inject = ['$stateParams', '$cordovaSocialSharing', '$ionicLoading'];

  function ScheduleShowController($stateParams, $cordovaSocialSharing, $ionicLoading) {
    var vm = this;
    vm.attraction = {};
    vm.share = share;
    load();

    //////////////////

    function load() {
      vm.attraction = $stateParams.item;
      console.log(vm.attraction);
    }

    function share(attraction) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      
      var message = 'Curtindo a palestra ' + attraction.title + ' por ' + attraction.speakers[0].name + ' no #devfestne15 ';
      var subject = 'GDG devfest Norderste !';
      var file = 'http://landing.devfestne.com.br/_img/og_image.png';
      var link = 'https://2015.devfestne.com.br';

      $cordovaSocialSharing
        .share(message, subject, file, link) // Share via native share sheet
        .then(function(result) {
          $ionicLoading.hide();
        }, function(err) {
          $ionicLoading.hide();
        });
    }
  }
})();
