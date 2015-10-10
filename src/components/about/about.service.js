(function() {
  'use strict';
  angular
    .module('devfest.about')
    .factory('AboutFactory', AboutFactory);

  AboutFactory.$inject = ['$http', '$q'];

  function AboutFactory($http, $q) {

    var service = {
      get: get
    };

    return service;

    function get() {
      var dfd = $q.defer();
      $http.get('data/about.json')
        .success(function(data) {
          dfd.resolve(data);
        })
        .error(function(error) {
          dfd.reject(error);
        })
      return dfd.promise;
    }
  }
})();
