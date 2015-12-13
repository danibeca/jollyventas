'use strict';

angular.module('jollyVentasApp.login.controllers', [])

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        
        AuthenticationService.ClearCredentials();
  
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.valido) {
                    AuthenticationService.SetCredentials(response);
                    $location.path('/tienda-seleccionar');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);