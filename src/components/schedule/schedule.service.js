(function() {
  'use strict';
  angular
    .module('devfest.Schedule')
    .factory('ScheduleFactory', ScheduleFactory);

  ScheduleFactory.$inject = ['$http', '$q'];

  function ScheduleFactory($http, $q) {

    var service = {
      get: get
    };

    return service;

    function get() {
      var dfd = $q.defer();
      $http.get('data/schedule.json')
        .success(function(data) {
          console.log(data);
          dfd.resolve(data);
        })
        .error(function(error) {
          dfd.reject(error);
        })
      return dfd.promise;
    }
  }
})();
