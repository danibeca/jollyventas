'use strict';

angular.module('jollyVentasApp.login.controllers', [])

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', 'StorageService',
    function ($scope, $rootScope, $location, AuthenticationService, StorageServices) {
        
        StorageServices.eliminarLocalStorage();
        AuthenticationService.clearCredentials();  
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.login($scope.username, $scope.password, function(response) {
                if(response.valido) {
                    AuthenticationService.setCredentials(response);
                    $location.path('/tienda-seleccionar');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);