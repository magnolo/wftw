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
        $scope.loading = false;
        angular.extend($scope, {
            center: {
                lat: 48.209206,
                lng: 16.372778,
                zoom: 16
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
        $scope.animate = function() {

            leafletData.getMap('map').then(function(map) {
                $scope.map = map;

                $scope.map.panBy(new L.Point(-1, -1));
                $scope.animationID = requestAnimationFrame(function() {
                    $scope.animate();
                });
            })

        };
        $scope.sendReg = function() {

            $scope.center.zoom = 3;
            $scope.loading = true;
            $timeout(function() {
                $scope.center.zoom = 16;
                $scope.loading = false;
            }, 2000)
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
                            if (errorMessageParts.length > 1)
                                errorMessageParts.shift(); // Remove the error number
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
                        }, 2000)
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