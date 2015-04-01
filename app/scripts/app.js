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
    'mgcrea.ngStrap.navbar',
    'mgcrea.ngStrap.collapse'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'main': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('about', {
        url: '/about',
        views: {
          'main': {
            controller: 'AboutCtrl',
            templateUrl: 'views/about.html'
          }
        }
      }).state('ngos', {
        url: '/informationen-fuer-ngos',
        views: {
          'main': {
            templateUrl: 'views/ngos.html'
          }
        }
      }).state('companies', {
        url: '/informationen-für-companies',
        views: {
          'main': {
            templateUrl: 'views/companies.html'
          }
        }
      });

  });