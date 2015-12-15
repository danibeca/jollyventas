'use strict';

angular.module('jollyVentasApp.tienda.controllers', [])

.controller('TiendaSeleccionarController',
    ['$scope', '$rootScope', '$location', 'TiendaService',
    function ($scope, $rootScope, $location, TiendaService) {

        TiendaService.getList(function(response) {
            $scope.tiendas = response.puntosdeventa;
        });
        $rootScope.vistaPie = '';

        $scope.seleccionar = function(tienda){
            $rootScope.tienda = tienda;
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
