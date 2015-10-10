(function() {
  'use strict';

  angular
    .module('devfest.speakers')
    .factory('SpeakersFactory', SpeakersFactory);

  SpeakersFactory.$inject = ['$http', '$q'];

  function SpeakersFactory($http, $q) {
    var service = {
      get: get
    };

    return service;

    function get() {
      var dfd = $q.defer();
      $http.get('data/speakers.json')
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
