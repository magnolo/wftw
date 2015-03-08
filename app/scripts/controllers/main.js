'use strict';

/**
 * @ngdoc function
 * @name ftwApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ftwApp
 */
angular.module('ftwApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
