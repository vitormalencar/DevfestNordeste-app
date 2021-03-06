(function() {
  'use strict';
  angular.module('core', [
    'ionic',
    'devfest.utils',
    'devfest.components',
    // 'devfest.factories'
  ]);
  angular.module('devfest.components', [
    'devfest.menu',
    'devfest.about',
    'devfest.Schedule',
    'devfest.speakers',
    'devfest.location',
    'devfest.sponsors'
  ]);
  // angular.module('devfest.factories', [
  //   // 'devfest.api',
  //   // 'devfest.auth',
  //   // 'devfest.theme',
  //   // 'devfest.dialog',
  //   // 'devfest.storage',
  //   // 'devfest.session',
  //   // 'devfest.httpInterceptor'
  // ]);
  angular.module('devfest.utils', [
    'ngIOS9UIWebViewPatch',
    'ngCordova',
    'ngMap'
  ]);
}());
