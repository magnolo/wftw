'use strict';

/**
 * @ngdoc function
 * @name ftwApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the ftwApp
 */
angular.module('ftwApp')
  .controller('IndexCtrl', function($log, $resource, $timeout, $scope, leafletData) {
    /* $scope.zoom = 16;
    $scope.center = {
        lat: 48.209206,
        lng: 16.372778,
        zoom: $scope.zoom
    };*/
    $scope.til = [{
      name: 'mapbox.pirates',
      title: 'Pirates'
    }, {
      name: 'base',
      title: 'Base Map'
    }, {
      name: 'mapbox.streets',
      title: 'Streets'
    }, {
      name: 'mapbox.light',
      title: 'Light'
    }, {
      name: 'mapbox.dark',
      title: 'Dark'
    }, {
      name: 'mapbox.satellite',
      title: 'Satellite'
    }, {
      name: 'mapbox.street-satellite',
      title: 'Street Satellite'
    }, {
      name: 'mapbox.wheatpaste',
      title: 'Wheatpaste'
    }, {
      name: 'mapbox.street-basic',
      title: 'Street Basic'
    }, {
      name: 'mapbox.comic',
      title: 'Comic'
    }, {
      name: 'mapbox.outdoors',
      title: 'Outdoors'
    }, {
      name: 'mapbox.run-bike-hike',
      title: 'Run Bike Hike'
    }, {
      name: 'mapbox.pencil',
      title: 'Pencil'
    }, {
      name: 'mapbox.emerald',
      title: 'Emerald'
    }, {
      name: 'mapbox.high-contrast',
      title: 'High Contrast'

    }, {
      name: 'magnolo.c0da1255',
      title: 'Wheatpaste Grey'
    }];
    $scope.$watch('tile', function(newItem, oldItem) {
      if (newItem === oldItem) {
        return;
      }
      angular.forEach($scope.layers.baselayers, function(item, key) {
        delete $scope.layers.baselayers[key];
      });

      if (newItem === 'base') {

        $scope.layers.baselayers.base = {

          name: 'OpenStreetMap',
          type: 'xyz',
          url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',

        };
      } else {
        $scope.layers.baselayers[newItem] = {

          url: 'http://api.tiles.mapbox.com/v4/' + $scope.tile + '/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFnbm9sbyIsImEiOiJuSFdUYkg4In0.5HOykKk0pNP1N3isfPQGTQ',
          name: 'OpenStreetMap',
          type: 'xyz',

        };
      }


    });
    $scope.tile = 'magnolo.c0da1255';
    $scope.url = 'http://api.tiles.mapbox.com/v4/' + $scope.tile + '/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFnbm9sbyIsImEiOiJuSFdUYkg4In0.5HOykKk0pNP1N3isfPQGTQ';
    $scope.loading = false;
    $scope.layers = {
      baselayers: {
        pencil: {
          url: $scope.url,
          name: 'magnolo.c0da1255',
          type: 'xyz'
        }
      }
    };
    angular.extend($scope, {
      center: {
        lat: 48.209206,
        lng: 16.372778,
        zoom: 16
      },
      tiles: {
        url: $scope.url,
        //url: 'http://manfredwalder.at/wftw2/tileserver/rdtiles/{z}/{x}/{y}.png',
        type: 'xyz'
      }

    });
    angular.extend($scope, {
      defaults: {
        zoomAnimationThreshold: 18,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        keyboard: false,
        zoomControl: false
      }
    });
    $scope.destroy = function() {
      cancelAnimationFrame($scope.animationID);
    };
    $scope.toX = Math.round(Math.random()) * 2 - 1;
    $scope.toY = Math.round(Math.random()) * 2 - 1;
    $scope.animate = function() {

      leafletData.getMap('map').then(function(map) {
        $scope.map = map;

        $scope.map.panBy([$scope.toX, $scope.toY], {
          animate: false,
          duration: 1,
          easeLinearity: 1,
          noMoveStart: true
        });
        $scope.animationID = requestAnimationFrame(function() {
          $timeout(function() {
            $scope.animate();
          });
        });
      });

    };
    $scope.sendReg = function() {
      $scope.center.zoom = 3;
      $scope.loading = true;
      $timeout(function() {
        $scope.center.zoom = 16;
        $scope.loading = false;
      }, 2000);
    };
    $scope.addSubscription = function(mailchimp) {
      // $scope.destroy();
      $scope.center.zoom = 3;
      $scope.loading = true;
      var actions,
        MailChimpSubscription,
        params = {},
        url;

      // Create a resource for interacting with the MailChimp API
      url = '//' + mailchimp.username + '.' + mailchimp.dc +
        '.list-manage.com/subscribe/post-json';

      var fields = Object.keys(mailchimp);

      for (var i = 0; i < fields.length; i++) {
        params[fields[i]] = mailchimp[fields[i]];
      }

      params.c = 'JSON_CALLBACK';

      actions = {
        'save': {
          method: 'jsonp'
        }
      };
      MailChimpSubscription = $resource(url, params, actions);

      // Send subscriber data to MailChimp
      MailChimpSubscription.save(
        // Successfully sent data to MailChimp.
        function(response) {
          // Define message containers.
          mailchimp.errorMessage = '';
          mailchimp.successMessage = '';

          // Store the result from MailChimp
          mailchimp.result = response.result;

          // Mailchimp returned an error.
          if (response.result === 'error') {
            if (response.msg) {
              // Remove error numbers, if any.
              var errorMessageParts = response.msg.split(' - ');
              if (errorMessageParts.length > 1) {
                errorMessageParts.shift(); // Remove the error number
              }
              mailchimp.errorMessage = errorMessageParts.join(' ');
            } else {
              mailchimp.errorMessage = 'Sorry! An unknown error occured.';
            }
          }
          // MailChimp returns a success.
          else if (response.result === 'success') {
            mailchimp.successMessage = response.msg;
            $timeout(function() {
              $scope.center.zoom = 16;
              $scope.loading = false;
              // $scope.animate();
            }, 2000);
          }
        },

        // Error sending data to MailChimp
        function(error) {
          $log.error('MailChimp Error: %o', error);
        }
      );
    };

    $scope.animate();



  });