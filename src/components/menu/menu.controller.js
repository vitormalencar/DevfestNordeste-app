(function() {
  'use strict';
  angular
    .module('devfest.menu', [])
    .controller('MenuController', MenuController);

  MenuController.$inject = [];

  function MenuController() {
    var vm = this;

    activate();

    function activate() {
      console.log('ativado');
    }
  }
})();
