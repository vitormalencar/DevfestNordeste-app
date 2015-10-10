(function() {
  'use strict';

  angular
    .module('devfest.location')
    .factory('LocationFactory', LocationFactory);

  LocationFactory.$inject = ['$http', '$q'];

  function LocationFactory($http, $q) {
    var service = {
      getLocation: getLocation
    };

    return service;

    function getLocation() {
      var dfd = $q.defer();
      $http.get('data/location.json')
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
