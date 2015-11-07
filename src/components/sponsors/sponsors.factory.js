(function() {
  'use strict';

  angular
    .module('devfest.sponsors')
    .factory('SponsorsFactory', SponsorsFactory);

  SponsorsFactory.$inject = ['$http', '$q'];

  function SponsorsFactory($http, $q) {
    var service = {
      get: get
    };

    return service;

    function get() {
      var dfd = $q.defer();
      $http.get('data/sponsors.json')
        .success(function(data) {
          var gold = data.filter(function() { return data.sponsors.type === 'gold'});
          var silver = data.filter(function() { return data.sponsors.type === 'silver'});
          var bronze = data.filter(function() { return data.sponsors.type === 'bronze'});
          // dfd.resolve({
          //   "gold": gold,
          //   "silver": silver,
          //   "bronze": bronze
          // })
          dfd.resolve(data);
        })
        .error(function(error) {
          dfd.reject(error);
        })
      return dfd.promise;
    }
  }
})();
