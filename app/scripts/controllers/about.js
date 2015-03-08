'use strict';

/**
 * @ngdoc function
 * @name ftwApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ftwApp
 */
angular.module('ftwApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
