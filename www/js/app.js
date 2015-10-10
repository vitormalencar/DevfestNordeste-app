angular.module('devfest', ['core'])
  .run(['$ionicPlatform', function($ionicPlatform) {
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
  }])
  .config(['$stateProvider', '$ionicConfigProvider', '$urlRouterProvider', function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
    $ionicConfigProvider.backButton.text('').previousTitleText(false);
    if (ionic.Platform.isAndroid()) {
      $ionicConfigProvider.scrolling.jsScrolling(false);
    }
    $urlRouterProvider.otherwise('/app/schedule');

  }]);

/**
 * ==================  angular-ios9-uiwebview.patch.js v1.1.1 ==================
 *
 * This patch works around iOS9 UIWebView regression that causes infinite digest
 * errors in Angular.
 *
 * The patch can be applied to Angular 1.2.0 – 1.4.5. Newer versions of Angular
 * have the workaround baked in.
 *
 * To apply this patch load/bundle this file with your application and add a
 * dependency on the "ngIOS9UIWebViewPatch" module to your main app module.
 *
 * For example:
 *
 * ```
 * angular.module('myApp', ['ngRoute'])`
 * ```
 *
 * becomes
 *
 * ```
 * angular.module('myApp', ['ngRoute', 'ngIOS9UIWebViewPatch'])
 * ```
 *
 *
 * More info:
 * - https://openradar.appspot.com/22186109
 * - https://github.com/angular/angular.js/issues/12241
 * - https://github.com/driftyco/ionic/issues/4082
 *
 *
 * @license AngularJS
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
angular.module('ngIOS9UIWebViewPatch', ['ng']).config([
  '$provide',
  function($provide) {
    'use strict';
    $provide.decorator('$browser', [
      '$delegate',
      '$window',
      function($delegate, $window) {
        if (isIOS9UIWebView($window.navigator.userAgent)) {
          return applyIOS9Shim($delegate);
        }
        return $delegate;

        function isIOS9UIWebView(userAgent) {
          return /(iPhone|iPad|iPod).* OS 9_\d/.test(userAgent) && !/Version\/9\./.test(userAgent);
        }

        function applyIOS9Shim(browser) {
          var pendingLocationUrl = null;
          var originalUrlFn = browser.url;
          browser.url = function() {
            if (arguments.length) {
              pendingLocationUrl = arguments[0];
              return originalUrlFn.apply(browser, arguments);
            }
            return pendingLocationUrl || originalUrlFn.apply(browser, arguments);
          };
          window.addEventListener('popstate', clearPendingLocationUrl, false);
          window.addEventListener('hashchange', clearPendingLocationUrl, false);

          function clearPendingLocationUrl() {
            pendingLocationUrl = null;
          }
          return browser;
        }
      }
    ]);
  }
]);

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
    'devfest.location'
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

(function() {
  'use strict';
  angular
    .module('devfest.about', [])
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$ionicLoading', '$state', 'AboutFactory'];

  function AboutController($ionicLoading, $state, AboutFactory) {
    var vm = this;
    vm.about = [];
    vm.goToUrl = goToUrl;

    $ionicLoading.show({
      template: 'Loading...'
    });

    load();

    ///////////////

    function load() {
      AboutFactory.get().then(function(data) {
        vm.about = data;
        $ionicLoading.hide();
      });
    }

    function goToUrl(url) {
      window.open(url, '_blank', 'location=yes')
    }
  }
})();

(function() {
  'use strict';
  angular.module('devfest.about').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.about', {
          url: '/about',
          views: {
            'menuContent': {
              templateUrl: 'components/about/about.view.html',
              controller: 'AboutController as vm'
            }
          }
        })
    }
  ]);
}());

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

(function() {
  'use strict';

  angular
    .module('devfest.location', [])
    .controller('LocationController', LocationController);

  LocationController.$inject = ['$ionicLoading', '$scope', 'LocationFactory'];

  function LocationController($ionicLoading, $scope, LocationFactory) {
    var vm = this;
    vm.location = [];
    vm.map = {};


    $ionicLoading.show({
      template: 'Loading...'
    });

    activate();

    function activate() {
      LocationFactory.getLocation().then(
        function(data) {
          vm.location = data;
          $ionicLoading.hide();
        },
        function(error) {
          $ionicLoading.hide();
        });
    }

    $scope.$on('mapInitialized', function(map) {
      vm.map = map;
    });
  }
})();

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

(function() {
  'use strict';
  angular.module('devfest.location').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.location', {
          url: '/location',
          views: {
            'menuContent': {
              templateUrl: 'components/location/location.view.html',
              controller: 'LocationController as vm'
            }
          }
        })
    }
  ]);
}());

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

(function() {
  'use strict';
  angular.module('devfest.menu').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'components/menu/menu.view.html',
        controller: 'MenuController as vm'
      });
    }
  ]);
}());

(function() {
  'use strict';

  angular
    .module('devfest.Schedule', [])
    .controller('ScheduleController', ScheduleController);

  ScheduleController.$inject = ['$ionicLoading', '$state', 'ScheduleFactory'];

  function ScheduleController($ionicLoading, $state, ScheduleFactory) {
    var vm = this;
    vm.attractions = [];
    vm.goSheduleDetails = goSheduleDetails;

    $ionicLoading.show({
      template: 'Loading...'
    });

    load();

    ///////////////

    function load() {
      ScheduleFactory.get().then(
        function(data) {
          vm.attractions = data;
          $ionicLoading.hide();
        },
        function(error) {
          $ionicLoading.hide();
        });
    }

    function goSheduleDetails(attraction) {
      $state.go('app.schedule_show', {
        'item': attraction
      });
    }

  }
})();

(function() {
  'use strict';
  angular.module('devfest.Schedule').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.schedule', {
          url: '/schedule',
          views: {
            'menuContent': {
              templateUrl: 'components/schedule/schedule.view.html',
              controller: 'ScheduleController as vm'
            }
          }
        })
        .state('app.schedule_show', {
          url: '/schedule_show',
          params: {
            item: null
          },
          views: {
            'menuContent': {
              templateUrl: 'components/schedule/schedule_show.view.html',
              controller: 'ScheduleShowController as vm'
            }
          }
        });
    }
  ]);
}());

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

(function() {
  'use strict';

  angular
    .module('devfest.speakers', [])
    .controller('SpeakersController', SpeakersController);

  SpeakersController.$inject = ['$ionicLoading', '$state', 'SpeakersFactory'];

  function SpeakersController($ionicLoading, $state, SpeakersFactory) {
    var vm = this;
    vm.speakers = {};

    vm.goToUrl = goToUrl;

    load();

    function load() {
      SpeakersFactory.get().then(
        function(data) {
          vm.speakers = data;
        }
      )
    }

    function goToUrl(url) {
      window.open(url, '_blank', 'location=yes')
    }
  }
})();

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

(function() {
  'use strict';
  angular.module('devfest.speakers').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.speakers', {
          url: '/speakers',
          views: {
            'menuContent': {
              templateUrl: 'components/speakers/speakers.view.html',
              controller: 'SpeakersController as vm'
            }
          }
        })
    }
  ]);
}());

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

(function() {
  'use strict';
  angular.module('devfest.teste').config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider.state('app.teste', {
        url: '/teste',
        views: {
          'menuContent': {
            templateUrl: 'components/teste/teste.view.html',
            controller: 'TesteController as vm'
          }
        }
      });
    }
  ]);
}());
