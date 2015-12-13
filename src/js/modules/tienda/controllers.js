'use strict';

angular.module('jollyVentasApp.tienda.controllers', [])

.controller('TiendaSeleccionarController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {

        $scope.tiendas = ["Centro Comercial Santafe", "Terminal Del Sur"];
        $rootScope.vistaPie = '';

        $scope.seleccionar = function(){
            $location.path('/tienda-abrir');
        }

    }])

.controller('TiendaAbrirController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {

        $scope.TiendaAbrir = function(){
            $location.path('/venta');
        }
    }])

.controller('TiendaCerrarController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {

        $scope.texto = "cerrando";
    }]);
