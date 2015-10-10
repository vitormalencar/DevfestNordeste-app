(function() {
  'use strict';
  angular
    .module('devfest.teste', [])
    .controller('TesteController', TesteController);

  TesteController.$inject = [];

  function TesteController() {
    var vm = this;

    activate();

    function activate() {
      console.log('ativado');
    }
  }
})();
