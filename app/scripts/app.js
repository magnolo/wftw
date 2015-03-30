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
        'leaflet-directive',
        'mailchimp'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
