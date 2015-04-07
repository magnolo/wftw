'use strict';

/**
 * @ngdoc overview
 * @name ftwApp
 * @description
 * # ftwApp
 *
 * Main module of the application.
 */
angular
  .module('ftwApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'leaflet-directive',
    'mailchimp',
    'angulartics',
    'angulartics.google.analytics'
  ])
  .config(function($analyticsProvider) {
    $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
    $analyticsProvider.withAutoBase(true); /* Records full path */
    $analyticsProvider.virtualPageviews(false);
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        data: {
          title: 'We feel the World'
        },
        views: {
          'main': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('about', {
        url: '/about',
        data: {
          title: 'Informationen // We feel the World'
        },
        views: {
          'main': {
            controller: 'AboutCtrl',
            templateUrl: 'views/about.html'
          }
        }
      }).state('ngos', {
        url: '/informationen-fuer-ngos',
        data: {
          title: 'Informationen für NGOs/NPOs // We feel the World'
        },
        views: {
          'main': {
            templateUrl: 'views/ngos.html'
          }
        }
      }).state('companies', {
        url: '/informationen-fuer-companies',
        data: {
          title: 'Informationen für Unternehmen // We feel the World'
        },
        views: {
          'main': {
            templateUrl: 'views/companies.html'
          }
        }
      });

  }).run(function($rootScope, $state, $stateParams, $location, $analytics, $timeout) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function() {
      $timeout(function() {
        $analytics.pageTrack($location.path());
      });
    });
  });