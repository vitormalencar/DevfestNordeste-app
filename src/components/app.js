angular.module('devfest', ['core'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.backgroundColorByHexString('#23938A');
      }
    });
  })
  .config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
    $ionicConfigProvider.backButton.text('').previousTitleText(false);
    if (ionic.Platform.isAndroid()) {
      $ionicConfigProvider.scrolling.jsScrolling(false);
    }
    $urlRouterProvider.otherwise('/app/schedule');

  });
